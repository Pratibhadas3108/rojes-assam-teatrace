# Rojes Labs — Assam TeaTrace (NESFIC-I-08)

[![Live Web App](https://img.shields.io/badge/Live%20App-rojes--assam--teatrace.pages.dev-059669?style=for-the-badge&logo=cloudflarepages&logoColor=white)](https://rojes-assam-teatrace.pages.dev/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-rojes--assam--teatrace-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Pratibhadas3108/rojes-assam-teatrace)
[![Challenge](https://img.shields.io/badge/NESFIC--2026-NESFIC--I--08-047857?style=for-the-badge)](https://rojes-assam-teatrace.pages.dev/proposal)
[![Region](https://img.shields.io/badge/Region-Assam%2C%20India%20(IN--AS)-065f46?style=for-the-badge)](https://rojes-assam-teatrace.pages.dev/)

> **End-to-End Digital Traceability of Tea Across the Assam Tea Value Chain**  
> Developed for the **North East Seva First Innovation Challenge (NESFIC 2026)** — Problem Statement **NESFIC-I-08**  
> **Challenge Sponsor:** Tea Research Association (TRA) – Tocklai  
> **Submitting Entity:** Rojes Labs  
> **Lead Applicant:** Pratibha Das Hatibaruah  

---

## 🌐 Quick Links & Access

- **Live Web Application:** [https://rojes-assam-teatrace.pages.dev/](https://rojes-assam-teatrace.pages.dev/)
- **GitHub Repository:** [https://github.com/Pratibhadas3108/rojes-assam-teatrace](https://github.com/Pratibhadas3108/rojes-assam-teatrace)
- **Full Proposal & PDF Downloads:** [https://rojes-assam-teatrace.pages.dev/proposal](https://rojes-assam-teatrace.pages.dev/proposal)

---

## 🍃 Executive Overview

Assam produces over 50% of India's tea, spanning **1.2 Lakh+ Small Tea Growers (STGs)**, **Bought-Leaf Factories (BLFs)**, heritage estates, auction brokers, and global exporters. However, the supply chain currently operates on fragmented paper challans, manual weighbridge slips, and disconnected factory registers.

**Rojes Labs — Assam TeaTrace** solves this with an offline-first, cryptographic Digital Product Passport (DPP) framework that guarantees farm-to-cup traceability, prevents unauthorized leaf blending, and verifies Geographical Indication (GI) and Maximum Residue Limit (MRL) export compliance across Assam's tea districts.

### 📍 Geographic & District Coverage (Assam, India)
- **Upper Assam:** Dibrugarh, Tinsukia (Large estates & STG clusters)
- **Central Assam:** Jorhat (TRA Tocklai headquarters), Golaghat
- **North Bank:** Sonitpur (Brahmaputra north bank gardens)

---

## 🚀 Key Modules in the Live Platform

### 1. Value Chain Ledger (`/`)
- Multi-tier batch tracking across 5 verified Assam tea districts.
- 5-stage SHA-256 custody timeline: Plucking & Intake → Factory Processing → Lab Clearance → Blending & Bagging → Dispatch & Auction.
- Live outturn monitoring, mass-balance metrics, and GS1 Digital Link QR passport modal.

### 2. Batch & QR Provenance Simulator (`/trace-simulator`)
- Interactive provenance sandbox modeling estate/STG intake weight (kg) to made-tea yield (21%–25% expected CTC/Orthodox recovery).
- Real-time QR code generator rendering verifiable JSON-LD Digital Product Passports.
- **Fault-Injection Engine:** Simulate green-leaf substitution (yield >25%) and MRL pesticide exceedance to verify automated quarantine flags and alert triggers.

### 3. GI & MRL Compliance Audit (`/compliance-audit`)
- Real-time compliance table covering Jorhat, Dibrugarh, Tinsukia, Golaghat, and Sonitpur.
- Tracks Green Leaf MT vs. Made Tea MT, Average Outturn %, Assam GI Origin Pass Rate, and FSSAI/EU-MRL Pass Rate.
- Audit-ready CSV export functionality for Tea Board of India and export inspections.

### 4. NESFIC-I-08 Proposal & Deliverables (`/proposal`)
- Complete 12-section NESFIC application (all sections compliant with <500 word limit).
- ₹40.00 Lakhs grant budget breakdown (50% allocated to Technical Engineering Team).
- Direct download links for:
  - `Rojes_Labs_NESFIC-I-08_Proposal.pdf`
  - `Rojes_Labs_NESFIC-I-08_Proof_of_Work.pdf`
  - `Rojes_Labs_NESFIC-I-08_Proposal_CopyPaste.txt`

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 19, TypeScript, Vite 6, Tailwind CSS v4 |
| **Icons & Design** | Lucide React, Custom SVG TeaTrace Favicon & Icons |
| **Edge & Field Layer** | Offline-First PWA, IndexedDB storage, BLE / RS-232 weighbridge interface |
| **Ledger & Integrity** | SHA-256 Hash Chaining, Directed Acyclic Graph (DAG) for multi-estate blending |
| **Standards** | GS1 EPCIS 2.0, GS1 Digital Link QR, FSSAI / EU-MRL Residue Vault |
| **Hosting & CI/CD** | Cloudflare Pages (`rojes-assam-teatrace.pages.dev`), GitHub |

---

## 💻 Local Development Setup

```bash
# Clone the repository
git clone https://github.com/Pratibhadas3108/rojes-assam-teatrace.git
cd rojes-assam-teatrace

# Install dependencies
npm install

# Start Vite local development server
npm run dev

# Build for production
npm run build
```

---

## ⚠️ Disclaimer

This web application is a functional prototype and Proof of Work developed by **Rojes Labs** for the **North East Seva First Innovation Challenge (NESFIC-I-08)**, sponsored by the **Tea Research Association (TRA) – Tocklai**. Batch ledgers, cryptographic SHA-256 digests, mass-balance reconciliation algorithms, and MRL audit records presented in the platform use calibrated benchmarks for demonstration purposes. Full commercial deployment across Assam tea estates, Small Tea Growers (STGs), Bought-Leaf Factories (BLFs), and auction centers requires formal hardware integration, weighbridge telemetry calibration, and regulatory validation in alignment with TRA Tocklai and the Tea Board of India.

---

## 📄 Copyright & Attribution

© 2026 **Rojes Labs**. All rights reserved.  
**Lead Applicant:** Pratibha Das Hatibaruah  
**Submitting Entity:** Rojes Labs  
**Region:** Assam, India (`IN-AS`)  
**Live Application:** [https://rojes-assam-teatrace.pages.dev/](https://rojes-assam-teatrace.pages.dev/)  
**GitHub Repository:** [https://github.com/Pratibhadas3108/rojes-assam-teatrace](https://github.com/Pratibhadas3108/rojes-assam-teatrace)
