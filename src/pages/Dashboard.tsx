import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  MapPin,
  Hash,
  QrCode,
  ArrowRight,
  Layers,
  Award,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { TEA_BATCHES, TeaBatch } from '../data/mockTelemetry';

const statusBadge = (status: TeaBatch['status']) => {
  if (status === 'Verified') {
    return 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600/20';
  }
  if (status === 'Mass-Balance Alert') {
    return 'bg-rose-50 text-rose-800 ring-1 ring-rose-600/20';
  }
  return 'bg-amber-50 text-amber-800 ring-1 ring-amber-600/20';
};

export const Dashboard: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState<TeaBatch>(TEA_BATCHES[0]);
  const [districtFilter, setDistrictFilter] = useState<string>('All');

  const districts = ['All', 'Jorhat', 'Dibrugarh', 'Tinsukia', 'Golaghat', 'Sonitpur'];
  const filteredBatches =
    districtFilter === 'All'
      ? TEA_BATCHES
      : TEA_BATCHES.filter((b) => b.district === districtFilter);

  const verifiedCount = TEA_BATCHES.filter((b) => b.status === 'Verified').length;
  const totalGreenLeaf = TEA_BATCHES.reduce((acc, b) => acc + b.greenLeafKg, 0);
  const totalMadeTea = TEA_BATCHES.reduce((acc, b) => acc + b.madeTeaKg, 0);

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <section className="rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-emerald-100">
              <span>NESFIC-I-08 · TRA Tocklai</span>
              <span>·</span>
              <span>Assam Tea Value Chain</span>
            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Assam TeaTrace — Farm-to-Cup Digital Provenance Ledger
            </h1>
            <p className="mt-2 text-sm text-emerald-100/90">
              Cryptographic lot lineage, physical mass-balance verification (21%–25% outturn),
              Assam GI origin proofs, and FSSAI/EU-MRL clearance across Small Tea Growers,
              Bought-Leaf Factories, Estates, and Auctions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/trace-simulator"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-emerald-950 shadow-xs hover:bg-emerald-50"
            >
              <QrCode className="h-4 w-4" />
              <span>Launch Batch Simulator</span>
            </Link>
            <Link
              to="/proposal"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/20"
            >
              <span>View Proposal &amp; PDFs</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <p className="text-xs font-medium text-slate-500">Tracked Value-Chain Lots</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{TEA_BATCHES.length} Active</p>
          <p className="mt-1 text-xs text-emerald-700">{verifiedCount} Cryptographically Verified</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <p className="text-xs font-medium text-slate-500">Green Leaf Intake Logged</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {totalGreenLeaf.toLocaleString('en-IN')} kg
          </p>
          <p className="mt-1 text-xs text-slate-500">STG Sheds &amp; Estate Weighbridges</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <p className="text-xs font-medium text-slate-500">Made Tea Output Reconciled</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {totalMadeTea.toLocaleString('en-IN')} kg
          </p>
          <p className="mt-1 text-xs text-emerald-700">
            Avg Outturn {((totalMadeTea / totalGreenLeaf) * 100).toFixed(1)}% (TRA Band)
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <p className="text-xs font-medium text-slate-500">Automated Anomaly Guards</p>
          <p className="mt-2 text-2xl font-bold text-amber-700">2 Quarantined</p>
          <p className="mt-1 text-xs text-slate-500">1 Mass-Balance · 1 MRL Hold</p>
        </div>
      </section>

      {/* Main Split: Batch Table + Custody Timeline */}
      <section className="grid gap-6 lg:grid-cols-12">
        {/* Batch Explorer */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Assam Tea Batch Ledger</h2>
              <p className="text-xs text-slate-500">
                Select any lot to inspect its SHA-256 custody timeline and Digital Product Passport.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {districts.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDistrictFilter(d)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                    districtFilter === d
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="pb-2 font-semibold">Batch ID &amp; Origin</th>
                  <th className="pb-2 font-semibold">Grade</th>
                  <th className="pb-2 font-semibold">Outturn</th>
                  <th className="pb-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBatches.map((batch) => {
                  const isSelected = batch.batchId === selectedBatch.batchId;
                  return (
                    <tr
                      key={batch.batchId}
                      onClick={() => setSelectedBatch(batch)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-emerald-50/70' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-3 pr-3">
                        <p className="font-semibold text-slate-900">{batch.batchId}</p>
                        <p className="text-slate-500">
                          {batch.originName} · {batch.district}
                        </p>
                      </td>
                      <td className="py-3 pr-3 text-slate-700">{batch.grade}</td>
                      <td className="py-3 pr-3">
                        <span
                          className={`font-semibold ${
                            batch.outturnPct > 25 ? 'text-rose-700' : 'text-slate-900'
                          }`}
                        >
                          {batch.outturnPct.toFixed(1)}%
                        </span>
                        <p className="text-[11px] text-slate-500">
                          {batch.madeTeaKg} / {batch.greenLeafKg} kg
                        </p>
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusBadge(
                            batch.status,
                          )}`}
                        >
                          {batch.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Custody Timeline & Passport */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">
                <Layers className="h-3 w-3" />
                Passport {selectedBatch.passportCode}
              </span>
              <h2 className="mt-1.5 text-base font-bold text-slate-900">
                {selectedBatch.batchId}
              </h2>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                <MapPin className="h-3.5 w-3.5 text-emerald-700" />
                <span>
                  {selectedBatch.district}, Assam ({selectedBatch.gps})
                </span>
              </p>
            </div>
            {selectedBatch.giVerified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-900">
                <Award className="h-3.5 w-3.5" />
                Assam GI
              </span>
            )}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-3 text-xs">
            <div>
              <span className="text-slate-500">MRL Status:</span>{' '}
              <strong className="text-slate-900">{selectedBatch.mrlStatus}</strong>
            </div>
            <div>
              <span className="text-slate-500">Root Hash:</span>{' '}
              <code className="font-mono text-emerald-800">{selectedBatch.rootHash}</code>
            </div>
            <div className="col-span-2">
              <span className="text-slate-500">Destination:</span>{' '}
              <strong className="text-slate-900">{selectedBatch.destination}</strong>
            </div>
          </div>

          <h3 className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Cryptographic Chain of Custody
          </h3>
          <ol className="mt-3 space-y-3">
            {selectedBatch.events.map((ev) => (
              <li
                key={ev.hash}
                className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                    {ev.status === 'ok' && (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                    )}
                    {ev.status === 'warn' && (
                      <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
                    )}
                    {ev.status === 'alert' && (
                      <ShieldAlert className="h-4 w-4 shrink-0 text-rose-600" />
                    )}
                    <span>{ev.stage}</span>
                  </div>
                  <span className="shrink-0 text-[11px] text-slate-400">{ev.timestamp}</span>
                </div>
                <p className="mt-1 text-slate-600">
                  {ev.actor} · <span className="font-medium text-slate-800">{ev.metric}</span>
                </p>
                <p className="mt-1 flex items-center gap-1 font-mono text-[11px] text-slate-500">
                  <Hash className="h-3 w-3 text-emerald-700" />
                  {ev.hash}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
};
