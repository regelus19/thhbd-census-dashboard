import React from 'react';
import { Bed, Users, UserCheck, ArrowUpRight, ArrowDownRight, AlertTriangle, RefreshCw, ShieldAlert } from 'lucide-react';
import { CapacityStatus } from '../types/hospital';

interface KPIRowProps {
  census: number;
  physicalBeds: number;
  staffedBeds: number;
  actionableBeds: number;
  expectedDischarges: number;
  expectedArrivals: number;
  edHolds: number;
  pendingTransfers: number;
  capacityStatus: CapacityStatus;
  projectedCensus: number;
}

export const KPIRow: React.FC<KPIRowProps> = ({
  census,
  physicalBeds,
  staffedBeds,
  actionableBeds,
  expectedDischarges,
  expectedArrivals,
  edHolds,
  pendingTransfers,
  capacityStatus,
  projectedCensus
}) => {
  const getStatusBadge = (status: CapacityStatus) => {
    switch (status) {
      case 'NORMAL':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'WATCH':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'ALERT':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
      case 'CRITICAL':
        return 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse';
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3 my-4">
      <div className="bg-command-card border border-command-border p-3 rounded-lg flex flex-col justify-between">
        <div className="flex items-center justify-between text-command-muted text-xs"><span>Current Census</span><Bed size={16} className="text-command-accent" /></div>
        <div className="mt-2 flex items-baseline gap-1"><span className="text-2xl font-bold text-command-text">{census}</span><span className="text-xs text-command-muted">/ {physicalBeds} physical</span></div>
      </div>
      <div className="bg-command-card border border-command-border p-3 rounded-lg flex flex-col justify-between">
        <div className="flex items-center justify-between text-command-muted text-xs"><span>Staffed Beds</span><Users size={16} className="text-blue-400" /></div>
        <div className="mt-2 flex items-baseline gap-1"><span className="text-2xl font-bold text-command-text">{staffedBeds}</span><span className="text-xs text-command-muted">(1E)</span></div>
      </div>
      <div className="bg-command-card border border-command-border p-3 rounded-lg flex flex-col justify-between">
        <div className="flex items-center justify-between text-command-muted text-xs"><span>Actionable Beds</span><UserCheck size={16} className="text-emerald-400" /></div>
        <div className="mt-2 flex items-baseline gap-1"><span className="text-2xl font-bold text-emerald-400">{actionableBeds}</span><span className="text-xs text-command-muted">ready now</span></div>
      </div>
      <div className="bg-command-card border border-command-border p-3 rounded-lg flex flex-col justify-between">
        <div className="flex items-center justify-between text-command-muted text-xs"><span>Expected Discharges</span><ArrowUpRight size={16} className="text-emerald-400" /></div>
        <div className="mt-2 flex items-baseline gap-1"><span className="text-2xl font-bold text-command-text">{expectedDischarges}</span><span className="text-xs text-command-muted">next 24h</span></div>
      </div>
      <div className="bg-command-card border border-command-border p-3 rounded-lg flex flex-col justify-between">
        <div className="flex items-center justify-between text-command-muted text-xs"><span>Expected Arrivals</span><ArrowDownRight size={16} className="text-amber-400" /></div>
        <div className="mt-2 flex items-baseline gap-1"><span className="text-2xl font-bold text-command-text">{expectedArrivals}</span><span className="text-xs text-command-muted">next 24h</span></div>
      </div>
      <div className="bg-command-card border border-command-border p-3 rounded-lg flex flex-col justify-between">
        <div className="flex items-center justify-between text-command-muted text-xs"><span>ED Holds</span><AlertTriangle size={16} className="text-orange-400" /></div>
        <div className="mt-2 flex items-baseline gap-1"><span className="text-2xl font-bold text-orange-400">{edHolds}</span><span className="text-xs text-command-muted">waiting for bed</span></div>
      </div>
      <div className="bg-command-card border border-command-border p-3 rounded-lg flex flex-col justify-between">
        <div className="flex items-center justify-between text-command-muted text-xs"><span>Pending Transfers</span><RefreshCw size={16} className="text-blue-400" /></div>
        <div className="mt-2 flex items-baseline gap-1"><span className="text-2xl font-bold text-command-text">{pendingTransfers}</span><span className="text-xs text-command-muted">external/direct</span></div>
      </div>
      <div className="bg-command-card border border-command-border p-3 rounded-lg flex flex-col justify-between">
        <div className="flex items-center justify-between text-command-muted text-xs"><span>Capacity Status</span><ShieldAlert size={16} className={capacityStatus === 'CRITICAL' ? 'text-red-400' : 'text-amber-400'} /></div>
        <div className="mt-2 flex items-center justify-between"><span className={`px-2 py-0.5 rounded text-xs font-bold border ${getStatusBadge(capacityStatus)}`}>{capacityStatus}</span><span className="text-[11px] text-command-muted font-medium">Proj: {projectedCensus} (+4 in 12h)</span></div>
      </div>
    </div>
  );
};
