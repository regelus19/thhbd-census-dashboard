import React from 'react';
import { KPIRow } from '../components/KPIRow';
import { DemandTimeline } from '../components/DemandTimeline';
import { InboundDemandQueue } from '../components/InboundDemandQueue';
import { RoutingPanel } from '../components/RoutingPanel';
import { TeamsActionPanel } from '../components/TeamsActionPanel';
import { RoomGrid } from '../components/RoomGrid';
import { Room, IncomingDemandItem, TimelineEvent, OperationalIssue, OperationalKpis } from '../types/hospital';

interface WarRoomViewProps {
  rooms: Room[];
  demandQueue: IncomingDemandItem[];
  timelineEvents: TimelineEvent[];
  operationalIssues: OperationalIssue[];
  kpis: OperationalKpis;
  selectedPatient: IncomingDemandItem | null;
  onSelectPatient: (item: IncomingDemandItem) => void;
  onCloseRouting: () => void;
  onUpdateRoute: (patientId: string, newPreferred: string) => void;
  onAddIssue: (newIssue: OperationalIssue) => void;
  onUpdateKpis: (next: OperationalKpis) => void;
  onResetKpis: () => void;
  onUpdateRoom: (room: Room) => void;
  onAddDemand: (item: IncomingDemandItem) => void;
  onUpdateDemand: (item: IncomingDemandItem) => void;
  onDeleteDemand: (id: string) => void;
}

export const WarRoomView: React.FC<WarRoomViewProps> = ({
  rooms,
  demandQueue,
  timelineEvents,
  operationalIssues,
  kpis,
  selectedPatient,
  onSelectPatient,
  onCloseRouting,
  onUpdateRoute,
  onAddIssue,
  onUpdateKpis,
  onResetKpis,
  onUpdateRoom,
  onAddDemand,
  onUpdateDemand,
  onDeleteDemand
}) => (
  <div className="space-y-4">
    <KPIRow kpis={kpis} onUpdate={onUpdateKpis} onReset={onResetKpis} />
    <DemandTimeline events={timelineEvents} />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <InboundDemandQueue
          demandQueue={demandQueue}
          onSelectPatient={onSelectPatient}
          onAddDemand={onAddDemand}
          onUpdateDemand={onUpdateDemand}
          onDeleteDemand={onDeleteDemand}
        />
      </div>
      <div className="space-y-4">
        <RoutingPanel selectedPatient={selectedPatient} onClose={onCloseRouting} onUpdateRoute={onUpdateRoute} />
        <TeamsActionPanel issues={operationalIssues} onAddIssue={onAddIssue} />
      </div>
    </div>
    <RoomGrid rooms={rooms} onUpdateRoom={onUpdateRoom} />
  </div>
);
