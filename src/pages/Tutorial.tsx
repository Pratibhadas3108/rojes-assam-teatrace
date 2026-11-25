import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HelpCircle,
  GitBranch,
  QrCode,
  ShieldCheck,
  FileText,
  Sprout,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Smartphone,
  Layers,
  Database,
  ChevronRight,
  Sparkles,
  FileCheck2,
} from 'lucide-react';

export const Tutorial: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'what' | 'how' | 'personas' | 'tech'>('what');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 p-6 sm:p-10 text-white shadow-md">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1 text-xs font-semibold text-emerald-200 backdrop-blur-xs">
            <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
            <span>Application Tutorial &amp; Interactive User Guide</span>
          </div>

          <h1 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            How Assam TeaTrace Works
          </h1>

          <p className="mt-3 text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Welcome to <strong>Rojes Labs Assam TeaTrace</strong> (NESFIC-I-08, TRA Tocklai). This
            guide explains <strong>what the platform does</strong>, why digital traceability is
            vital for Assam tea, and <strong>how to use every tool</strong> across the value chain.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/trace-simulator"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-emerald-950 shadow-xs hover:bg-emerald-50 transition-colors"
            >
              <QrCode className="h-4 w-4 text-emerald-700" />
              <span>Try Interactive Simulator</span>
              <ArrowRight className="h-4 w-4 text-emerald-700" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/40 bg-emerald-800/40 px-4 py-2.5 text-sm font-semibold text-emerald-100 hover:bg-emerald-700/50 backdrop-blur-xs transition-colors"
            >
              <GitBranch className="h-4 w-4" />
              <span>Explore Value Chain Ledger</span>
            </Link>
          </div>
        </div>

        {/* Decorative background element */}
        <div className="absolute right-[-40px] top-[-40px] h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-12 bottom-8 opacity-10 hidden lg:block pointer-events-none">
          <Sprout className="h-64 w-64 text-white" />
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-2xs gap-1 sm:gap-2">
        {[
          { id: 'what', label: '1. What It Does', icon: HelpCircle },
          { id: 'how', label: '2. How to Use Each Tool', icon: Layers },
          { id: 'personas', label: '3. Role-Based Workflows', icon: Smartphone },
          { id: 'tech', label: '4. Core Innovations & Math', icon: Scale },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id as any)}
            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === id
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-emerald-900 hover:bg-emerald-50/60'
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: What It Does */}
      {activeTab === 'what' && (
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Core Purpose &amp; Value Proposition
              </span>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Solving the Assam Tea Provenance Challenge
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Assam produces over 50% of India's tea, supporting more than 1.2 lakh Small Tea
                Growers (STGs) and hundreds of Bought-Leaf Factories (BLFs). However, the existing
                value chain relies on fragmented paper challans, disconnected weighbridge slips, and
                manual estate logs. Once green leaf leaves a grower shed and enters a high-speed
                factory or multi-estate blend line, origin identity is destroyed.
              </p>
            </div>

            {/* Problem vs Solution Grid */}
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-5 space-y-3">
                <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                  <AlertTriangle className="h-4 w-4 text-rose-600" />
                  <span>The Problem in the Current System</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-rose-950/80 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>
                      <strong>Loss of Batch Lineage:</strong> Smallholder green leaf is commingled
                      with estate leaf at collection points without individual digital records.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>
                      <strong>Leaf Adulteration &amp; Substitution:</strong> Cheaper, inferior, or
                      non-Assam tea leaves can be illicitly mixed into premium CTC/Orthodox lines.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>
                      <strong>Export Quarantine Risks:</strong> A single unmonitored lot with
                      excessive pesticide residue (MRL) contaminates an entire export consignment.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>
                      <strong>Assam GI Erosion:</strong> Authentic Assam tea commands premium
                      prices worldwide, but buyers have no way to verify genuine geographical origin.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                  <span>How Rojes Labs Assam TeaTrace Solves It</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-emerald-950/80 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>
                      <strong>Digital Product Passport (DPP):</strong> Every batch receives an
                      immutable digital passport at green-leaf plucking, tracked via GS1 QR codes.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>
                      <strong>Cryptographic SHA-256 Ledger:</strong> Each stage (Intake, Withering,
                      Rolling, Drying, Grading, Lab Clearance) cryptographically links to the previous
                      digest.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>
                      <strong>Automated Mass-Balance Reconciliation:</strong> Algorithms calculate
                      expected made-tea recovery (21%–25%). Yields exceeding 25% trigger tamper flags.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>
                      <strong>Pre-Auction MRL &amp; GI Vault:</strong> NABL lab certificates and
                      Assam GI proofs are digitally linked, automatically locking lots that fail
                      compliance.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 5-Stage Traceability Journey */}
            <div className="mt-10 border-t border-slate-100 pt-6">
              <h3 className="text-base font-bold text-slate-900">
                The 5-Stage Assam Tea Traceability Chain
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-5">
                {[
                  {
                    step: 'Stage 1',
                    title: 'Plucking & Shed Intake',
                    desc: 'Grower ID, GPS location, and digital weighbridge weight recorded offline.',
                    badge: 'Green Leaf',
                  },
                  {
                    step: 'Stage 2',
                    title: 'Factory Processing',
                    desc: 'Withering, CTC/Orthodox rolling, fermentation, drying, and grading recorded.',
                    badge: 'Processing',
                  },
                  {
                    step: 'Stage 3',
                    title: 'Lab & MRL Clearance',
                    desc: 'FSSAI/EU-MRL pesticide screen and moisture content verification.',
                    badge: 'Quality Vault',
                  },
                  {
                    step: 'Stage 4',
                    title: 'Blending & Packing',
                    desc: 'Many-to-one blending DAG preserves lineage of all contributor gardens.',
                    badge: 'Chest Packing',
                  },
                  {
                    step: 'Stage 5',
                    title: 'Auction & Retail Scan',
                    desc: 'GS1 QR Digital Link on chest or pouch scanned by broker, buyer, or consumer.',
                    badge: 'Consumer QR',
                  },
                ].map(({ step, title, desc, badge }) => (
                  <div
                    key={step}
                    className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50 p-3.5"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-800">
                        <span>{step}</span>
                        <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px]">
                          {badge}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs font-bold text-slate-900">{title}</p>
                      <p className="mt-1 text-[11px] text-slate-600 leading-snug">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Tab 2: How to Use Each Tool */}
      {activeTab === 'how' && (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Tool 1 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                      <GitBranch className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        1. Value Chain Ledger
                      </h3>
                      <p className="text-xs text-slate-500">Route: <code>/</code></p>
                    </div>
                  </div>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 hover:underline"
                  >
                    <span>Open</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="mt-4 space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <p>
                    The <strong>Value Chain Ledger</strong> is your command center for inspecting
                    all active tea batches across Assam (Jorhat, Dibrugarh, Tinsukia, Golaghat, and
                    Sonitpur).
                  </p>
                  <div className="rounded-xl bg-slate-50 p-3 space-y-1.5 text-xs text-slate-700 border border-slate-100">
                    <p className="font-semibold text-slate-900">What to do on this page:</p>
                    <p>• <strong>Inspect KPI Metrics:</strong> Check Total Green Leaf, Made Tea, Outturn Ratio, and Hash Ledger Integrity.</p>
                    <p>• <strong>Select a Batch:</strong> Click on any batch in the explorer table to reveal its origin garden, grower, flush, and grade.</p>
                    <p>• <strong>Audit the Custody Chain:</strong> Review all 5 timestamps and cryptographic SHA-256 hashes.</p>
                    <p>• <strong>View Digital Passport:</strong> Click the button to inspect the GS1 QR code and raw verifiable JSON metadata.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950"
                >
                  <span>Go to Value Chain Ledger</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Tool 2 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                      <QrCode className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        2. Batch &amp; QR Simulator
                      </h3>
                      <p className="text-xs text-slate-500">Route: <code>/trace-simulator</code></p>
                    </div>
                  </div>
                  <Link
                    to="/trace-simulator"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 hover:underline"
                  >
                    <span>Open</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="mt-4 space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <p>
                    The <strong>Provenance Simulator</strong> allows you to test tea manufacturing
                    math and witness how the platform automatically detects fraud or contamination.
                  </p>
                  <div className="rounded-xl bg-slate-50 p-3 space-y-1.5 text-xs text-slate-700 border border-slate-100">
                    <p className="font-semibold text-slate-900">How to run a simulation:</p>
                    <p>• <strong>Adjust Intake Weight:</strong> Use the slider to set intake green-leaf weight (e.g. 5,000 kg).</p>
                    <p>• <strong>Check Normal Conversion:</strong> Watch the system compute the made-tea outturn (nominal 22.5%).</p>
                    <p>• <strong>Inject Leaf-Mixing Fault:</strong> Click the toggle to test what happens when illegal filler leaf is added. The yield jumps to 29.5%, and an immediate red tamper alert is triggered.</p>
                    <p>• <strong>Inject MRL Exceedance:</strong> Simulate pesticide failure to trigger automated pre-auction quarantine.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  to="/trace-simulator"
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950"
                >
                  <span>Launch Provenance Simulator</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Tool 3 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        3. GI &amp; MRL Compliance Audit
                      </h3>
                      <p className="text-xs text-slate-500">Route: <code>/compliance-audit</code></p>
                    </div>
                  </div>
                  <Link
                    to="/compliance-audit"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 hover:underline"
                  >
                    <span>Open</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="mt-4 space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <p>
                    The <strong>Compliance Audit</strong> dashboard provides district-by-district
                    integrity verification across Upper Assam, Central Assam, and North Bank gardens.
                  </p>
                  <div className="rounded-xl bg-slate-50 p-3 space-y-1.5 text-xs text-slate-700 border border-slate-100">
                    <p className="font-semibold text-slate-900">What to audit on this page:</p>
                    <p>• <strong>District Mass-Balance:</strong> Compare Green Leaf MT against Made Tea MT per district.</p>
                    <p>• <strong>Assam GI Verification:</strong> Ensure 100% genuine origin compliance for protected Assam tea.</p>
                    <p>• <strong>MRL Chemical Clearance:</strong> Verify batch adherence to FSSAI standards and EU export tolerances.</p>
                    <p>• <strong>Export CSV:</strong> Download a full regulatory audit CSV file in one click.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  to="/compliance-audit"
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950"
                >
                  <span>Go to Compliance Audit</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Tool 4 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        4. NESFIC-I-08 Proposal &amp; PDFs
                      </h3>
                      <p className="text-xs text-slate-500">Route: <code>/proposal</code></p>
                    </div>
                  </div>
                  <Link
                    to="/proposal"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 hover:underline"
                  >
                    <span>Open</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="mt-4 space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <p>
                    The <strong>Proposal &amp; Documentation</strong> page contains the complete
                    12-section NESFIC application submitted by Lead Applicant Pratibha Das
                    Hatibaruah (Rojes Labs).
                  </p>
                  <div className="rounded-xl bg-slate-50 p-3 space-y-1.5 text-xs text-slate-700 border border-slate-100">
                    <p className="font-semibold text-slate-900">Key resources available:</p>
                    <p>• <strong>All 12 Sections:</strong> Word-count verified responses (all strictly under 500 words).</p>
                    <p>• <strong>One-Click Copy:</strong> Copy individual sections directly into official challenge forms.</p>
                    <p>• <strong>₹40.00L Budget Breakdown:</strong> Complete breakdown with 50% (₹20.00L) allocated to Technical Engineering.</p>
                    <p>• <strong>PDF Downloads:</strong> Instant download of <code>Rojes_Labs_NESFIC-I-08_Proposal.pdf</code> and <code>Proof_of_Work.pdf</code>.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  to="/proposal"
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950"
                >
                  <span>Review Proposal &amp; Download PDFs</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Role-Based Workflows */}
      {activeTab === 'personas' && (
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900">
              How Different Stakeholders Use Assam TeaTrace
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Designed for simple bilingual operation across garden sheds, factory floors, quality
              labs, and consumer retail counters.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Persona 1 */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-3">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-sm">
                  1
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Small Tea Grower (STG) / Field Clerk
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Operates at the village green-leaf collection shed. Weighed on a Bluetooth digital
                  scale connected to the offline mobile app. The grower's QR card is scanned,
                  minting an immutable green-leaf lot record with GPS coordinates even when internet
                  is down.
                </p>
                <div className="text-[11px] font-semibold text-emerald-800">
                  Tool: Offline Mobile PWA
                </div>
              </div>

              {/* Persona 2 */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-3">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-sm">
                  2
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  BLF / Estate Factory Manager
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Scans incoming green-leaf bags at the factory gate and monitors each transformation
                  through withering troughs, CTC/Orthodox rollers, dryers, and sorting bins. The
                  mass-balance engine continuously verifies that recovery stays within 21%–25%.
                </p>
                <div className="text-[11px] font-semibold text-emerald-800">
                  Tool: Value Chain Ledger (`/`)
                </div>
              </div>

              {/* Persona 3 */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-3">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-sm">
                  3
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  QA Officer / TRA &amp; NABL Auditor
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Uploads pesticide residue and heavy-metal test certificates directly into the
                  Compliance Vault. Lots meeting FSSAI and EU standards receive export clearance.
                  Lots with exceedance are digitally locked, preventing them from being blended.
                </p>
                <div className="text-[11px] font-semibold text-emerald-800">
                  Tool: GI &amp; MRL Audit (`/compliance-audit`)
                </div>
              </div>

              {/* Persona 4 */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-3">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-sm">
                  4
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Auction Buyer / End Consumer
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Scans the GS1 Digital Link QR code on a bulk tea chest or retail tea pouch with any
                  standard smartphone camera. Immediately views the verified garden origin, plucking
                  date, factory outturn, and certified chemical clearance certificate.
                </p>
                <div className="text-[11px] font-semibold text-emerald-800">
                  Tool: GS1 QR Digital Product Passport
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Tab 4: Core Innovations & Math */}
      {activeTab === 'tech' && (
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Core Innovations, Math &amp; Cryptography
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                How Rojes Labs achieves foolproof tamper resistance and mathematical mass balance.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Scale className="h-4 w-4 text-emerald-700" />
                  <span>The Mass-Balance Equation</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  In Assam black tea manufacturing, fresh green leaf (approx. 75%–78% moisture)
                  dries down to finished made tea (approx. 3%–4% moisture). This yields a strict
                  physical conversion ratio:
                </p>
                <div className="rounded-lg bg-white p-2.5 border border-slate-200 text-center font-mono text-xs text-emerald-800 font-bold">
                  21.0% &le; (Made Tea kg &divide; Green Leaf kg) &le; 25.0%
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  If factory output reports a ratio higher than 25.0%, unverified leaf or dust has
                  been added. If lower than 21.0%, severe withering/spillage loss has occurred.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Database className="h-4 w-4 text-emerald-700" />
                  <span>SHA-256 Hash Chaining</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every custody event computes a SHA-256 cryptographic digest encompassing:
                </p>
                <div className="rounded-lg bg-white p-2.5 border border-slate-200 font-mono text-[11px] text-slate-700 space-y-0.5">
                  <p>Hash_n = SHA256(Hash_n-1 + EventType + Weight + GardenID + Timestamp)</p>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Any retrospective alteration of weights, garden origins, or lab scores
                  invalidates all downstream digests, making ledger fraud instantly visible.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Smartphone className="h-4 w-4 text-emerald-700" />
                  <span>Offline-First Field Sync</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Designed specifically for remote tea valleys in Upper Assam with patchy 2G/4G
                  connectivity:
                </p>
                <div className="rounded-lg bg-white p-2.5 border border-slate-200 text-xs text-slate-700 space-y-1">
                  <p>• Local IndexedDB store on Android PWA</p>
                  <p>• Bluetooth weighbridge direct pairing</p>
                  <p>• Conflict-free encrypted batch replay upon network recovery</p>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Field operations never halt due to network outages.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Quick Launch CTA Banner */}
      <section className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-emerald-950">
            Ready to test Assam TeaTrace in action?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-800/90 mt-1">
            Try the Batch &amp; QR Provenance Simulator to test nominal yields, leaf substitution, and
            chemical quarantine.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5 shrink-0">
          <Link
            to="/trace-simulator"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-emerald-800 transition-colors"
          >
            <QrCode className="h-4 w-4" />
            <span>Launch Simulator</span>
          </Link>
          <Link
            to="/proposal"
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-700 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-emerald-900 hover:bg-emerald-50 transition-colors"
          >
            <FileCheck2 className="h-4 w-4 text-emerald-700" />
            <span>View NESFIC Proposal</span>
          </Link>
        </div>
      </section>
    </div>
  );
};