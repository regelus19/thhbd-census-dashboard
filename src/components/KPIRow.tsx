import React, { useState } from 'react';
import { Bed, Users, UserCheck, ArrowUpRight, ArrowDownRight, AlertTriangle, RefreshCw, ShieldAlert, Pencil } from 'lucide-react';
import { OperationalKpis } from '../types/hospital';

interface KPIRowProps {
  kpis: OperationalKpis;
  onUpdate: (next: OperationalKpis) => void;
  onReset: () => void;
}

export const KPIRow: React.FC<KPIRowProps> = ({ kpis, onUpdate, onReset }) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<OperationalKpis>(kpis);
  const [saved, setSaved] = useState(false);

  const openEditor = () => {
    setDraft(kpis);
    setSaved(false);
    setEditing(true);
  };

  const save = () => {
    onUpdate(draft);
    setSaved(true);
    window.setTimeout(() => setEditing(false), 350);
  };

  const getStatusBadge = (status: OperationalKpis['capacityStatus']) => {
    switch (status) {
      case 'NORMAL': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'WATCH': return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'ALERT': return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
      case 'CRITICAL': return 'bg-red-500/20 text-red-400 border-red-500/40';
    }
  };

  const numberField = (key: keyof OperationalKpis, label: string) => (
    <label className="text-[11px] text-command-muted">
      <span className="block mb-1">{label}</span>
      <input
        type="number"
        value={draft[key] as number}
        onChange={(e) => setDraft(prev => ({ ...prev, [key]: Number(e.target.value) }))}
        className="w-full bg-command-dark border border-command-border rounded px-2.5 py-2 text-command-text"
      />
    </label>
  );

  return (
    <>
      <div className="flex items-center justify-between mt-2">
        <div className="text-[11px] text-command-muted">Manual MVP values • saved in this browser</div>
        <button onClick={openEditor} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded border border-command-accent/40 bg-command-accent/10 text-command-accent hover:bg-command-accent/20">
          <Pencil size={13} /> Manual Update
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3 my-3">
        <div className="bg-command-card border border-command-border p-3 rounded-lg"><div className="flex items-center justify-between text-command-muted text-xs"><span>Current Census</span><Bed size={16} className="text-command-accent" /></div><div className="mt-2"><span className="text-2xl font-bold">{kpis.census}</span><span className="text-xs text-command-muted"> / {kpis.physicalBeds} physical</span></div></div>
        <div className="bg-command-card border border-command-border p-3 rounded-lg"><div className="flex items-center justify-between text-command-muted text-xs"><span>Staffed Beds</span><Users size={16} className="text-blue-400" /></div><div className="mt-2 text-2xl font-bold">{kpis.staffedBeds}</div></div>
        <div className="bg-command-card border border-command-border p-3 rounded-lg"><div className="flex items-center justify-between text-command-muted text-xs"><span>Actionable Beds</span><UserCheck size={16} className="text-emerald-400" /></div><div className="mt-2 text-2xl font-bold text-emerald-400">{kpis.actionableBeds}</div></div>
        <div className="bg-command-card border border-command-border p-3 rounded-lg"><div className="flex items-center justify-between text-command-muted text-xs"><span>Expected Discharges</span><ArrowUpRight size={16} className="text-emerald-400" /></div><div className="mt-2"><span className="text-2xl font-bold">{kpis.expectedDischarges}</span><span className="text-xs text-command-muted"> next 24h</span></div></div>
        <div className="bg-command-card border border-command-border p-3 rounded-lg"><div className="flex items-center justify-between text-command-muted text-xs"><span>Expected Arrivals</span><ArrowDownRight size={16} className="text-amber-400" /></div><div className="mt-2"><span className="text-2xl font-bold">{kpis.expectedArrivals}</span><span className="text-xs text-command-muted"> next 24h</span></div></div>
        <div className="bg-command-card border border-command-border p-3 rounded-lg"><div className="flex items-center justify-between text-command-muted text-xs"><span>ED Holds</span><AlertTriangle size={16} className="text-orange-400" /></div><div className="mt-2 text-2xl font-bold text-orange-400">{kpis.edHolds}</div></div>
        <div className="bg-command-card border border-command-border p-3 rounded-lg"><div className="flex items-center justify-between text-command-muted text-xs"><span>Pending Transfers</span><RefreshCw size={16} className="text-blue-400" /></div><div className="mt-2 text-2xl font-bold">{kpis.pendingTransfers}</div></div>
        <div className="bg-command-card border border-command-border p-3 rounded-lg"><div className="flex items-center justify-between text-command-muted text-xs"><span>Capacity Status</span><ShieldAlert size={16} className={kpis.capacityStatus === 'CRITICAL' ? 'text-red-400' : 'text-amber-400'} /></div><div className="mt-2 flex items-center justify-between gap-2"><span className={`px-2 py-0.5 rounded text-xs font-bold border ${getStatusBadge(kpis.capacityStatus)}`}>{kpis.capacityStatus}</span><span className="text-[10px] text-command-muted">Proj {kpis.projectedCensus} ({kpis.projectedDelta >= 0 ? '+' : ''}{kpis.projectedDelta})</span></div></div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-command-card border border-command-accent/40 rounded-lg shadow-2xl p-5">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div><h3 className="text-lg font-bold text-command-text">Manual KPI Update</h3><p className="text-xs text-command-muted">Quick demo control. Supporting room and demand data can be updated separately.</p></div>
              {saved && <span className="text-emerald-400 text-sm font-bold">Saved ✓</span>}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {numberField('census', 'Current Census')}
              {numberField('physicalBeds', 'Physical Beds')}
              {numberField('staffedBeds', 'Staffed Beds')}
              {numberField('actionableBeds', 'Actionable Beds')}
              {numberField('expectedDischarges', 'Expected Discharges')}
              {numberField('expectedArrivals', 'Expected Arrivals')}
              {numberField('edHolds', 'ED Holds')}
              {numberField('pendingTransfers', 'Pending Transfers')}
              {numberField('projectedCensus', 'Projected Census')}
              {numberField('projectedDelta', '12h Change')}
              <label className="text-[11px] text-command-muted"><span className="block mb-1">Capacity Status</span><select value={draft.capacityStatus} onChange={(e) => setDraft(prev => ({ ...prev, capacityStatus: e.target.value as OperationalKpis['capacityStatus'] }))} className="w-full bg-command-dark border border-command-border rounded px-2.5 py-2 text-command-text"><option>NORMAL</option><option>WATCH</option><option>ALERT</option><option>CRITICAL</option></select></label>
            </div>
            <div className="flex justify-between mt-5">
              <button onClick={() => { onReset(); setEditing(false); }} className="px-3 py-2 rounded border border-command-border text-command-muted hover:text-command-text">Reset Demo</button>
              <div className="flex gap-2"><button onClick={() => setEditing(false)} className="px-3 py-2 rounded border border-command-border text-command-muted">Cancel</button><button onClick={save} className="px-4 py-2 rounded bg-emerald-600 text-white font-bold">Save Changes</button></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
