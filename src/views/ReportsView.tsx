import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const ReportsView: React.FC = () => {
  const rootCauses = [
    ['Competing / high demand', '15', 'Procedural and simultaneous incoming demand'],
    ['Staffing / protected capacity', '8', 'Staffing, acuity, or protected emergency capacity'],
    ['Discharge / room readiness', '3', 'Capacity release did not materialize on time'],
    ['Placement / level of care', '1', 'Bed compatibility / placement constraint'],
    ['Inherited / handoff', '1', 'Delay began before receiving shift'],
    ['Unclear / further review', '1', 'Insufficient documentation']
  ];

  return (
    <div className="space-y-4">
      <div className="bg-command-card border border-command-border rounded-lg p-4">
        <h2 className="text-base font-bold text-command-text">THROUGHPUT KPI PANEL & ANALYTICS</h2>
        <p className="text-xs text-command-muted">Prototype metrics based on the Jul 15–Sep 15 ED → 1 East turnaround review.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-command-card border border-command-border p-4 rounded-lg"><div className="text-xs text-command-muted">Median RTP → Assigned</div><div className="text-2xl font-bold text-command-text mt-1">~57 min</div><div className="text-xs text-command-muted mt-1">104 ED → 1E cases</div></div>
        <div className="bg-command-card border border-command-border p-4 rounded-lg"><div className="text-xs text-command-muted">Assigned ≤60 min</div><div className="text-2xl font-bold text-emerald-400 mt-1">51%</div><div className="text-xs text-command-muted mt-1">53 of 104 cases</div></div>
        <div className="bg-command-card border border-command-border p-4 rounded-lg"><div className="text-xs text-command-muted">Assigned &gt;120 min</div><div className="text-2xl font-bold text-red-400 mt-1">28%</div><div className="text-xs text-red-400 mt-1">29 cases flagged for RCA review</div></div>
      </div>
      <div className="bg-command-card border border-command-border rounded-lg p-4">
        <h3 className="text-sm font-bold text-command-text mb-3 flex items-center gap-2"><ShieldAlert size={16} className="text-amber-400" /> Working RCA for &gt;120-minute cases</h3>
        <div className="overflow-x-auto"><table className="w-full text-left text-xs border-collapse"><thead><tr className="border-b border-command-border text-command-muted"><th className="py-2 px-3">Primary category</th><th className="py-2 px-3">Cases</th><th className="py-2 px-3">Interpretation</th></tr></thead><tbody className="divide-y divide-command-border/40 text-command-text">{rootCauses.map(([category, cases, interpretation]) => <tr key={category} className="hover:bg-command-border/20"><td className="py-2.5 px-3 font-semibold">{category}</td><td className="py-2.5 px-3">{cases}</td><td className="py-2.5 px-3">{interpretation}</td></tr>)}</tbody></table></div>
      </div>
    </div>
  );
};
