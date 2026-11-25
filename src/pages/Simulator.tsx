import React, { useMemo, useState } from 'react';
import { QrCode, ShieldAlert, CheckCircle2, RefreshCw, Sparkles, Lock } from 'lucide-react';

function pseudoSha256(input: string): string {
  let h1 = 0xdeadbeef ^ input.length;
  let h2 = 0x41c6ce57 ^ input.length;
  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const hex =
    (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0');
  return `0x${hex}`;
}

export const Simulator: React.FC = () => {
  const [district, setDistrict] = useState('Jorhat');
  const [growerType, setGrowerType] = useState('STG Cooperative');
  const [grade, setGrade] = useState('Orthodox-FTGFOP1');
  const [greenLeafKg, setGreenLeafKg] = useState(4000);
  const [madeTeaKg, setMadeTeaKg] = useState(920);
  const [mrlCleared, setMrlCleared] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);

  const outturnPct = useMemo(
    () => (greenLeafKg > 0 ? (madeTeaKg / greenLeafKg) * 100 : 0),
    [greenLeafKg, madeTeaKg],
  );

  const isMassBalanceValid = outturnPct >= 20 && outturnPct <= 25;
  const passportStatus =
    !isMassBalanceValid
      ? 'QUARANTINED — Mass-Balance Anomaly (Possible Leaf Substitution)'
      : !mrlCleared
        ? 'HELD — MRL Residue Clearance Pending'
        : 'VERIFIED — Ready for Assam GI & Export Dispatch';

  const rootHash = useMemo(
    () =>
      pseudoSha256(
        `${district}|${growerType}|${grade}|${greenLeafKg}|${madeTeaKg}|${mrlCleared}|${offlineMode}`,
      ),
    [district, growerType, grade, greenLeafKg, madeTeaKg, mrlCleared, offlineMode],
  );

  const injectSubstitutionFault = () => {
    setMadeTeaKg(Math.round(greenLeafKg * 0.31)); // 31% impossible outturn
  };

  const resetNormal = () => {
    setGreenLeafKg(4000);
    setMadeTeaKg(920);
    setMrlCleared(true);
    setOfflineMode(false);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900">
              <Sparkles className="h-3.5 w-3.5" />
              Interactive Proof of Work · NESFIC-I-08
            </span>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">
              Batch &amp; QR Provenance Simulator
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Simulate green-leaf intake, factory outturn mass-balance verification, offline edge
              sync, and Digital Product Passport QR minting.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={injectSubstitutionFault}
              className="inline-flex items-center gap-1.5 rounded-xl bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-800 ring-1 ring-rose-200 hover:bg-rose-100"
            >
              <ShieldAlert className="h-4 w-4" />
              Inject Leaf Substitution Fault
            </button>
            <button
              type="button"
              onClick={resetNormal}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
            >
              <RefreshCw className="h-4 w-4" />
              Reset Normal Lot
            </button>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Controls */}
        <section className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
          <h2 className="text-base font-bold text-slate-900">
            1. Configure Lot Intake &amp; Factory Processing
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block text-xs">
              <span className="font-semibold text-slate-700">Assam District</span>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              >
                <option>Jorhat</option>
                <option>Dibrugarh</option>
                <option>Tinsukia</option>
                <option>Golaghat</option>
                <option>Sonitpur</option>
              </select>
            </label>

            <label className="block text-xs">
              <span className="font-semibold text-slate-700">Origin Type</span>
              <select
                value={growerType}
                onChange={(e) => setGrowerType(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              >
                <option>STG Cooperative</option>
                <option>Heritage Estate</option>
                <option>Bought-Leaf Factory</option>
              </select>
            </label>

            <label className="block text-xs">
              <span className="font-semibold text-slate-700">Made Tea Grade</span>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              >
                <option>Orthodox-FTGFOP1</option>
                <option>Orthodox-TGFOP</option>
                <option>CTC-BOPSM</option>
                <option>CTC-BP</option>
                <option>Green-Whole</option>
              </select>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Green Leaf Intake (kg)</span>
                <span className="font-bold text-emerald-800">{greenLeafKg} kg</span>
              </div>
              <input
                type="range"
                min={1000}
                max={10000}
                step={100}
                value={greenLeafKg}
                onChange={(e) => setGreenLeafKg(Number(e.target.value))}
                className="mt-1.5 w-full accent-emerald-700"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">
                  Made Tea Output (kg) — Expected TRA Band: 20%–25%
                </span>
                <span
                  className={`font-bold ${
                    isMassBalanceValid ? 'text-emerald-800' : 'text-rose-700'
                  }`}
                >
                  {madeTeaKg} kg ({outturnPct.toFixed(1)}% outturn)
                </span>
              </div>
              <input
                type="range"
                min={200}
                max={3500}
                step={20}
                value={madeTeaKg}
                onChange={(e) => setMadeTeaKg(Number(e.target.value))}
                className="mt-1.5 w-full accent-emerald-700"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6 border-t border-slate-100 pt-4 text-xs">
            <label className="inline-flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={mrlCleared}
                onChange={(e) => setMrlCleared(e.target.checked)}
                className="h-4 w-4 rounded accent-emerald-700"
              />
              TRA / NABL MRL Lab Clearance Passed
            </label>

            <label className="inline-flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={offlineMode}
                onChange={(e) => setOfflineMode(e.target.checked)}
                className="h-4 w-4 rounded accent-emerald-700"
              />
              Simulate Rural Shed Offline Queue Sync
            </label>
          </div>
        </section>

        {/* Live QR Passport Output */}
        <section className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">
                2. Live Digital Product Passport
              </h2>
              <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-800">
                <Lock className="h-3.5 w-3.5" />
                {rootHash}
              </span>
            </div>

            <div
              className={`mt-4 rounded-xl p-3.5 text-xs font-semibold flex items-start gap-2 ${
                !isMassBalanceValid
                  ? 'bg-rose-50 text-rose-900 ring-1 ring-rose-200'
                  : !mrlCleared
                    ? 'bg-amber-50 text-amber-900 ring-1 ring-amber-200'
                    : 'bg-emerald-50 text-emerald-900 ring-1 ring-emerald-200'
              }`}
            >
              {isMassBalanceValid && mrlCleared ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
              ) : (
                <ShieldAlert className="h-4 w-4 shrink-0 text-rose-700 mt-0.5" />
              )}
              <span>{passportStatus}</span>
            </div>

            <div className="mt-5 flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-xs">
                <QrCode
                  className={`h-16 w-16 ${
                    isMassBalanceValid && mrlCleared ? 'text-emerald-900' : 'text-slate-400'
                  }`}
                />
              </div>
              <div className="text-xs space-y-1">
                <p className="font-bold text-slate-900">
                  GS1 Digital Link · {district.toUpperCase()}-2026
                </p>
                <p className="text-slate-600">
                  {growerType} · {grade}
                </p>
                <p className="text-slate-600">
                  Outturn: <strong>{outturnPct.toFixed(1)}%</strong> ({madeTeaKg} kg /{' '}
                  {greenLeafKg} kg)
                </p>
                <p className="text-slate-500">
                  Sync: {offlineMode ? 'Queued Offline → Synced' : 'Real-Time 4G'}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-[11px] text-slate-500">
            Note: Any change to green leaf intake, made tea output, or MRL status dynamically
            recomputes the cryptographic root hash and triggers quarantine if outturn exceeds 25%.
          </p>
        </section>
      </div>
    </div>
  );
};
