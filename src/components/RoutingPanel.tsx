import React from 'react';
import { IncomingDemandItem } from '../types/hospital';
import { X, ShieldAlert, CheckCircle2, AlertCircle } from 'lucide-react';

interface RoutingPanelProps {
  selectedPatient: IncomingDemandItem | null;
  onClose: () => void;
  onUpdateRoute: (patientId: string, newPreferred: string) => void;
}

export const RoutingPanel: React.FC<RoutingPanelProps> = ({ selectedPatient, onClose, onUpdateRoute }) => {
  if (!selectedPatient) {
    return (
      <div className="bg-command-card border border-command-border rounded-lg p-6 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
        <AlertCircle size={36} className="text-command-muted mb-2 opacity-50" />
        <h3 className="text-sm font-bold text-command-text mb-1">Gate & Routing Management</h3>
        <p className="text-xs text-command-muted max-w-xs">Select an incoming demand item from the queue below to inspect preferred gates, alternate gates, and manage contingency routing.</p>
      </div>
    );
  }

  return (
    <div className="bg-command-card border border-command-border rounded-lg p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-command-border mb-3">
          <div className="flex items-center gap-2"><ShieldAlert size={18} className="text-red-400" /><div><h3 className="text-xs font-bold text-command-text">{selectedPatient.id} – {selectedPatient.patientType} (Admit)</h3><p className="text-[11px] text-command-muted">ETA {selectedPatient.eta} | From: THHBD {selectedPatient.source}</p></div></div>
          <button onClick={onClose} className="text-command-muted hover:text-command-text p-1"><X size={16} /></button>
        </div>
        <div className="text-xs font-semibold text-command-accent mb-2">+ Planned Route</div>
        <div className="space-y-2 mb-4">
          <div className="bg-command-dark/60 p-2.5 rounded border border-red-500/40 flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-[11px]">1</span><div><div className="text-xs font-bold text-command-text">Preferred Gate</div><div className="font-mono text-xs font-semibold text-command-accent">{selectedPatient.preferredDestination}</div></div></div><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/40">Unavailable – Pending discharge</span></div>
          <div className="bg-command-dark/60 p-2.5 rounded border border-emerald-500/40 flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px]">2</span><div><div className="text-xs font-bold text-command-text">Alternate Gate</div><div className="font-mono text-xs font-semibold text-command-accent">{selectedPatient.alternateGates[0] || '1E-115'}</div></div></div><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1"><CheckCircle2 size={12} /> Available</span></div>
          <div className="bg-command-dark/60 p-2.5 rounded border border-emerald-500/40 flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px]">3</span><div><div className="text-xs font-bold text-command-text">Backup Gate</div><div className="font-mono text-xs font-semibold text-command-accent">{selectedPatient.backupGate}</div></div></div><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1"><CheckCircle2 size={12} /> Available</span></div>
          <div className="bg-command-dark/60 p-2.5 rounded border border-command-border flex items-center justify-between"><div className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-command-border text-command-muted flex items-center justify-center font-bold text-[11px]">4</span><div><div className="text-xs font-bold text-command-text">Contingency</div><div className="text-xs font-semibold text-amber-400">{selectedPatient.contingency}</div></div></div><span className="text-[11px] text-command-muted">If no bed by 14:00</span></div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-command-border"><button onClick={() => onUpdateRoute(selectedPatient.id, selectedPatient.alternateGates[0] || selectedPatient.preferredDestination)} className="bg-command-border/40 hover:bg-command-border text-command-text text-xs font-semibold px-3 py-1.5 rounded transition-colors">⚙️ Use Alternate Gate</button><button onClick={() => alert(`Teams simulation for ${selectedPatient.id}`)} className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors">Simulate Teams Alert</button></div>
    </div>
  );
};
