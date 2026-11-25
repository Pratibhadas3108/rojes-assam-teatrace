import os
import re
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    Image,
    PageBreak,
)
from pdf_visuals import (
    generate_current_vs_proposed,
    generate_user_journey,
    generate_architecture,
    generate_gantt,
    generate_dpp_and_hardware,
    generate_budget_chart,
    capture_app_screenshots,
)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS_DIR = os.path.join(ROOT, 'public', 'docs')
ASSETS_TMP = os.path.join(ROOT, '.tmp_pdf_assets')
os.makedirs(DOCS_DIR, exist_ok=True)
os.makedirs(ASSETS_TMP, exist_ok=True)

PROPOSAL_TS = os.path.join(ROOT, 'src', 'data', 'proposalContent.ts')


def parse_proposal_sections():
    with open(PROPOSAL_TS, 'r', encoding='utf-8') as f:
        txt = f.read()
    blocks = re.findall(
        r"id:\s*(\d+),\s*title:\s*'([^']+)',\s*promptHint:\s*'([^']+)',\s*content:\s*`([^`]+)`",
        txt,
        re.S,
    )
    sections = []
    for sec_id, title, hint, content in blocks:
        sections.append({
            'id': int(sec_id),
            'title': title.strip(),
            'hint': hint.strip(),
            'content': content.strip(),
            'words': len(content.strip().split()),
        })
    return sections


def generate_charts():
    # Chart 1: Green Leaf Intake vs Made Tea Output (21%-25% TRA Recovery Band)
    green_leaf_kg = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000]
    lower_bound = [g * 0.21 for g in green_leaf_kg]
    upper_bound = [g * 0.25 for g in green_leaf_kg]
    verified_output = [228, 460, 695, 920, 1140, 1380, 1605, 1830]
    anomaly_x = [5000]
    anomaly_y = [1490]

    plt.figure(figsize=(6.5, 3.2), dpi=180)
    plt.fill_between(
        green_leaf_kg,
        lower_bound,
        upper_bound,
        color='#d1fae5',
        alpha=0.85,
        label='Valid TRA Recovery Band (21%-25%)',
    )
    plt.plot(
        green_leaf_kg,
        verified_output,
        marker='o',
        color='#065f46',
        linewidth=2.2,
        label='Verified Assam Lots (avg 22.9%)',
    )
    plt.scatter(
        anomaly_x,
        anomaly_y,
        color='#dc2626',
        s=70,
        zorder=5,
        label='Quarantined Anomaly (29.8% Outturn)',
    )
    plt.title(
        'Mass-Balance Verification: Green Leaf Intake vs. Made Tea Output',
        fontsize=10,
        fontweight='bold',
    )
    plt.xlabel('Verified Green Leaf Intake (kg)', fontsize=9)
    plt.ylabel('Made Tea Output (kg)', fontsize=9)
    plt.grid(True, linestyle='--', alpha=0.4)
    plt.legend(fontsize=7.5, loc='upper left')
    plt.tight_layout()
    c1 = os.path.join(ASSETS_TMP, 'chart_mass_balance.png')
    plt.savefig(c1)
    plt.close()

    # Chart 2: District GI Origin & MRL Export Pass Rates
    districts = ['Jorhat', 'Dibrugarh', 'Tinsukia', 'Golaghat', 'Sonitpur']
    gi_rates = [98.4, 99.1, 91.2, 97.8, 96.5]
    mrl_rates = [97.9, 98.4, 94.0, 99.0, 93.8]

    x = range(len(districts))
    width = 0.35
    fig, ax = plt.subplots(figsize=(6.5, 3.2), dpi=180)
    ax.bar([i - width / 2 for i in x], gi_rates, width, color='#059669', label='Assam GI Verified (%)')
    ax.bar([i + width / 2 for i in x], mrl_rates, width, color='#0284c7', label='FSSAI/EU-MRL Pass (%)')
    ax.set_xticks(list(x))
    ax.set_xticklabels(districts, fontsize=8.5)
    ax.set_ylim(85, 102)
    ax.set_ylabel('Compliance Rate (%)', fontsize=9)
    ax.set_title(
        'Simulated District Provenance: Assam GI & MRL Export Compliance',
        fontsize=10,
        fontweight='bold',
    )
    ax.grid(True, axis='y', linestyle='--', alpha=0.4)
    ax.legend(fontsize=7.5, loc='lower right')
    fig.tight_layout()
    c2 = os.path.join(ASSETS_TMP, 'chart_compliance.png')
    plt.savefig(c2)
    plt.close()
    return c1, c2


def add_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(colors.HexColor('#475569'))
    canvas.drawString(
        18 * mm,
        12 * mm,
        '© 2026 Rojes Labs | Lead Applicant: Pratibha Das Hatibaruah | NESFIC-I-08 (TRA Tocklai)',
    )
    canvas.drawRightString(A4[0] - 18 * mm, 12 * mm, f'Page {doc.page}')
    canvas.restoreState()


def build_proposal_pdf(sections, diagrams):
    out_path = os.path.join(DOCS_DIR, 'Rojes_Labs_NESFIC-I-08_Proposal.pdf')
    doc = SimpleDocTemplate(
        out_path,
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=18 * mm,
        bottomMargin=20 * mm,
    )
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'PropTitle', parent=styles['Title'], fontSize=17, textColor=colors.HexColor('#065f46'), spaceAfter=4
    )
    sub_style = ParagraphStyle(
        'PropSub', parent=styles['Normal'], fontSize=9.5, textColor=colors.HexColor('#334155'), spaceAfter=10
    )
    h2_style = ParagraphStyle(
        'SecH2', parent=styles['Heading2'], fontSize=11.5, textColor=colors.HexColor('#065f46'), spaceBefore=10, spaceAfter=3
    )
    body_style = ParagraphStyle(
        'PropBody', parent=styles['Normal'], fontSize=9.5, leading=13.5, textColor=colors.HexColor('#1e293b')
    )
    meta_style = ParagraphStyle(
        'SecMeta', parent=styles['Normal'], fontSize=8, textColor=colors.HexColor('#64748b'), spaceAfter=4
    )

    story = [
        Paragraph('NESFIC 2026 — Official Proposal Document', title_style),
        Paragraph(
            '<b>Problem Statement:</b> NESFIC-I-08 — End-to-End Digital Traceability of Tea Across the Assam Tea Value Chain<br/>'
            '<b>Sponsor:</b> Tea Research Association (TRA) – Tocklai (New Technology Committee)<br/>'
            '<b>Applicant Organization:</b> Rojes Labs &nbsp;|&nbsp; <b>Lead Applicant:</b> Pratibha Das Hatibaruah',
            sub_style,
        ),
        Spacer(1, 4),
    ]

    def _scaled_img(path, target_w=170 * mm):
        import matplotlib.image as mpimg
        arr = mpimg.imread(path)
        h_px, w_px = arr.shape[0], arr.shape[1]
        return Image(path, width=target_w, height=target_w * (h_px / w_px))

    diag_map = {
        2: (diagrams['curr_vs_prop'], 'Figure 1: Current Fragmented Workflow vs. Assam TeaTrace'),
        3: (diagrams['user_journey'], 'Figure 2: End-to-End User Journey Across 4 Value-Chain Personas'),
        4: (diagrams['architecture'], 'Figure 3: Hybrid Edge-Cloud & Cryptographic Architecture'),
        6: (diagrams['gantt'], 'Figure 4: 24-Week Development & Assam Shadow Pilot Roadmap'),
        12: (diagrams['budget'], 'Figure 5: Indicative Resource & Budget Allocation (Rs. 40.00 Lakhs Grant)'),
    }

    for s in sections:
        story.append(Paragraph(s['title'], h2_style))
        story.append(Paragraph(f"<i>Word count: {s['words']} / 500 words</i>", meta_style))
        for para in s['content'].split('\n\n'):
            clean = para.replace('\n', '<br/>')
            story.append(Paragraph(clean, body_style))
            story.append(Spacer(1, 4))
        if s['id'] == 12:
            budget_rows = [
                ['Budget Heading', 'Scope & Utilization', 'INR Lakhs', 'Share'],
                ['Technical Engineering Team Cost', 'Lead Architect, Offline PWA, Ledger/Data & Embedded Eng.', '20.00', '50%'],
                ['Field Hardware & Edge Pilot Kits', 'BLE/RS-232 scale bridges, tablets & thermal QR printers', '6.00', '15%'],
                ['Tea Quality, GI & Compliance Advisory', 'TRA/NABL MRL & STG-BLF domain specialist advisory', '4.00', '10%'],
                ['India-Region Cloud & Security Audit', 'Managed PostgreSQL, APIs, KMS & security audit', '4.00', '10%'],
                ['Assam Shadow Pilot, Travel & Training', 'Jorhat/Dibrugarh onboarding & bilingual training', '4.00', '10%'],
                ['IP Filing, GS1 Standards & Contingency', 'GS1 registration, mass-balance IP & buffer', '2.00', '5%'],
                ['Total Problem Statement Grant', '24-Week Build & TRA Tocklai Pilot Validation', '40.00', '100%'],
            ]
            bt = Table(budget_rows, colWidths=[50 * mm, 82 * mm, 22 * mm, 16 * mm])
            bt.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#065f46')),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold'),
                ('BACKGROUND', (0, -1), (-1, -1), colors.HexColor('#ecfdf5')),
                ('FONTSIZE', (0, 0), (-1, -1), 7.8),
                ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1')),
                ('ROWBACKGROUNDS', (0, 1), (-1, -2), [colors.white, colors.HexColor('#f8fafc')]),
                ('ALIGN', (2, 0), (-1, -1), 'RIGHT'),
                ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                ('PADDING', (0, 0), (-1, -1), 4),
            ]))
            story.append(Spacer(1, 4))
            story.append(bt)
        if s['id'] in diag_map:
            img_path, cap = diag_map[s['id']]
            story.append(Spacer(1, 4))
            story.append(_scaled_img(img_path, 170 * mm))
            story.append(Paragraph(f'<i>{cap}</i>', meta_style))
            story.append(Spacer(1, 6))

    story.append(Spacer(1, 8))
    story.append(
        Paragraph(
            '<b>Disclaimer:</b> This proposal and accompanying prototype datasets are prepared by Rojes Labs '
            '(Lead Applicant: Pratibha Das Hatibaruah) for NESFIC 2026 evaluation. Commercial deployment across Assam tea estates, '
            'Small Tea Growers, and Bought-Leaf Factories is subject to TRA Tocklai and Tea Board of India validation.',
            meta_style,
        )
    )

    doc.build(story, onFirstPage=add_footer, onLaterPages=add_footer)
    print(f'Generated: {out_path} ({os.path.getsize(out_path)} bytes)')


def build_pow_pdf(c1, c2, dpp_hw, shots):
    out_path = os.path.join(DOCS_DIR, 'Rojes_Labs_NESFIC-I-08_Proof_of_Work.pdf')
    doc = SimpleDocTemplate(
        out_path,
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=18 * mm,
        bottomMargin=20 * mm,
    )
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'PowTitle', parent=styles['Title'], fontSize=18, textColor=colors.HexColor('#065f46'), spaceAfter=6
    )
    h2_style = ParagraphStyle(
        'PowH2', parent=styles['Heading2'], fontSize=12.5, textColor=colors.HexColor('#065f46'), spaceBefore=10, spaceAfter=4
    )
    body_style = ParagraphStyle(
        'PowBody', parent=styles['Normal'], fontSize=9.5, leading=13.5, textColor=colors.HexColor('#1e293b')
    )

    story = [
        Paragraph('Proof of Work & Solution Evidence (NESFIC-I-08)', title_style),
        Paragraph(
            '<b>Project:</b> Rojes Labs Assam TeaTrace<br/>'
            '<b>Challenge:</b> End-to-End Digital Traceability of Tea Across the Assam Tea Value Chain (TRA – Tocklai)<br/>'
            '<b>Organization:</b> Rojes Labs &nbsp;|&nbsp; <b>Lead Applicant:</b> Pratibha Das Hatibaruah<br/>'
            '<b>Date:</b> November 2026',
            body_style,
        ),
        Spacer(1, 8),
        Paragraph('1. Executive Summary of Proof of Work', h2_style),
        Paragraph(
            'Rojes Labs has developed a functional web MVP (Assam TeaTrace) featuring a live Value Chain Ledger, '
            'an interactive Batch & QR Provenance Simulator with automated mass-balance anomaly detection, and a '
            'District GI & MRL Compliance Audit module. This Proof of Work presents our system architecture, '
            'Digital Product Passport & field hardware kit, simulation charts, and live MVP screenshots.',
            body_style,
        ),
        Paragraph('2. Traceability Stack, Digital Passport & Field Hardware Kit', h2_style),
    ]

    arch_data = [
        ['Layer', 'Technology / Component', 'Role in Assam Tea Value Chain'],
        ['Field & STG Intake', 'Offline-First Android PWA + IndexedDB', 'Captures GPS-tagged green leaf weight in low-4G sheds'],
        ['Weighbridge Bridge', 'BLE / RS-232 Serial Adapter + Thermal QR', 'Tamper-resistant scale capture & QR bag/chest labels'],
        ['Custody Ledger', 'FastAPI + PostgreSQL + SHA-256 Merkle', 'GS1 EPCIS 2.0 split/blend DAG & immutable audit proofs'],
        ['Mass-Balance Guard', '21%-25% Outturn Physics + Isolation Forest', 'Flags unrecorded leaf substitution & transit gaps'],
        ['Compliance & Passport', 'NABL/TRA MRL Parser + GS1 Digital Link QR', 'Auto-quarantines MRL holds; public farm-to-cup QR'],
    ]
    t = Table(arch_data, colWidths=[34 * mm, 60 * mm, 78 * mm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#065f46')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 8),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f8fafc')]),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t)
    story.append(Spacer(1, 8))
    import matplotlib.image as mpimg
    _arr = mpimg.imread(dpp_hw)
    story.append(Image(dpp_hw, width=170 * mm, height=170 * mm * (_arr.shape[0] / _arr.shape[1])))

    story.append(PageBreak())
    story.append(Paragraph('3. Simulation & Compliance Verification Results', h2_style))
    story.append(Image(c1, width=165 * mm, height=80 * mm))
    story.append(Spacer(1, 6))
    story.append(Image(c2, width=165 * mm, height=80 * mm))

    story.append(PageBreak())
    story.append(Paragraph('4. Live Working MVP Screenshots (Assam TeaTrace)', h2_style))
    if shots.get('ledger'):
        story.append(Paragraph('<b>4.1 Value Chain Ledger & 5-Stage Cryptographic Custody Timeline</b>', body_style))
        story.append(Spacer(1, 3))
        story.append(Image(shots['ledger'], width=170 * mm, height=108 * mm))
        story.append(Spacer(1, 8))
    if shots.get('sim_verified'):
        story.append(Paragraph('<b>4.2 Batch & QR Simulator — Verified Assam GI Lot (23.0% Outturn)</b>', body_style))
        story.append(Spacer(1, 3))
        story.append(Image(shots['sim_verified'], width=170 * mm, height=108 * mm))
        story.append(PageBreak())
    if shots.get('sim_fault'):
        story.append(Paragraph('<b>4.3 Batch & QR Simulator — Automated Quarantine on Leaf Substitution (31.0%)</b>', body_style))
        story.append(Spacer(1, 3))
        story.append(Image(shots['sim_fault'], width=170 * mm, height=108 * mm))
        story.append(Spacer(1, 8))
    if shots.get('audit'):
        story.append(Paragraph('<b>4.4 District GI & MRL Export Compliance Audit</b>', body_style))
        story.append(Spacer(1, 3))
        story.append(Image(shots['audit'], width=170 * mm, height=108 * mm))

    story.append(Spacer(1, 8))
    story.append(Paragraph('5. TRA Tocklai Shadow Pilot Validation Protocol', h2_style))
    story.append(
        Paragraph(
            'Upon NESFIC-I-08 selection, Rojes Labs will conduct a 4-week parallel shadow pilot across 1 Bought-Leaf '
            'Factory (10-15 STGs) and 1 heritage estate in Jorhat/Dibrugarh, benchmarking Greater Than or equal to 99.5% mass-balance '
            'reconciliation, Smaller than 15 s offline STG intake time, and Smaller than 5 s export MRL + GI audit dossier generation.',
            body_style,
        )
    )

    doc.build(story, onFirstPage=add_footer, onLaterPages=add_footer)
    print(f'Generated: {out_path} ({os.path.getsize(out_path)} bytes)')


if __name__ == '__main__':
    secs = parse_proposal_sections()
    c1, c2 = generate_charts()
    def _or_existing(fname, fallback_fn):
        p = os.path.join(ASSETS_TMP, fname)
        if os.path.exists(p) and not os.environ.get('REGEN_FALLBACK_DIAGRAMS'):
            return p
        return fallback_fn()

    diagrams = {
        'curr_vs_prop': _or_existing('diag_current_vs_proposed.png', generate_current_vs_proposed),
        'user_journey': _or_existing('diag_user_journey.png', generate_user_journey),
        'architecture': _or_existing('diag_architecture.png', generate_architecture),
        'gantt': _or_existing('diag_gantt.png', generate_gantt),
        'budget': generate_budget_chart(),
    }
    dpp_hw = _or_existing('diag_dpp_hardware.png', generate_dpp_and_hardware)
    shots = capture_app_screenshots()
    build_proposal_pdf(secs, diagrams)
    build_pow_pdf(c1, c2, dpp_hw, shots)
