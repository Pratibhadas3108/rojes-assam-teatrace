import React from 'react';
import { Award, Download, ShieldCheck, AlertCircle } from 'lucide-react';
import { DISTRICT_COMPLIANCE, TEA_BATCHES } from '../data/mockTelemetry';

export const Analytics: React.FC = () => {
  const handleExportCsv = () => {
    const header =
      'BatchID,PassportCode,Origin,District,GrowerType,Grade,GreenLeafKg,MadeTeaKg,OutturnPct,MRLStatus,GIVerified,Status,RootHash\n';
    const rows = TEA_BATCHES.map(
      (b) =>
        `"${b.batchId}","${b.passportCode}","${b.originName}","${b.district}","${b.growerType}","${b.grade}",${b.greenLeafKg},${b.madeTeaKg},${b.outturnPct},"${b.mrlStatus}",${b.giVerified},"${b.status}","${b.rootHash}"`,
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Rojes_Assam_TeaTrace_Audit_Ledger.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900">
              <ShieldCheck className="h-3.5 w-3.5" />
              Assam GI &amp; Export MRL Compliance
            </span>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">
              District Mass-Balance &amp; Regulatory Audit
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Monitor Assam Geographical Indication (GI) provenance integrity, green-leaf-to-made-tea
              recovery ratios, and FSSAI/EU-MRL clearance across Upper &amp; Central Assam.
            </p>
          </div>
          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-emerald-800"
          >
            <Download className="h-4 w-4" />
            <span>Export Audit CSV</span>
          </button>
        </div>
      </section>

      {/* District Table */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-base font-bold text-slate-900">
          Assam District Provenance &amp; Outturn Summary
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-2 font-semibold">District</th>
                <th className="pb-2 font-semibold">Tracked Lots</th>
                <th className="pb-2 font-semibold">Green Leaf (MT)</th>
                <th className="pb-2 font-semibold">Made Tea (MT)</th>
                <th className="pb-2 font-semibold">Avg Outturn</th>
                <th className="pb-2 font-semibold">GI Pass Rate</th>
                <th className="pb-2 font-semibold">MRL Pass Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DISTRICT_COMPLIANCE.map((row) => (
                <tr key={row.district} className="hover:bg-slate-50">
                  <td className="py-3 font-semibold text-slate-900">{row.district}</td>
                  <td className="py-3 text-slate-700">{row.batches}</td>
                  <td className="py-3 text-slate-700">{row.greenLeafMt.toFixed(1)}</td>
                  <td className="py-3 text-slate-700">{row.madeTeaMt.toFixed(1)}</td>
                  <td className="py-3 font-medium text-emerald-800">
                    {row.avgOutturnPct.toFixed(1)}%
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-800">
                      <Award className="h-3 w-3" />
                      {row.giPassRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold ${
                        row.mrlPassRate >= 96
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-amber-50 text-amber-800'
                      }`}
                    >
                      {row.mrlPassRate < 96 && <AlertCircle className="h-3 w-3" />}
                      {row.mrlPassRate.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
