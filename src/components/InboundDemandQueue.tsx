import React, { useState } from 'react';
import { IncomingDemandItem } from '../types/hospital';

interface InboundDemandQueueProps {
  demandQueue: IncomingDemandItem[];
  onSelectPatient: (item: IncomingDemandItem) => void;
}

export const InboundDemandQueue: React.FC<InboundDemandQueueProps> = ({ demandQueue, onSelectPatient }) => {
  const [filter, setFilter] = useState<string>('All');

  const filteredDemand = demandQueue.filter(item => {
    if (filter === 'All') return true;
    if (filter === 'ED') return item.source === 'ED';
    if (filter === 'Direct') return item.source === 'Direct';
    if (filter === 'Transfers') return item.source === 'External Transfer';
    if (filter === 'OR Returns') return item.source === 'OR';
    if (filter === 'Cath/EP') return item.source === 'Cath' || item.source === 'EP';
    return true;
  });

  const getStatusBadge = (status: IncomingDemandItem['status']) => {
    switch (status) {
      case 'Waiting':
        return 'bg-red-500/20 text-red-400 border-red-500/40';
      case 'On Schedule':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'Pending':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'Ready':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
      default:
        return 'bg-command-border text-command-muted';
    }
  };

  return (
    <div className="bg-command-card border border-command-border rounded-lg p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
        <h2 className="text-sm font-bold tracking-wide text-command-text">
          INBOUND DEMAND QUEUE <span className="text-xs font-normal text-command-muted">({demandQueue.length} expected arrivals)</span>
        </h2>
        <div className="flex items-center gap-1 bg-command-dark p-1 rounded border border-command-border text-xs">
          {['All', 'ED', 'Direct', 'Transfers', 'OR Returns', 'Cath/EP'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2.5 py-1 rounded transition-colors ${filter === f ? 'bg-command-accent text-command-dark font-bold' : 'text-command-muted hover:text-command-text'}`}
            >
              {f} {f === 'All' ? `(${demandQueue.length})` : ''}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-command-border text-command-muted">
              <th className="py-2 px-3">ETA</th>
              <th className="py-2 px-3">Source</th>
              <th className="py-2 px-3">Patient Type / Service</th>
              <th className="py-2 px-3">Destination (Preferred)</th>
              <th className="py-2 px-3">Alternate Gates</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-command-border/40">
            {filteredDemand.map(item => (
              <tr key={item.id} className="hover:bg-command-border/25 transition-colors">
                <td className="py-2.5 px-3 font-semibold text-command-accent">{item.eta}</td>
                <td className="py-2.5 px-3 font-medium text-command-text">{item.source}</td>
                <td className="py-2.5 px-3 text-command-text font-medium">{item.patientType}</td>
                <td className="py-2.5 px-3 font-mono font-semibold text-command-accent">{item.preferredDestination}</td>
                <td className="py-2.5 px-3 font-mono text-command-muted">{item.alternateGates.join(', ')}</td>
                <td className="py-2.5 px-3">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right">
                  <button
                    onClick={() => onSelectPatient(item)}
                    className="bg-command-accent/20 hover:bg-command-accent text-command-accent hover:text-command-dark font-semibold px-2.5 py-1 rounded transition-colors border border-command-accent/40"
                  >
                    Manage ▾
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
