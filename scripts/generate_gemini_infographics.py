#!/usr/bin/env python3
"""
Automated Gemini Pro 16:9 Infographic Generator via Chrome CDP (Playwright).

Connects to an existing Google Chrome instance started with:
  /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 &
logged into your Google Pro account (kalyanjit@gmail.com) at https://gemini.google.com/app.

After generating all 5 16:9 infographics into .tmp_pdf_assets/, automatically
runs scripts/generate_pdfs.py to rebuild both NESFIC-I-08 PDFs.
"""

import argparse
import base64
import json
import os
import subprocess
import sys
import time
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROMPTS_FILE = os.path.join(ROOT, 'scripts', 'image_prompts.json')
ASSETS_TMP = os.path.join(ROOT, '.tmp_pdf_assets')
os.makedirs(ASSETS_TMP, exist_ok=True)


def main():
    parser = argparse.ArgumentParser(description='Generate 16:9 infographics via Gemini Pro Chrome CDP')
    parser.add_argument('--port', type=int, default=9222, help='Chrome remote debugging port (default: 9222)')
    parser.add_argument('--force', action='store_true', help='Regenerate even if PNG already exists')
    parser.add_argument('--skip-pdf', action='store_true', help='Skip rebuilding PDFs after image generation')
    args = parser.parse_args()

    with open(PROMPTS_FILE, 'r', encoding='utf-8') as f:
        items = json.load(f)

    with sync_playwright() as p:
        try:
            browser = p.chromium.connect_over_cdp(f'http://127.0.0.1:{args.port}')
        except Exception as e:
            print(f'\n❌ Could not connect to Google Chrome on port {args.port}: {e}')
            print('👉 Start Chrome with remote debugging first:')
            print(f'   /Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --remote-debugging-port={args.port} &\n')
            sys.exit(1)

        context = browser.contexts[0] if browser.contexts else browser.new_context()
        gemini_page = next((pg for pg in context.pages if 'gemini.google.com' in pg.url), None)
        if not gemini_page:
            gemini_page = context.new_page()
            gemini_page.goto('https://gemini.google.com/app', wait_until='domcontentloaded', timeout=30000)
        else:
            gemini_page.bring_to_front()

        saved = 0
        for idx, item in enumerate(items, 1):
            out_path = os.path.join(ASSETS_TMP, item['filename'])
            if os.path.exists(out_path) and not args.force and os.path.getsize(out_path) > 100_000:
                print(f'[{idx}/{len(items)}] Skipping existing {item["filename"]} (use --force to overwrite)')
                continue

            print(f'\n[{idx}/{len(items)}] Generating {item["filename"]}: {item["title"]}')
            gemini_page.goto('https://gemini.google.com/app', wait_until='domcontentloaded', timeout=30000)
            time.sleep(2.5)
            gemini_page.wait_for_selector('rich-textarea, div[contenteditable="true"], textarea', timeout=25000)

            existing_urls = gemini_page.evaluate(
                "() => Array.from(document.querySelectorAll('img')).map(i => i.src).filter(Boolean)"
            )

            full_prompt = f'Generate a high-quality 16:9 widescreen infographic image: {item["prompt"]}'
            gemini_page.evaluate(
                """(text) => {
                    const el = document.querySelector('rich-textarea p, rich-textarea div[contenteditable="true"], div[contenteditable="true"] p, div[contenteditable="true"], textarea');
                    if (el) {
                        el.focus();
                        el.innerText = text;
                        el.dispatchEvent(new Event('input', { bubbles: true }));
                    }
                }""",
                full_prompt,
            )
            time.sleep(1.0)

            clicked = gemini_page.evaluate(
                """() => {
                    const btn = document.querySelector('button[aria-label="Send message"], button.send-button, mat-icon[data-mat-icon-name="send"]')?.closest('button');
                    if (btn && !btn.disabled) { btn.click(); return true; }
                    return false;
                }"""
            )
            if not clicked:
                gemini_page.keyboard.press('Enter')

            print('   Waiting for Gemini image generation...')
            img_b64 = None
            for _ in range(45):
                time.sleep(3.0)
                if 'accounts.google.com' in gemini_page.url:
                    print(f'   ❌ Redirected to Google Sign-In ({gemini_page.url}). Please sign into kalyanjit@gmail.com in this Chrome window.')
                    sys.exit(1)
                try:
                    candidate = gemini_page.evaluate(
                        """(existing) => {
                            const imgs = Array.from(document.querySelectorAll('img')).filter(img =>
                                img.src && !existing.includes(img.src) &&
                                (img.src.includes('googleusercontent.com') || img.src.startsWith('blob:') || img.src.startsWith('data:image')) &&
                                img.naturalWidth > 400
                            );
                            if (!imgs.length) return null;
                            const latest = imgs[imgs.length - 1];
                            return latest.src;
                        }""",
                        existing_urls,
                    )
                    if candidate:
                        img_b64 = gemini_page.evaluate(
                            """(src) => {
                                const img = Array.from(document.querySelectorAll('img')).find(i => i.src === src);
                                if (!img || !img.complete || img.naturalWidth === 0) return null;
                                const c = document.createElement('canvas');
                                c.width = img.naturalWidth;
                                c.height = img.naturalHeight;
                                c.getContext('2d').drawImage(img, 0, 0);
                                return c.toDataURL('image/png').split(',')[1];
                            }""",
                            candidate,
                        )
                        if img_b64:
                            break
                except Exception:
                    # Gemini navigates from /app to /app/<chat_id> right after submit
                    continue

            if img_b64:
                with open(out_path, 'wb') as f:
                    f.write(base64.b64decode(img_b64))
                print(f'   ✅ Saved {out_path} ({os.path.getsize(out_path)} bytes)')
                saved += 1
            else:
                print(f'   ⚠️ Timed out waiting for {item["filename"]}')

            if idx < len(items):
                time.sleep(5.0)

        print(f'\nDone: {saved} new infographics saved.')

    if not args.skip_pdf:
        print('Rebuilding Proposal and Proof of Work PDFs...')
        subprocess.run([sys.executable, os.path.join(ROOT, 'scripts', 'generate_pdfs.py')], check=True)


if __name__ == '__main__':
    main()
