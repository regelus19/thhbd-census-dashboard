import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { ShiftHandoffModal } from './components/ShiftHandoffModal';
import { ImportDataModal } from './components/ImportDataModal';
import { WarRoomView } from './views/WarRoomView';
import { Unit1EView } from './views/Unit1EView';
import { PlaceholderView } from './views/PlaceholderView';
import { ReportsView } from './views/ReportsView';

import {
  initialRooms,
  initialNurses,
  initialDemandQueue,
  initialTimelineEvents,
  initialOperationalIssues,
  initialShiftHandoff
} from './data/initialData';
import { IncomingDemandItem, OperationalIssue, OperationalKpis, Room } from './types/hospital';
import { FileSpreadsheet, FileText } from 'lucide-react';

const KPI_STORAGE = 'thhbd-operations-kpis-v1';
const ROOM_STORAGE = 'thhbd-operations-rooms-v1';
const DEMAND_STORAGE = 'thhbd-operations-demand-v1';
const ISSUE_STORAGE = 'thhbd-operations-issues-v1';

const defaultKpis: OperationalKpis = {
  census: 42,
  physicalBeds: 46,
  staffedBeds: 44,
  actionableBeds: 4,
  expectedDischarges: 8,
  expectedArrivals: 14,
  edHolds: 2,
  pendingTransfers: 3,
  capacityStatus: 'WATCH',
  projectedCensus: 46,
  projectedDelta: 4
};

function loadStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

export function App() {
  const [activeTab, setActiveTab] = useState('War Room');
  const [rooms, setRooms] = useState<Room[]>(() => loadStored(ROOM_STORAGE, initialRooms));
  const [nurses] = useState(initialNurses);
  const [demandQueue, setDemandQueue] = useState<IncomingDemandItem[]>(() => loadStored(DEMAND_STORAGE, initialDemandQueue));
  const [timelineEvents] = useState(initialTimelineEvents);
  const [operationalIssues, setOperationalIssues] = useState<OperationalIssue[]>(() => loadStored(ISSUE_STORAGE, initialOperationalIssues));
  const [shiftHandoff] = useState(initialShiftHandoff);
  const [kpis, setKpis] = useState<OperationalKpis>(() => loadStored(KPI_STORAGE, defaultKpis));

  const [selectedPatient, setSelectedPatient] = useState<IncomingDemandItem | null>(() => loadStored(DEMAND_STORAGE, initialDemandQueue)[0] || null);
  const [isHandoffOpen, setIsHandoffOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);

  useEffect(() => { localStorage.setItem(KPI_STORAGE, JSON.stringify(kpis)); }, [kpis]);
  useEffect(() => { localStorage.setItem(ROOM_STORAGE, JSON.stringify(rooms)); }, [rooms]);
  useEffect(() => { localStorage.setItem(DEMAND_STORAGE, JSON.stringify(demandQueue)); }, [demandQueue]);
  useEffect(() => { localStorage.setItem(ISSUE_STORAGE, JSON.stringify(operationalIssues)); }, [operationalIssues]);

  const handleUpdateRoute = (patientId: string, newPreferred: string) => {
    setDemandQueue(prev => prev.map(item => item.id === patientId ? { ...item, preferredDestination: newPreferred } : item));
    setSelectedPatient(prev => prev?.id === patientId ? { ...prev, preferredDestination: newPreferred } : prev);
  };

  const handleAddIssue = (newIssue: OperationalIssue) => setOperationalIssues(prev => [newIssue, ...prev]);
  const handleUpdateRoom = (room: Room) => setRooms(prev => prev.map(item => item.id === room.id ? room : item));
  const handleAddDemand = (item: IncomingDemandItem) => setDemandQueue(prev => [...prev, item]);
  const handleUpdateDemand = (item: IncomingDemandItem) => {
    setDemandQueue(prev => prev.map(current => current.id === item.id ? item : current));
    setSelectedPatient(prev => prev?.id === item.id ? item : prev);
  };
  const handleDeleteDemand = (id: string) => {
    setDemandQueue(prev => prev.filter(item => item.id !== id));
    setSelectedPatient(prev => prev?.id === id ? null : prev);
  };
  const resetKpis = () => setKpis(defaultKpis);

  const now = new Date();
  const hour = now.getHours();
  const currentShift = hour >= 7 && hour < 19 ? 'Day Shift' : 'Night Shift';
  const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-command-dark text-command-text flex flex-col">
      <Header currentShift={currentShift} currentTime={currentTime} />

      <div className="flex items-center justify-between bg-command-card/80 border-b border-command-border px-4">
        <div className="flex-1 overflow-x-auto"><Navigation activeTab={activeTab} setActiveTab={setActiveTab} /></div>
        <div className="flex items-center gap-2 pl-4 py-1.5 border-l border-command-border whitespace-nowrap">
          <button onClick={() => setIsHandoffOpen(true)} className="flex items-center gap-1.5 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-500/40 px-3 py-1.5 rounded text-xs font-semibold transition-colors"><FileText size={14} /> Shift Handoff</button>
          <button onClick={() => setIsImportOpen(true)} className="flex items-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-500/40 px-3 py-1.5 rounded text-xs font-semibold transition-colors"><FileSpreadsheet size={14} /> Import Data</button>
        </div>
      </div>

      <main className="flex-1 p-4 max-w-[1920px] w-full mx-auto">
        {activeTab === 'War Room' && (
          <WarRoomView
            rooms={rooms}
            demandQueue={demandQueue}
            timelineEvents={timelineEvents}
            operationalIssues={operationalIssues}
            kpis={kpis}
            selectedPatient={selectedPatient}
            onSelectPatient={setSelectedPatient}
            onCloseRouting={() => setSelectedPatient(null)}
            onUpdateRoute={handleUpdateRoute}
            onAddIssue={handleAddIssue}
            onUpdateKpis={setKpis}
            onResetKpis={resetKpis}
            onUpdateRoom={handleUpdateRoom}
            onAddDemand={handleAddDemand}
            onUpdateDemand={handleUpdateDemand}
            onDeleteDemand={handleDeleteDemand}
          />
        )}
        {activeTab === '1E Unit' && <Unit1EView rooms={rooms} nurses={nurses} />}
        {activeTab === 'Day Surgery' && <PlaceholderView title="Day Surgery" />}
        {activeTab === 'Cath / EP' && <PlaceholderView title="Cath / EP" />}
        {activeTab === 'OR / CV Surgery' && <PlaceholderView title="OR / CV Surgery" />}
        {activeTab === 'Case Management' && <PlaceholderView title="Case Management" />}
        {activeTab === 'MD / APP' && <PlaceholderView title="MD / APP" />}
        {activeTab === 'EVS' && <PlaceholderView title="EVS" />}
        {activeTab === 'Staffing' && <PlaceholderView title="Staffing" />}
        {activeTab === 'Reports' && <ReportsView />}
      </main>

      <ShiftHandoffModal isOpen={isHandoffOpen} onClose={() => setIsHandoffOpen(false)} handoff={shiftHandoff} />
      <ImportDataModal isOpen={isImportOpen} onClose={() => setIsImportOpen(false)} onImportSuccess={() => alert('Data import synchronized successfully.')} />
    </div>
  );
}
