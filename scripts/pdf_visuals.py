import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS_TMP = os.path.join(ROOT, '.tmp_pdf_assets')
os.makedirs(ASSETS_TMP, exist_ok=True)


def _box(ax, x, y, w, h, title, sub='', fc='#ecfdf5', ec='#059669', tc='#064e3b', fs=8):
    patch = FancyBboxPatch(
        (x, y), w, h,
        boxstyle='round,pad=0.02,rounding_size=0.03',
        facecolor=fc, edgecolor=ec, linewidth=1.3,
    )
    ax.add_patch(patch)
    if sub:
        ax.text(x + w / 2, y + h * 0.64, title, ha='center', va='center', fontsize=fs, fontweight='bold', color=tc)
        ax.text(x + w / 2, y + h * 0.30, sub, ha='center', va='center', fontsize=fs - 1.3, color='#334155')
    else:
        ax.text(x + w / 2, y + h / 2, title, ha='center', va='center', fontsize=fs, fontweight='bold', color=tc)


def _arrow(ax, x1, y1, x2, y2, color='#475569'):
    ax.annotate('', xy=(x2, y2), xytext=(x1, y1), arrowprops=dict(arrowstyle='->', color=color, lw=1.4))


def generate_current_vs_proposed():
    fig, ax = plt.subplots(figsize=(8.2, 3.6), dpi=200)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 4.4)
    ax.axis('off')

    ax.text(5, 4.18, 'Current Fragmented Workflow vs. Assam TeaTrace (NESFIC-I-08)', ha='center', va='center', fontsize=11, fontweight='bold', color='#0f172a')

    # Row 1: Current
    ax.text(0.15, 3.55, 'CURRENT\n(Gaps)', ha='left', va='center', fontsize=8.5, fontweight='bold', color='#b91c1c')
    curr_steps = [
        ('STG Shed', 'Paper challan\n& manual weight'),
        ('Transport', 'Mixed unlabelled\nleaf sacks'),
        ('BLF / Estate', 'Disconnected ERP\n(No outturn check)'),
        ('Export / Audit', 'Retrospective\nMRL/GI lookup'),
    ]
    for i, (t, s) in enumerate(curr_steps):
        x = 1.35 + i * 2.15
        _box(ax, x, 2.85, 1.85, 1.0, t, s, fc='#fef2f2', ec='#ef4444', tc='#991b1b', fs=8)
        if i < 3:
            _arrow(ax, x + 1.88, 3.35, x + 2.12, 3.35, '#ef4444')

    # Row 2: Proposed
    ax.text(0.15, 1.45, 'PROPOSED\n(TeaTrace)', ha='left', va='center', fontsize=8.5, fontweight='bold', color='#065f46')
    prop_steps = [
        ('Offline STG App', 'GPS + BLE scale\n+ QR bag tag'),
        ('Custody Transit', 'Geo-tagged lot\n& SHA-256 hash'),
        ('Mass-Balance', '21%-25% outturn\n& split/blend DAG'),
        ('DPP & Audit', 'MRL/GI vault +\nGS1 QR passport'),
    ]
    for i, (t, s) in enumerate(prop_steps):
        x = 1.35 + i * 2.15
        _box(ax, x, 0.75, 1.85, 1.0, t, s, fc='#ecfdf5', ec='#059669', tc='#064e3b', fs=8)
        if i < 3:
            _arrow(ax, x + 1.88, 1.25, x + 2.12, 1.25, '#059669')

    ax.text(5, 0.22, 'Outcome: Eliminates blind aggregation, flags leaf substitution automatically, and cuts audit time from days to seconds.', ha='center', va='center', fontsize=8, style='italic', color='#334155')

    out = os.path.join(ASSETS_TMP, 'diag_current_vs_proposed.png')
    plt.tight_layout()
    plt.savefig(out, bbox_inches='tight')
    plt.close()
    return out


def generate_user_journey():
    fig, ax = plt.subplots(figsize=(8.2, 3.8), dpi=200)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 4.6)
    ax.axis('off')

    ax.text(5, 4.35, 'End-to-End User Journey Swimlane (4 Key Value-Chain Personas)', ha='center', va='center', fontsize=11, fontweight='bold', color='#0f172a')

    lanes = [
        ('1. STG / Field Clerk', '#f0fdf4', '#16a34a', [
            ('Scan Grower QR', 'Log ID & GPS'),
            ('Weigh Green Leaf', 'BLE/USB capture'),
            ('Print Bag QR', 'Offline queue'),
        ]),
        ('2. BLF / Estate Mgr', '#eff6ff', '#2563eb', [
            ('Gate Scan Intake', 'Verify origin lot'),
            ('Process Stages', 'Wither -> Dry'),
            ('Outturn Check', '21%-25% guard'),
        ]),
        ('3. QA / Lab Officer', '#fefce8', '#ca8a04', [
            ('Sync MRL Report', 'TRA / NABL LIMS'),
            ('Review Alerts', 'Hold / Release'),
            ('Certify Assam GI', 'Sign root hash'),
        ]),
        ('4. Buyer / Regulator', '#f8fafc', '#475569', [
            ('Scan Chest QR', 'GS1 Digital Link'),
            ('Inspect Timeline', '5-stage hashes'),
            ('Export Dossier', 'CSV/PDF audit'),
        ]),
    ]

    for idx, (persona, fc, ec, steps) in enumerate(lanes):
        y = 3.25 - idx * 0.96
        ax.text(0.15, y + 0.35, persona, ha='left', va='center', fontsize=8, fontweight='bold', color='#0f172a')
        for j, (t, s) in enumerate(steps):
            x = 2.2 + j * 2.55
            _box(ax, x, y, 2.15, 0.72, t, s, fc=fc, ec=ec, tc='#0f172a', fs=7.6)
            if j < 2:
                _arrow(ax, x + 2.18, y + 0.36, x + 2.52, y + 0.36, ec)

    out = os.path.join(ASSETS_TMP, 'diag_user_journey.png')
    plt.tight_layout()
    plt.savefig(out, bbox_inches='tight')
    plt.close()
    return out


def generate_architecture():
    fig, ax = plt.subplots(figsize=(8.2, 3.8), dpi=200)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 4.6)
    ax.axis('off')

    ax.text(5, 4.35, 'Assam TeaTrace — Hybrid Edge-Cloud & Cryptographic Architecture', ha='center', va='center', fontsize=11, fontweight='bold', color='#0f172a')

    cols = [
        ('1. Edge & Field Layer', '#ecfdf5', '#059669', [
            ('Android PWA', 'Offline IndexedDB'),
            ('Weighbridge Bridge', 'BLE / RS-232 Scale'),
            ('Thermal QR Printer', 'Leaf Bag & Chest Tags'),
        ]),
        ('2. Core API & Ledger', '#eff6ff', '#2563eb', [
            ('FastAPI + Node.js', 'REST & Webhook API'),
            ('PostgreSQL EPCIS', 'Split/Blend DAG'),
            ('SHA-256 Merkle', 'Immutable Custody'),
        ]),
        ('3. Intelligence Guard', '#fffbeb', '#d97706', [
            ('Mass-Balance Engine', '21%-25% Outturn Rule'),
            ('Isolation Forest', 'Yield/GPS Anomalies'),
            ('Auto-Quarantine', 'MRL & Blend Holds'),
        ]),
        ('4. Integrations & Cloud', '#f8fafc', '#475569', [
            ('TRA / NABL LIMS', 'MRL Lab Reports'),
            ('Tea Board / GI', 'Auction & Export'),
            ('India Cloud Host', 'TLS 1.3 + AES-256'),
        ]),
    ]

    for i, (hdr, fc, ec, items) in enumerate(cols):
        x = 0.25 + i * 2.45
        ax.text(x + 1.05, 3.85, hdr, ha='center', va='center', fontsize=8.2, fontweight='bold', color='#0f172a')
        for j, (t, s) in enumerate(items):
            y = 2.75 - j * 1.05
            _box(ax, x, y, 2.1, 0.82, t, s, fc=fc, ec=ec, tc='#0f172a', fs=7.5)
        if i < 3:
            _arrow(ax, x + 2.14, 2.15, x + 2.41, 2.15, '#475569')

    out = os.path.join(ASSETS_TMP, 'diag_architecture.png')
    plt.tight_layout()
    plt.savefig(out, bbox_inches='tight')
    plt.close()
    return out


def generate_gantt():
    fig, ax = plt.subplots(figsize=(8.0, 3.2), dpi=200)
    phases = [
        ('Phase 5: Assam Shadow Pilot (BLF + Estate)', 20, 4, '#059669'),
        ('Phase 4: Bench Stress & Security Audit', 16, 4, '#0284c7'),
        ('Phase 3: Blending DAG, MRL Vault & QR', 10, 6, '#0d9488'),
        ('Phase 2: Core Ledger, APIs & Offline PWA', 4, 6, '#10b981'),
        ('Phase 1: Field Discovery & EPCIS Schema', 0, 4, '#065f46'),
    ]
    for idx, (label, start, dur, color) in enumerate(phases):
        ax.barh(idx, dur, left=start, height=0.55, color=color, alpha=0.9)
        ax.text(start + dur / 2, idx, f'W{start+1}–W{start+dur}', ha='center', va='center', color='white', fontsize=8, fontweight='bold')

    ax.axvline(20, color='#dc2626', linestyle='--', linewidth=1.5)
    ax.text(19.7, 4.55, 'Week 20: Validation Ready', ha='right', va='center', color='#dc2626', fontsize=8, fontweight='bold')

    ax.set_yticks(range(len(phases)))
    ax.set_yticklabels([p[0] for p in phases], fontsize=8)
    ax.set_xlim(0, 25)
    ax.set_xticks(range(0, 25, 2))
    ax.set_xlabel('Timeline (Weeks)', fontsize=8.5)
    ax.set_title('24-Week Development & Pilot Validation Roadmap (NESFIC-I-08)', fontsize=10, fontweight='bold')
    ax.grid(True, axis='x', linestyle='--', alpha=0.4)
    plt.tight_layout()
    out = os.path.join(ASSETS_TMP, 'diag_gantt.png')
    plt.savefig(out)
    plt.close()
    return out


def generate_dpp_and_hardware():
    fig, ax = plt.subplots(figsize=(8.2, 3.6), dpi=200)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 4.4)
    ax.axis('off')

    ax.text(5, 4.18, 'Digital Product Passport (Buyer Scan) & Field Hardware Kit', ha='center', va='center', fontsize=11, fontweight='bold', color='#0f172a')

    # Left: Mobile DPP Mockup
    _box(ax, 0.3, 0.3, 4.3, 3.55, '', fc='#f8fafc', ec='#065f46', fs=8)
    ax.text(2.45, 3.55, 'Buyer / Consumer QR Scan View', ha='center', va='center', fontsize=9, fontweight='bold', color='#065f46')
    ax.text(0.55, 3.12, 'Batch: ASM-JRT-2026-0841 (Assam GI Verified)', fontsize=7.8, fontweight='bold', color='#0f172a')
    ax.text(0.55, 2.72, 'Origin: Tocklai-Cinnamara STG Cluster, Jorhat', fontsize=7.5, color='#334155')
    ax.text(0.55, 2.36, 'Flush & Grade: Second Flush · Orthodox-FTGFOP1', fontsize=7.5, color='#334155')
    ax.text(0.55, 2.00, 'Mass-Balance: 4,200 kg leaf -> 966 kg tea (23.0%)', fontsize=7.5, color='#065f46', fontweight='bold')
    ax.text(0.55, 1.64, 'MRL Clearance: PASS (TRA Tocklai / EU-MRL)', fontsize=7.5, color='#065f46', fontweight='bold')
    ax.text(0.55, 1.28, 'Root Hash: 0x9f4c...e81b (Immutable Custody)', fontsize=7.3, family='monospace', color='#475569')
    _box(ax, 0.55, 0.48, 3.8, 0.55, 'GS1 Digital Link · Verified Farm-to-Cup', fc='#d1fae5', ec='#059669', tc='#064e3b', fs=7.5)

    # Right: Field Hardware Kit
    _box(ax, 5.1, 0.3, 4.6, 3.55, '', fc='#fffbeb', ec='#d97706', fs=8)
    ax.text(7.4, 3.55, 'Rugged STG Shed & BLF Hardware Kit', ha='center', va='center', fontsize=9, fontweight='bold', color='#92400e')
    _box(ax, 5.35, 2.55, 4.1, 0.72, 'Digital Weighbridge + BLE / RS-232', 'Auto-captures weight (prevents manual tampering)', fc='#ffffff', ec='#d97706', tc='#0f172a', fs=7.5)
    _box(ax, 5.35, 1.55, 4.1, 0.72, 'Offline Android PWA Tablet/Phone', 'Bilingual Assamese/English · 72h offline queue', fc='#ffffff', ec='#d97706', tc='#0f172a', fs=7.5)
    _box(ax, 5.35, 0.55, 4.1, 0.72, 'Bluetooth Thermal QR Label Printer', 'Weather-resistant tags for leaf bags & tea chests', fc='#ffffff', ec='#d97706', tc='#0f172a', fs=7.5)

    out = os.path.join(ASSETS_TMP, 'diag_dpp_hardware.png')
    plt.tight_layout()
    plt.savefig(out, bbox_inches='tight')
    plt.close()
    return out


def generate_budget_chart():
    fig, ax = plt.subplots(figsize=(8.0, 3.0), dpi=200)
    heads = [
        'IP, GS1 & Contingency',
        'Assam Shadow Pilot & Training',
        'Cloud, Ledger & Security Audit',
        'Tea Quality & GI Advisory',
        'Field Hardware & Edge Kits',
        'Technical Engineering Team Cost',
    ]
    amounts = [2.0, 4.0, 4.0, 4.0, 6.0, 20.0]
    bar_colors = ['#64748b', '#0284c7', '#0d9488', '#10b981', '#d97706', '#065f46']

    bars = ax.barh(heads, amounts, color=bar_colors, height=0.58)
    for bar, amt in zip(bars, amounts):
        pct = (amt / 40.0) * 100
        ax.text(
            amt + 0.4,
            bar.get_y() + bar.get_height() / 2,
            f'Rs. {amt:.1f} L ({pct:.0f}%)',
            va='center',
            fontsize=8,
            fontweight='bold',
            color='#0f172a',
        )

    ax.set_xlim(0, 25.5)
    ax.set_xlabel('Allocation (INR Lakhs)', fontsize=8.5)
    ax.set_title('Indicative Resource & Budget Allocation (Total Grant: Rs. 40.00 Lakhs)', fontsize=10, fontweight='bold')
    ax.grid(True, axis='x', linestyle='--', alpha=0.4)
    plt.tight_layout()
    out = os.path.join(ASSETS_TMP, 'diag_budget.png')
    plt.savefig(out)
    plt.close()
    return out


def capture_app_screenshots(base_url='http://localhost:5179'):
    shots = {}
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 1280, 'height': 820})

        # 1. Value Chain Ledger
        page.goto(f'{base_url}/', wait_until='networkidle', timeout=15000)
        p1 = os.path.join(ASSETS_TMP, 'ui_ledger.png')
        page.screenshot(path=p1, full_page=False)
        shots['ledger'] = p1

        # 2. Simulator - Verified State
        page.goto(f'{base_url}/trace-simulator', wait_until='networkidle', timeout=15000)
        p2 = os.path.join(ASSETS_TMP, 'ui_sim_verified.png')
        page.screenshot(path=p2, full_page=False)
        shots['sim_verified'] = p2

        # 3. Simulator - Fault / Quarantine State
        page.get_by_role('button', name='Inject Leaf Substitution Fault').click()
        page.wait_for_timeout(300)
        p3 = os.path.join(ASSETS_TMP, 'ui_sim_fault.png')
        page.screenshot(path=p3, full_page=False)
        shots['sim_fault'] = p3

        # 4. GI & MRL Compliance Audit
        page.goto(f'{base_url}/compliance-audit', wait_until='networkidle', timeout=15000)
        p4 = os.path.join(ASSETS_TMP, 'ui_audit.png')
        page.screenshot(path=p4, full_page=False)
        shots['audit'] = p4

        browser.close()
    return shots
