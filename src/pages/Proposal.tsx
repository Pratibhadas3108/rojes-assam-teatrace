import React, { useState } from 'react';
import { Check, Copy, Download, ExternalLink, FileCheck2, FileText, Github, Globe } from 'lucide-react';
import { BUDGET_ALLOCATION, PROPOSAL_METADATA, PROPOSAL_SECTIONS } from '../data/proposalContent';

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export const Proposal: React.FC = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = async (id: number, content: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="space-y-6">
      {/* Header & PDF Downloads */}
      <section className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900">
              {PROPOSAL_METADATA.challengeId} · {PROPOSAL_METADATA.sponsor}
            </span>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">
              {PROPOSAL_METADATA.challengeTitle}
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Organization: <strong>{PROPOSAL_METADATA.organization}</strong> · Lead Applicant:{' '}
              <strong>{PROPOSAL_METADATA.leadApplicant}</strong>
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <a
              href="/docs/Rojes_Labs_NESFIC-I-08_Proposal.pdf"
              download
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-emerald-800"
            >
              <Download className="h-4 w-4" />
              <span>Download Proposal PDF</span>
            </a>
            <a
              href="/docs/Rojes_Labs_NESFIC-I-08_Proof_of_Work.pdf"
              download
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-700 bg-emerald-50 px-3.5 py-2 text-xs sm:text-sm font-semibold text-emerald-900 hover:bg-emerald-100"
            >
              <FileCheck2 className="h-4 w-4" />
              <span>Download Proof of Work PDF</span>
            </a>
            <a
              href="/docs/Rojes_Labs_NESFIC-I-08_Proposal_CopyPaste.txt"
              download
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs"
            >
              <FileText className="h-4 w-4 text-emerald-700" />
              <span>Copy/Paste TXT File</span>
            </a>
          </div>
        </div>

        <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 text-xs text-slate-600 sm:grid-cols-3">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-emerald-700 shrink-0" />
            <span className="truncate">
              Live Web App:{' '}
              <a
                href={PROPOSAL_METADATA.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-700 hover:underline"
              >
                {PROPOSAL_METADATA.productUrl}
              </a>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Github className="h-4 w-4 text-slate-800 shrink-0" />
            <span className="truncate">
              GitHub Repo:{' '}
              <a
                href={PROPOSAL_METADATA.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate-800 hover:underline"
              >
                Pratibhadas3108/rojes-assam-teatrace
              </a>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ExternalLink className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
            <span className="truncate">
              Demo / Video URL: <code>{PROPOSAL_METADATA.demoVideoUrl}</code>
            </span>
          </div>
        </div>
      </section>

      {/* Indicative Resource & Budget Allocation */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Indicative Resource &amp; Budget Allocation
            </h2>
            <p className="text-xs text-slate-500">
              6-month build &amp; Assam shadow-pilot budget under the ₹40.00 Lakhs NESFIC-I-08 grant
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-900">
            Total Grant: ₹40.00 Lakhs
          </span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-2 font-semibold">Budget Heading</th>
                <th className="pb-2 font-semibold">Scope &amp; Utilization</th>
                <th className="pb-2 text-right font-semibold">Amount (₹ Lakhs)</th>
                <th className="pb-2 text-right font-semibold">Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {BUDGET_ALLOCATION.map((row) => (
                <tr key={row.head} className="hover:bg-slate-50">
                  <td className="py-2.5 pr-3 font-semibold text-slate-900">{row.head}</td>
                  <td className="py-2.5 pr-3 text-slate-600">{row.scope}</td>
                  <td className="py-2.5 text-right font-bold text-emerald-800">
                    ₹{row.amountLakhs.toFixed(2)} L
                  </td>
                  <td className="py-2.5 text-right text-slate-600">{row.sharePct.toFixed(0)}%</td>
                </tr>
              ))}
              <tr className="border-t-2 border-slate-200 bg-emerald-50/60 font-bold text-slate-900">
                <td className="py-2.5 pr-3">Total Problem Statement Grant</td>
                <td className="py-2.5 pr-3 text-slate-600 font-normal">
                  24-Week Development, Hardware Kits &amp; TRA Tocklai Validation
                </td>
                <td className="py-2.5 text-right text-emerald-900">₹40.00 L</td>
                <td className="py-2.5 text-right">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 12 Proposal Sections */}
      <div className="space-y-4">
        {PROPOSAL_SECTIONS.map((sec) => {
          const words = countWords(sec.content);
          const isCopied = copiedId === sec.id;
          return (
            <article
              key={sec.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{sec.title}</h2>
                  <p className="mt-0.5 text-xs text-slate-500">{sec.promptHint}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      words <= 500
                        ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600/20'
                        : 'bg-rose-50 text-rose-800 ring-1 ring-rose-600/20'
                    }`}
                  >
                    {words} / 500 words
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(sec.id, sec.content)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-700" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-700">
                {sec.content}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
