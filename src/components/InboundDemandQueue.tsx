import React, { useMemo, useState } from 'react';
import { IncomingDemandItem } from '../types/hospital';
import { Pencil, Plus, Trash2 } from 'lucide-react';

interface InboundDemandQueueProps {
  demandQueue: IncomingDemandItem[];
  onSelectPatient: (item: IncomingDemandItem) => void;
  onAddDemand: (item: IncomingDemandItem) => void;
  onUpdateDemand: (item: IncomingDemandItem) => void;
  onDeleteDemand: (id: string) => void;
}

const blankDemand = (): IncomingDemandItem => ({
  id: `DEM-${Date.now()}`,
  eta: '12:00',
  source: 'ED',
  patientType: 'ED Hold',
  requestedLoc: '1 East',
  preferredDestination: '',
  alternateGates: [],
  backupGate: '',
  contingency: '',
  status: 'Waiting',
  priority: 'Routine'
});

export const InboundDemandQueue: React.FC<InboundDemandQueueProps> = ({ demandQueue, onSelectPatient, onAddDemand, onUpdateDemand, onDeleteDemand }) => {
  const [filter, setFilter] = useState<string>('All');
  const [editing, setEditing] = useState<IncomingDemandItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [alternatesText, setAlternatesText] = useState('');

  const filteredDemand = useMemo(() => demandQueue.filter(item => {
    if (filter === 'All') return true;
    if (filter === 'ED') return item.source === 'ED';
    if (filter === 'Direct') return item.source === 'Direct';
    if (filter === 'Transfers') return item.source === 'External Transfer';
    if (filter === 'OR Returns') return item.source === 'OR';
    if (filter === 'Cath/EP') return item.source === 'Cath' || item.source === 'EP';
    return true;
  }), [demandQueue, filter]);

  const openNew = () => {
    const item = blankDemand();
    setEditing(item);
    setAlternatesText('');
    setIsNew(true);
  };

  const openEdit = (item: IncomingDemandItem) => {
    setEditing({ ...item, alternateGates: [...item.alternateGates] });
    setAlternatesText(item.alternateGates.join(', '));
    setIsNew(false);
  };

  const save = () => {
    if (!editing) return;
    const normalized = { ...editing, alternateGates: alternatesText.split(',').map(v => v.trim()).filter(Boolean) };
    if (isNew) onAddDemand(normalized); else onUpdateDemand(normalized);
    setEditing(null);
  };

  const getStatusBadge = (status: IncomingDemandItem['status']) => {
    switch (status) {
      case 'Waiting': return 'bg-red-500/20 text-red-400 border-red-500/40';
      case 'On Schedule': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'Pending': return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'Ready': return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
      case 'Delayed': return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
      case 'Protected': return 'bg-purple-500/20 text-purple-400 border-purple-500/40';
      default: return 'bg-command-border text-command-muted';
    }
  };

  return (
    <>
      <div className="bg-command-card border border-command-border rounded-lg p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
          <div><h2 className="text-sm font-bold tracking-wide text-command-text">INBOUND DEMAND QUEUE <span className="text-xs font-normal text-command-muted">({demandQueue.length} items)</span></h2><div className="text-[11px] text-command-muted mt-1">Manual, de-identified demand entries for MVP demonstration.</div></div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-command-dark p-1 rounded border border-command-border text-xs">{['All', 'ED', 'Direct', 'Transfers', 'OR Returns', 'Cath/EP'].map(f => <button key={f} onClick={() => setFilter(f)} className={`px-2 py-1 rounded ${filter === f ? 'bg-command-accent text-command-dark font-bold' : 'text-command-muted'}`}>{f}</button>)}</div>
            <button onClick={openNew} className="flex items-center gap-1 px-3 py-1.5 rounded bg-command-accent text-command-dark text-xs font-bold"><Plus size={13} /> Add</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead><tr className="border-b border-command-border text-command-muted"><th className="py-2 px-3">ETA</th><th className="py-2 px-3">Source</th><th className="py-2 px-3">Patient Type / Service</th><th className="py-2 px-3">Preferred</th><th className="py-2 px-3">Alternate Gates</th><th className="py-2 px-3">Status</th><th className="py-2 px-3 text-right">Actions</th></tr></thead>
            <tbody className="divide-y divide-command-border/40">
              {filteredDemand.map(item => (
                <tr key={item.id} className="hover:bg-command-border/25">
                  <td className="py-2.5 px-3 font-semibold text-command-accent">{item.eta}</td><td className="py-2.5 px-3">{item.source}</td><td className="py-2.5 px-3 font-medium">{item.patientType}</td><td className="py-2.5 px-3 font-mono text-command-accent">{item.preferredDestination || '—'}</td><td className="py-2.5 px-3 font-mono text-command-muted">{item.alternateGates.join(', ') || '—'}</td><td className="py-2.5 px-3"><span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${getStatusBadge(item.status)}`}>{item.status}</span></td>
                  <td className="py-2.5 px-3 text-right"><div className="inline-flex gap-1"><button onClick={() => onSelectPatient(item)} className="px-2 py-1 rounded border border-command-accent/40 text-command-accent">Route</button><button onClick={() => openEdit(item)} className="px-2 py-1 rounded border border-command-border text-command-muted hover:text-command-text"><Pencil size={12} /></button><button onClick={() => onDeleteDemand(item.id)} className="px-2 py-1 rounded border border-red-500/30 text-red-400"><Trash2 size={12} /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-command-card border border-command-accent/40 rounded-lg p-5 shadow-2xl">
            <h3 className="text-lg font-bold text-command-text">{isNew ? 'Add Demand Item' : 'Edit Demand Item'}</h3>
            <p className="text-xs text-command-muted mb-4">Use generic labels only; no PHI.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <label className="text-xs text-command-muted">ETA<input value={editing.eta} onChange={(e) => setEditing({ ...editing, eta: e.target.value })} className="mt-1 w-full bg-command-dark border border-command-border rounded px-3 py-2 text-command-text" /></label>
              <label className="text-xs text-command-muted">Source<select value={editing.source} onChange={(e) => setEditing({ ...editing, source: e.target.value as IncomingDemandItem['source'] })} className="mt-1 w-full bg-command-dark border border-command-border rounded px-3 py-2 text-command-text"><option>ED</option><option>Direct</option><option>External Transfer</option><option>OR</option><option>Cath</option><option>EP</option><option>Day Surgery</option></select></label>
              <label className="text-xs text-command-muted">Status<select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as IncomingDemandItem['status'] })} className="mt-1 w-full bg-command-dark border border-command-border rounded px-3 py-2 text-command-text"><option>Waiting</option><option>Pending</option><option>On Schedule</option><option>Ready</option><option>Assigned</option><option>Delayed</option><option>Protected</option><option>Contingency</option></select></label>
              <label className="text-xs text-command-muted md:col-span-2">Patient Type / Service<input value={editing.patientType} onChange={(e) => setEditing({ ...editing, patientType: e.target.value })} className="mt-1 w-full bg-command-dark border border-command-border rounded px-3 py-2 text-command-text" /></label>
              <label className="text-xs text-command-muted">Priority<select value={editing.priority} onChange={(e) => setEditing({ ...editing, priority: e.target.value as IncomingDemandItem['priority'] })} className="mt-1 w-full bg-command-dark border border-command-border rounded px-3 py-2 text-command-text"><option>Routine</option><option>Urgent</option><option>Emergent</option></select></label>
              <label className="text-xs text-command-muted">Requested LOC<input value={editing.requestedLoc} onChange={(e) => setEditing({ ...editing, requestedLoc: e.target.value })} className="mt-1 w-full bg-command-dark border border-command-border rounded px-3 py-2 text-command-text" /></label>
              <label className="text-xs text-command-muted">Preferred Destination<input value={editing.preferredDestination} onChange={(e) => setEditing({ ...editing, preferredDestination: e.target.value })} className="mt-1 w-full bg-command-dark border border-command-border rounded px-3 py-2 text-command-text" /></label>
              <label className="text-xs text-command-muted">Backup Gate<input value={editing.backupGate} onChange={(e) => setEditing({ ...editing, backupGate: e.target.value })} className="mt-1 w-full bg-command-dark border border-command-border rounded px-3 py-2 text-command-text" /></label>
              <label className="text-xs text-command-muted md:col-span-2">Alternate Gates (comma separated)<input value={alternatesText} onChange={(e) => setAlternatesText(e.target.value)} className="mt-1 w-full bg-command-dark border border-command-border rounded px-3 py-2 text-command-text" /></label>
              <label className="text-xs text-command-muted">Contingency<input value={editing.contingency} onChange={(e) => setEditing({ ...editing, contingency: e.target.value })} className="mt-1 w-full bg-command-dark border border-command-border rounded px-3 py-2 text-command-text" /></label>
            </div>
            <div className="flex justify-end gap-2 mt-5"><button onClick={() => setEditing(null)} className="px-3 py-2 rounded border border-command-border text-command-muted">Cancel</button><button onClick={save} className="px-4 py-2 rounded bg-command-accent text-command-dark font-bold">{isNew ? 'Add Item' : 'Save Item'}</button></div>
          </div>
        </div>
      )}
    </>
  );
};
