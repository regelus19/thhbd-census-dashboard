import React, { useState } from 'react';
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
import { calculateCapacityStatus } from './utils/capacityEngine';
import { IncomingDemandItem, OperationalIssue } from './types/hospital';
import { FileSpreadsheet, FileText } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState('War Room');
  const [rooms, setRooms] = useState(initialRooms);
  const [nurses, setNurses] = useState(initialNurses);
  const [demandQueue, setDemandQueue] = useState<IncomingDemandItem[]>(initialDemandQueue);
  const [timelineEvents] = useState(initialTimelineEvents);
  const [operationalIssues, setOperationalIssues] = useState<OperationalIssue[]>(initialOperationalIssues);
  const [shiftHandoff] = useState(initialShiftHandoff);

  const [selectedPatient, setSelectedPatient] = useState<IncomingDemandItem | null>(initialDemandQueue[0]);
  const [isHandoffOpen, setIsHandoffOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);

  // Dynamic capacity calculation
  const { status: capacityStatus, actionableBeds, projectedCensus } = calculateCapacityStatus(
    rooms,
    demandQueue,
    44,
    42
  );

  const handleUpdateRoute = (patientId: string, newPreferred: string) => {
    setDemandQueue(prev =>
      prev.map(item => (item.id === patientId ? { ...item, preferredDestination: newPreferred } : item))
    );
  };

  const handleAddIssue = (newIssue: OperationalIssue) => {
    setOperationalIssues(prev => [newIssue, ...prev]);
  };

  return (
    <div className="min-h-screen bg-command-dark text-command-text flex flex-col">
      {/* Persistent Header */}
      <Header currentShift="Night Shift" currentTime="10:24 AM" />

      {/* Navigation Bar */}
      <div className="flex items-center justify-between bg-command-card/80 border-b border-command-border px-4">
        <div className="flex-1 overflow-x-auto">
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="flex items-center gap-2 pl-4 py-1.5 border-l border-command-border whitespace-nowrap">
          <button
            onClick={() => setIsHandoffOpen(true)}
            className="flex items-center gap-1.5 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-500/40 px-3 py-1.5 rounded text-xs font-semibold transition-colors"
          >
            <FileText size={14} /> Shift Handoff
          </button>
          <button
            onClick={() => setIsImportOpen(true)}
            className="flex items-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-500/40 px-3 py-1.5 rounded text-xs font-semibold transition-colors"
          >
            <FileSpreadsheet size={14} /> Import Data
          </button>
        </div>
      </div>

      {/* Main View Area */}
      <main className="flex-1 p-4 max-w-[1920px] w-full mx-auto">
        {activeTab === 'War Room' && (
          <WarRoomView
            rooms={rooms}
            nurses={nurses}
            demandQueue={demandQueue}
            timelineEvents={timelineEvents}
            operationalIssues={operationalIssues}
            capacityStatus={capacityStatus}
            actionableBeds={actionableBeds}
            projectedCensus={projectedCensus}
            selectedPatient={selectedPatient}
            onSelectPatient={setSelectedPatient}
            onCloseRouting={() => setSelectedPatient(null)}
            onUpdateRoute={handleUpdateRoute}
            onAddIssue={handleAddIssue}
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

      {/* Modals */}
      <ShiftHandoffModal
        isOpen={isHandoffOpen}
        onClose={() => setIsHandoffOpen(false)}
        handoff={shiftHandoff}
      />
      <ImportDataModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImportSuccess={() => alert('Data import synchronized successfully.')}
      />
    </div>
  );
}
