import React from 'react';
import { ShiftHandoffData } from '../types/hospital';
import { X, FileText, CheckCircle2 } from 'lucide-react';

interface ShiftHandoffModalProps {
  isOpen: boolean;
  onClose: () => void;
  handoff: ShiftHandoffData;
}

export const ShiftHandoffModal: React.FC<ShiftHandoffModalProps> = ({ isOpen, onClose, handoff }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-command-card border border-command-border rounded-xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-command-border mb-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400"><FileText size={20} /></div><div><h2 className="text-base font-bold text-command-text">SHIFT HANDOFF & OPERATIONAL BRIEF</h2><p className="text-xs text-command-muted">THHBD Hospital Operations Hub | {handoff.timestamp}</p></div></div><button onClick={onClose} className="text-command-muted hover:text-command-text p-1"><X size={20} /></button></div>
        <div className="space-y-4 text-xs">
          <div className="bg-command-dark p-3 rounded border border-red-500/40"><h3 className="font-bold text-red-400 mb-1.5">⚠️ Current Operational Risks</h3><ul className="list-disc list-inside space-y-1 text-command-text">{handoff.currentRisks.map((risk, i) => <li key={i}>{risk}</li>)}</ul></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2"><div className="bg-command-dark p-2.5 rounded border border-command-border text-center"><div className="text-command-muted text-[10px]">ED Holds</div><div className="text-base font-bold text-orange-400">{handoff.edHoldsCount}</div></div><div className="bg-command-dark p-2.5 rounded border border-command-border text-center"><div className="text-command-muted text-[10px]">Pending Admissions</div><div className="text-base font-bold text-blue-400">{handoff.pendingAdmissionsCount}</div></div><div className="bg-command-dark p-2.5 rounded border border-command-border text-center"><div className="text-command-muted text-[10px]">Pending Transfers</div><div className="text-base font-bold text-command-text">{handoff.pendingTransfersCount}</div></div><div className="bg-command-dark p-2.5 rounded border border-command-border text-center"><div className="text-command-muted text-[10px]">Expected Discharges</div><div className="text-base font-bold text-emerald-400">{handoff.expectedDischargesCount}</div></div></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3"><div className="bg-command-dark p-3 rounded border border-command-border"><div className="font-bold text-command-accent mb-1">Expected Procedure Demand</div><p className="text-command-text">{handoff.expectedProcedureDemand}</p></div><div className="bg-command-dark p-3 rounded border border-command-border"><div className="font-bold text-purple-400 mb-1">Protected Beds Summary</div><p className="text-command-text">{handoff.protectedBedsSummary}</p></div></div>
          <div className="bg-command-dark p-3 rounded border border-command-border"><div className="font-bold text-amber-400 mb-1">Staffing Limitations</div><p className="text-command-text">{handoff.staffingLimitations}</p></div>
          <div className="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded flex items-center justify-between"><div className="flex items-center gap-2 text-emerald-400"><CheckCircle2 size={18} /><div><div className="font-bold">Handoff Prepared & Acknowledged</div><div className="text-[10px] text-command-muted">Prepared by {handoff.preparedBy}</div></div></div><span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[11px] border border-emerald-500/40">Verified & Active</span></div>
        </div>
        <div className="mt-6 flex justify-end gap-2 pt-3 border-t border-command-border"><button onClick={onClose} className="bg-command-accent text-command-dark px-4 py-2 rounded text-xs font-bold hover:bg-opacity-90 transition-colors">Close & Return to Hub</button></div>
      </div>
    </div>
  );
};
