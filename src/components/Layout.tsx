import React from 'react';
import { NavLink } from 'react-router-dom';
import { GitBranch, QrCode, ShieldCheck, FileText, Sprout } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { to: '/', label: 'Value Chain Ledger', icon: GitBranch },
  { to: '/trace-simulator', label: 'Batch & QR Simulator', icon: QrCode },
  { to: '/compliance-audit', label: 'GI & MRL Audit', icon: ShieldCheck },
  { to: '/proposal', label: 'NESFIC-I-08 Proposal & PDFs', icon: FileText },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-emerald-900/10 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-900 to-emerald-500 text-white shadow-sm">
                <Sprout className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold tracking-tight text-slate-900">
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
            </div>

            <nav aria-label="Primary Navigation" className="flex flex-wrap gap-1.5">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-900'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <ShieldCheck className="h-4 w-4 text-emerald-700" />
                <span>Rojes Labs — NESFIC 2026</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Assam TeaTrace delivers cryptographic farm-to-cup provenance, mass-balance
                reconciliation, and GI/MRL compliance across Small Tea Growers, Bought-Leaf
                Factories, Estates, and Auctions.
              </p>
              <p className="mt-2 text-xs font-medium text-emerald-800">
                Lead Applicant: Pratibha Das Hatibaruah
              </p>
            </div>

            <div className="md:col-span-2 rounded-xl border border-amber-200/80 bg-amber-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-900">
                Disclaimer
              </p>
              <p className="mt-1 text-xs leading-relaxed text-amber-950/80">
                This web application is a functional prototype and Proof of Work developed for
                the North East Seva First Innovation Challenge (NESFIC-I-08). Batch ledgers,
                mass-balance ratios, cryptographic hashes, and MRL audit records shown in the
                dashboard and simulator use simulated and bench-calibrated datasets for
                demonstration. Commercial deployment across Assam tea estates, Small Tea Growers,
                and Bought-Leaf Factories requires formal onboarding, weighbridge/ERP integration,
                and compliance validation with the Tea Research Association (TRA) – Tocklai and
                the Tea Board of India.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-start justify-between gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center">
            <p>&copy; {new Date().getFullYear()} Rojes Labs. All rights reserved.</p>
            <p>
              Lead Applicant: <strong className="text-slate-700">Pratibha Das Hatibaruah</strong> · Region:
              Assam, India (IN-AS)
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
