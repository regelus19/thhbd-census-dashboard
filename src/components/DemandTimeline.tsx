import React from 'react';
import { TimelineEvent } from '../types/hospital';

interface DemandTimelineProps {
  events: TimelineEvent[];
}

export const DemandTimeline: React.FC<DemandTimelineProps> = ({ events }) => {
  const times = ['06:00', '08:00', '10:00', '12:00', '16:00', '18:00', '10:00', '22:00', '00:00', '02:00', '04:00'];
  const rows = [
    { key: 'ED', label: 'ED admissions/holds' },
    { key: 'OR', label: 'OR / CV Surgery' },
    { key: 'Cath', label: 'Cath / EP' },
    { key: 'DaySurgery', label: 'Day Surgery' },
    { key: 'Transfers', label: 'Transfers / Direct Admissions' },
    { key: 'Discharges', label: 'Expected Discharges' }
  ];

  const getEventBadgeStyle = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'scheduled':
        return 'bg-emerald-600 text-white';
      case 'admission':
        return 'bg-blue-600 text-white';
      case 'discharge':
        return 'bg-amber-600 text-white';
      case 'transfer':
        return 'bg-purple-600 text-white';
      case 'ed-hold':
        return 'bg-red-600 text-white';
    }
  };

  return (
    <div className="bg-command-card border border-command-border rounded-lg p-4 mb-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
        <h2 className="text-sm font-bold tracking-wide text-command-text">
          DEMAND vs. RELEASE TIMELINE <span className="text-xs font-normal text-command-muted">(Next 24 Hours)</span>
        </h2>
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-command-muted">
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600"><span></span></span> Scheduled Procedure</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Expected Admission</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span> Expected Discharge</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span> Transfer</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-600"></span> ED Hold</div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px] border border-command-border rounded bg-command-dark/50">
          {rows.map((row, idx) => (
            <div key={row.key} className={`flex items-center border-b border-command-border/60 ${idx === rows.length - 1 ? 'border-b-0' : ''}`}>
              <div className="w-52 p-2.5 text-xs font-medium text-command-muted border-r border-command-border/60 bg-command-card/40">
                {row.label}
              </div>
              <div className="flex-1 p-2 flex items-center gap-4 overflow-x-auto">
                {events
                  .filter(e => e.category === row.key)
                  .map(evt => (
                    <div
                      key={evt.id}
                      className={`px-2.5 py-1 rounded text-xs font-semibold shadow whitespace-nowrap flex items-center gap-1.5 ${getEventBadgeStyle(evt.type)}`}
                    >
                      <span>{evt.title}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
