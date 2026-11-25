import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  GitBranch,
  QrCode,
  ShieldCheck,
  FileText,
  Sprout,
  Github,
  Globe,
  ExternalLink,
  MapPin,
  HelpCircle,
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    to: '/',
    label: 'Value Chain Ledger',
    icon: GitBranch,
    title: 'Assam Tea Value Chain Ledger — Farm to Cup Cryptographic Provenance (Jorhat, Dibrugarh, Tinsukia)',
    ariaLabel: 'Navigate to Assam Tea Value Chain Ledger and Digital Product Passport explorer',
  },
  {
    to: '/trace-simulator',
    label: 'Batch & QR Simulator',
    icon: QrCode,
    title: 'Assam Tea Batch & QR Provenance Simulator — Real-time Outturn & Tamper Detection',
    ariaLabel: 'Navigate to Assam Tea Batch & QR Provenance Simulator',
  },
  {
    to: '/compliance-audit',
    label: 'GI & MRL Audit',
    icon: ShieldCheck,
    title: 'Assam GI Origin & Export MRL Chemical Compliance Audit — TRA Tocklai Standards',
    ariaLabel: 'Navigate to Assam GI Origin & MRL Compliance Audit',
  },
  {
    to: '/proposal',
    label: 'NESFIC-I-08 Proposal & PDFs',
    icon: FileText,
    title: 'NESFIC-I-08 Complete Proposal & Proof of Work by Rojes Labs (Lead Applicant: Pratibha Das Hatibaruah)',
    ariaLabel: 'Navigate to NESFIC-I-08 Proposal, Budget Allocation, and Official PDF Downloads',
  },
  {
    to: '/tutorial',
    label: 'Tutorial & Guide',
    icon: HelpCircle,
    title: 'Assam TeaTrace Application Tutorial — How Digital Traceability Works Across Assam Tea Valleys',
    ariaLabel: 'Navigate to Application Tutorial and User Guide',
  },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-emerald-900/10 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
            <Link
              to="/"
              title="Rojes Labs Assam TeaTrace — Digital Traceability Across Assam Tea Value Chain (NESFIC-I-08)"
              aria-label="Rojes Labs Assam TeaTrace Home"
              className="flex items-center gap-3 group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-900 to-emerald-500 text-white shadow-sm group-hover:scale-105 transition-transform">
                <Sprout className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-900 transition-colors">
                    Rojes Labs
                  </span>
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20">
                    NESFIC-I-08
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Assam TeaTrace · End-to-End Digital Tea Value Chain Traceability · TRA Tocklai
                </p>
              </div>
            </Link>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <nav aria-label="Primary Navigation" className="flex flex-wrap gap-1">
                {navItems.map(({ to, label, icon: Icon, title, ariaLabel }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    title={title}
                    aria-label={ariaLabel}
                    className={({ isActive }) =>
                      `inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-emerald-700 text-white shadow-sm'
                          : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-900'
                      }`
                    }
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>{label}</span>
                  </NavLink>
                ))}
              </nav>

              <div className="flex items-center gap-1.5 border-l border-slate-200 pl-2">
                <a
                  href="https://rojes-assam-teatrace.pages.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open Rojes Labs Assam TeaTrace Live Application (Cloudflare Pages)"
                  aria-label="Open live application at rojes-assam-teatrace.pages.dev"
                  className="inline-flex items-center gap-1 rounded-lg border border-emerald-300 bg-emerald-50 px-2 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors"
                >
                  <Globe className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">Live App</span>
                </a>
                <a
                  href="https://github.com/Pratibhadas3108/rojes-assam-teatrace"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View Rojes Labs Assam TeaTrace Source Code on GitHub (Pratibha Das Hatibaruah)"
                  aria-label="Open GitHub Repository Pratibhadas3108/rojes-assam-teatrace"
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-slate-50 px-2 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <Github className="h-3.5 w-3.5 text-slate-800" />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Entity & Project Overview */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Sprout className="h-4 w-4 text-emerald-700" />
                <span>Rojes Labs — Assam TeaTrace</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-600">
                End-to-end digital traceability, cryptographic batch passports, mass-balance
                reconciliation, and Assam GI / MRL export compliance for the North East Seva First
                Innovation Challenge (NESFIC-I-08) sponsored by the Tea Research Association (TRA) –
                Tocklai.
              </p>
              <div className="pt-1 text-xs text-slate-700 space-y-1">
                <p>
                  <strong>Lead Applicant:</strong> Pratibha Das Hatibaruah
                </p>
                <p>
                  <strong>Submitting Entity:</strong> Rojes Labs
                </p>
                <p className="flex items-center gap-1 text-emerald-800 font-medium">
                  <MapPin className="h-3.5 w-3.5 text-emerald-700" />
                  <span>Assam, India (Jorhat, Dibrugarh, Tinsukia, Golaghat, Sonitpur)</span>
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <a
                  href="https://rojes-assam-teatrace.pages.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md bg-emerald-700 px-2.5 py-1 text-xs font-semibold text-white shadow-2xs hover:bg-emerald-800 transition-colors"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>rojes-assam-teatrace.pages.dev</span>
                  <ExternalLink className="h-3 w-3 opacity-80" />
                </a>
                <a
                  href="https://github.com/Pratibhadas3108/rojes-assam-teatrace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="h-3 w-3 opacity-80" />
                </a>
              </div>
            </div>

            {/* SEO & GEO Friendly Navigation Links */}
            <div className="lg:col-span-4 space-y-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Traceability Modules &amp; Documentation
                </p>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                  <li>
                    <NavLink
                      to="/"
                      title="Assam Tea Value Chain Ledger — Farm to Cup Traceability (Jorhat, Dibrugarh, Tinsukia, Golaghat, Sonitpur)"
                      className="hover:text-emerald-800 hover:underline"
                    >
                      Value Chain Ledger (Batch Lineage &amp; Hash Integrity)
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/trace-simulator"
                      title="Assam Tea Batch &amp; QR Provenance Simulator — Live Outturn &amp; Fault Injection"
                      className="hover:text-emerald-800 hover:underline"
                    >
                      Batch &amp; QR Provenance Simulator (Outturn Math)
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/compliance-audit"
                      title="Assam Geographical Indication (GI) &amp; MRL Chemical Compliance Audit"
                      className="hover:text-emerald-800 hover:underline"
                    >
                      GI &amp; MRL Chemical Compliance Audit (CSV Export)
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/proposal"
                      title="NESFIC-I-08 Technical Proposal &amp; Official Downloadable PDFs — TRA Tocklai"
                      className="hover:text-emerald-800 hover:underline"
                    >
                      NESFIC-I-08 Full Proposal &amp; Proof of Work PDFs
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/tutorial"
                      title="Assam TeaTrace Application Tutorial — How Digital Traceability Works Across Assam Tea Valleys"
                      className="hover:text-emerald-800 hover:underline flex items-center gap-1 font-semibold text-emerald-700"
                    >
                      <HelpCircle className="h-3.5 w-3.5" />
                      <span>Application Tutorial &amp; Interactive User Guide</span>
                    </NavLink>
                  </li>
                </ul>
              </div>

              {/* Geographic District Links (GEO & SEO Friendly) */}
              <div className="pt-2 border-t border-slate-100">
                <p className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                  Assam Tea Geographical Indication (GI) Districts
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1.5 text-[11px]">
                  <NavLink
                    to="/compliance-audit"
                    title="Jorhat District — TRA Tocklai Headquarters &amp; Central Assam Clonal Tea Estates"
                    className="rounded-md bg-emerald-50 px-2 py-0.5 text-emerald-900 hover:bg-emerald-100 font-medium"
                  >
                    Jorhat (TRA Tocklai)
                  </NavLink>
                  <NavLink
                    to="/compliance-audit"
                    title="Dibrugarh District — Upper Assam High-Yield Quality Tea Gardens"
                    className="rounded-md bg-emerald-50 px-2 py-0.5 text-emerald-900 hover:bg-emerald-100 font-medium"
                  >
                    Dibrugarh
                  </NavLink>
                  <NavLink
                    to="/compliance-audit"
                    title="Tinsukia District — Small Tea Growers &amp; Bought-Leaf Factory Hub"
                    className="rounded-md bg-emerald-50 px-2 py-0.5 text-emerald-900 hover:bg-emerald-100 font-medium"
                  >
                    Tinsukia
                  </NavLink>
                  <NavLink
                    to="/compliance-audit"
                    title="Golaghat District — South Bank Heritage CTC &amp; Orthodox Plantations"
                    className="rounded-md bg-emerald-50 px-2 py-0.5 text-emerald-900 hover:bg-emerald-100 font-medium"
                  >
                    Golaghat
                  </NavLink>
                  <NavLink
                    to="/compliance-audit"
                    title="Sonitpur District — North Bank Brahmaputra Tea Estates"
                    className="rounded-md bg-emerald-50 px-2 py-0.5 text-emerald-900 hover:bg-emerald-100 font-medium"
                  >
                    Sonitpur
                  </NavLink>
                </div>
              </div>
            </div>

            {/* Official Disclaimer Box */}
            <div className="lg:col-span-4 rounded-xl border border-amber-200/90 bg-amber-50/70 p-4 shadow-2xs">
              <div className="flex items-center gap-1.5 text-amber-900 font-semibold text-xs uppercase tracking-wider">
                <ShieldCheck className="h-4 w-4 text-amber-700" />
                <span>Disclaimer</span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-amber-950/85">
                This web application is a functional prototype and Proof of Work developed by{' '}
                <strong>Rojes Labs</strong> for the North East Seva First Innovation Challenge
                (NESFIC-I-08) sponsored by the <strong>Tea Research Association (TRA) – Tocklai</strong>.
                Batch ledgers, cryptographic SHA-256 digests, mass-balance reconciliation algorithms,
                and MRL audit records presented in the platform use calibrated benchmarks for
                demonstration purposes. Full commercial deployment across Assam tea estates, Small
                Tea Growers (STGs), and Bought-Leaf Factories (BLFs) requires formal hardware
                integration, weighbridge telemetry calibration, and regulatory validation in
                alignment with TRA Tocklai and the Tea Board of India.
              </p>
            </div>
          </div>

          {/* Bottom Bar: Copyrights Rojes Labs */}
          <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center">
            <p className="font-medium text-slate-700">
              &copy; {new Date().getFullYear()} Rojes Labs. All rights reserved.
            </p>
            <p>
              Lead Applicant: <strong className="text-slate-800">Pratibha Das Hatibaruah</strong> ·
              Region: <span className="font-semibold text-emerald-800">Assam, India (IN-AS)</span>
            </p>
            <div className="flex items-center gap-3 text-xs">
              <a
                href="https://rojes-assam-teatrace.pages.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:text-emerald-900 hover:underline"
              >
                rojes-assam-teatrace.pages.dev
              </a>
              <span>·</span>
              <a
                href="https://github.com/Pratibhadas3108/rojes-assam-teatrace"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 hover:underline"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
