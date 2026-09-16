import React from 'react';
import { KPIRow } from '../components/KPIRow';
import { DemandTimeline } from '../components/DemandTimeline';
import { InboundDemandQueue } from '../components/InboundDemandQueue';
import { RoutingPanel } from '../components/RoutingPanel';
import { TeamsActionPanel } from '../components/TeamsActionPanel';
import { RoomGrid } from '../components/RoomGrid';
import { Room, Nurse, IncomingDemandItem, TimelineEvent, OperationalIssue, CapacityStatus } from '../types/hospital';

interface WarRoomViewProps {
  rooms: Room[];
  nurses: Nurse[];
  demandQueue: IncomingDemandItem[];
  timelineEvents: TimelineEvent[];
  operationalIssues: OperationalIssue[];
  capacityStatus: CapacityStatus;
  actionableBeds: number;
  projectedCensus: number;
  selectedPatient: IncomingDemandItem | null;
  onSelectPatient: (item: IncomingDemandItem) => void;
  onCloseRouting: () => void;
  onUpdateRoute: (patientId: string, newPreferred: string) => void;
  onAddIssue: (newIssue: OperationalIssue) => void;
}

export const WarRoomView: React.FC<WarRoomViewProps> = ({
  rooms,
  demandQueue,
  timelineEvents,
  operationalIssues,
  capacityStatus,
  actionableBeds,
  projectedCensus,
  selectedPatient,
  onSelectPatient,
  onCloseRouting,
  onUpdateRoute,
  onAddIssue
}) => (
  <div className="space-y-4">
    <KPIRow census={42} physicalBeds={46} staffedBeds={44} actionableBeds={actionableBeds} expectedDischarges={14} expectedArrivals={14} edHolds={2} pendingTransfers={3} capacityStatus={capacityStatus} projectedCensus={projectedCensus} />
    <DemandTimeline events={timelineEvents} />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2"><InboundDemandQueue demandQueue={demandQueue} onSelectPatient={onSelectPatient} /></div>
      <div className="space-y-4"><RoutingPanel selectedPatient={selectedPatient} onClose={onCloseRouting} onUpdateRoute={onUpdateRoute} /><TeamsActionPanel issues={operationalIssues} onAddIssue={onAddIssue} /></div>
    </div>
    <RoomGrid rooms={rooms} />
  </div>
);
