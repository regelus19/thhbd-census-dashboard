import { Room, Nurse, IncomingDemandItem, TimelineEvent, OperationalIssue, ShiftHandoffData } from '../types/hospital';

export const initialRooms: Room[] = [
  { id: '101', number: '101', levelOfCare: 'CVICU', state: 'Occupied', receivingAvailable: false, statusNote: 'Post-Op' },
  { id: '102', number: '102', levelOfCare: 'CVICU', state: 'Occupied', receivingAvailable: false, statusNote: 'Impella' },
  { id: '103', number: '103', levelOfCare: 'CVICU', state: 'Incoming', receivingAvailable: false, statusNote: 'CABG 12:00' },
  { id: '104', number: '104', levelOfCare: 'CVICU', state: 'Available', receivingAvailable: true },
  { id: '105', number: '105', levelOfCare: 'CVICU', state: 'Occupied', receivingAvailable: false, statusNote: 'Vented' },
  { id: '106', number: '106', levelOfCare: 'CVICU', state: 'Occupied', receivingAvailable: false, statusNote: 'CRRT' },
  { id: '107', number: '107', levelOfCare: 'PCU', state: 'Pending Discharge', receivingAvailable: false, statusNote: 'DC Today 11:00' },
  { id: '108', number: '108', levelOfCare: 'PCU', state: 'Occupied', receivingAvailable: false },
  { id: '109', number: '109', levelOfCare: 'PCU', state: 'Available', receivingAvailable: true },
  { id: '110', number: '110', levelOfCare: 'PCU', state: 'Cleaning / EVS', receivingAvailable: false, statusNote: 'EVS in progress' },
  { id: '111', number: '111', levelOfCare: 'PCU', state: 'Pending Discharge', receivingAvailable: false, statusNote: 'DC Today 13:00' },
  { id: '112', number: '112', levelOfCare: 'PCU', state: 'Occupied', receivingAvailable: false },
  { id: '113', number: '113', levelOfCare: 'PCU', state: 'Occupied', receivingAvailable: false },
  { id: '114', number: '114', levelOfCare: 'PCU', state: 'Pending Discharge', receivingAvailable: false, statusNote: 'DC Delay 15:30' },
  { id: '115', number: '115', levelOfCare: 'PCU', state: 'Available', receivingAvailable: true },
  { id: '116', number: '116', levelOfCare: 'PCU', state: 'Occupied', receivingAvailable: false },
  { id: '117', number: '117', levelOfCare: 'PCU', state: 'Pending Discharge', receivingAvailable: false, statusNote: 'DC Today 15:30' },
  { id: '118', number: '118', levelOfCare: 'PCU', state: 'Occupied', receivingAvailable: false },
  { id: '119', number: '119', levelOfCare: 'PCU', state: 'Occupied', receivingAvailable: false },
  { id: '120', number: '120', levelOfCare: 'CVICU', state: 'Protected STEMI', receivingAvailable: false, statusNote: 'STEMI Reserve' },
  { id: '121', number: '121', levelOfCare: 'PCU', state: 'Occupied', receivingAvailable: false },
  { id: '122', number: '122', levelOfCare: 'CVICU', state: 'Occupied', receivingAvailable: false }
];

export const initialNurses: Nurse[] = [
  { id: 'N1', name: 'Sarah M. (RN)', assignedRooms: ['101', '102', '103'], workloadScore: 9, acuityLoad: 'Max', remainingCapacity: 0, isCharge: false, carryingPatient: false },
  { id: 'N2', name: 'David K. (RN)', assignedRooms: ['104', '105', '106'], workloadScore: 8, acuityLoad: 'High', remainingCapacity: 0, isCharge: false, carryingPatient: false },
  { id: 'N3', name: 'Elena R. (Charge RN)', assignedRooms: ['107', '108', '109', '110'], workloadScore: 7, acuityLoad: 'Medium', remainingCapacity: 1, isCharge: true, carryingPatient: true },
  { id: 'N4', name: 'Marcus T. (RN)', assignedRooms: ['111', '112', '113', '114'], workloadScore: 6, acuityLoad: 'Medium', remainingCapacity: 1, isCharge: false, carryingPatient: false },
  { id: 'N5', name: 'Jessica W. (RN)', assignedRooms: ['115', '116', '117', '118'], workloadScore: 5, acuityLoad: 'Low', remainingCapacity: 2, isCharge: false, carryingPatient: false },
  { id: 'N6', name: 'Alex P. (RN)', assignedRooms: ['119', '120', '121', '122'], workloadScore: 8, acuityLoad: 'High', remainingCapacity: 0, isCharge: false, carryingPatient: false }
];

export const initialDemandQueue: IncomingDemandItem[] = [
  { id: 'DEM-01', eta: '10:30', source: 'ED', patientType: 'Chest Pain (Admit)', requestedLoc: '1 East (PCU)', preferredDestination: '1E-117', alternateGates: ['1E-115', '1E-120'], backupGate: '1E-120', contingency: 'PACU Hold', status: 'Waiting', priority: 'Urgent', delayReason: 'Awaiting Discharge' },
  { id: 'DEM-02', eta: '11:15', source: 'ED', patientType: 'CHF Exacerbation', requestedLoc: '1 East (PCU)', preferredDestination: '1E-114', alternateGates: ['1E-122', '1E-106'], backupGate: '1E-122', contingency: 'ED Observation Unit', status: 'Waiting', priority: 'Routine' },
  { id: 'DEM-03', eta: '12:00', source: 'OR', patientType: 'CABG (CV Surgery)', requestedLoc: '1 East (CVICU)', preferredDestination: '1E-103', alternateGates: ['104', '106', 'PACU'], backupGate: '104', contingency: 'Hold in OR PACU', status: 'On Schedule', priority: 'Emergent' },
  { id: 'DEM-04', eta: '13:30', source: 'Cath', patientType: 'High Risk PCI', requestedLoc: '1 East (CVICU)', preferredDestination: '1E-120', alternateGates: ['118', '122'], backupGate: '118', contingency: 'Cath Holding', status: 'On Schedule', priority: 'Urgent' },
  { id: 'DEM-05', eta: '14:00', source: 'Day Surgery', patientType: 'Same Day (Obs)', requestedLoc: '1 East (PCU)', preferredDestination: '1E-112', alternateGates: ['111', '114'], backupGate: '111', contingency: 'DSU Overnight Recliner', status: 'On Schedule', priority: 'Routine' },
  { id: 'DEM-06', eta: '15:00', source: 'External Transfer', patientType: 'ICU (External)', requestedLoc: '1 East (CVICU)', preferredDestination: '1E-106', alternateGates: ['103', '113'], backupGate: '103', contingency: 'Decline / Divert', status: 'Pending', priority: 'Urgent' }
];

export const initialTimelineEvents: TimelineEvent[] = [
  { id: 'T1', time: '07:30', category: 'OR', title: 'CABG 07:30', type: 'scheduled' }, { id: 'T2', time: '08:00', category: 'ED', title: 'ED Hold x2', type: 'ed-hold' }, { id: 'T3', time: '09:15', category: 'Cath', title: 'PCI 09:15', type: 'scheduled' }, { id: 'T4', time: '10:00', category: 'DaySurgery', title: 'Hernia 10:00', type: 'scheduled' }, { id: 'T5', time: '11:00', category: 'Discharges', title: 'DC: 107 11:00', type: 'discharge' }, { id: 'T6', time: '12:00', category: 'OR', title: 'AVR 12:00', type: 'scheduled' }, { id: 'T7', time: '12:30', category: 'Transfers', title: 'Transfer In 12:30', type: 'transfer' }, { id: 'T8', time: '13:00', category: 'Discharges', title: 'DC: 111 13:00', type: 'discharge' }, { id: 'T9', time: '14:00', category: 'Cath', title: 'EP 14:00', type: 'scheduled' }, { id: 'T10', time: '15:30', category: 'Discharges', title: 'DC: 117 15:30', type: 'discharge' }, { id: 'T11', time: '17:00', category: 'OR', title: 'MVR 17:00', type: 'scheduled' }, { id: 'T12', time: '18:00', category: 'Transfers', title: 'Direct Admit 18:00', type: 'admission' }, { id: 'T13', time: '20:00', category: 'Discharges', title: 'DC: 114 20:00', type: 'discharge' }, { id: 'T14', time: '22:00', category: 'Transfers', title: 'Transfer In 22:00', type: 'transfer' }
];

export const initialOperationalIssues: OperationalIssue[] = [
  { id: 'ISS-01', time: '10:22', title: 'ED Hold #1 (Chest Pain)', owner: 'House Sup', status: 'Alert', eta: '10:30', comment: '1E-117 pending DC (est 13:00). Alternate 115.', escalationState: 'Warning' },
  { id: 'ISS-02', time: '10:18', title: 'Discharge Delayed - 1E-114', owner: 'Case Management', status: 'Updated', eta: '15:30', comment: 'Patient transport delay. New ETA 15:30.', escalationState: 'Normal' },
  { id: 'ISS-03', time: '10:15', title: 'OR Return - CABG', owner: 'OR', status: 'Resolved', eta: '12:00', comment: 'On track. Estimated to 1E-103 at 12:00.', escalationState: 'Normal' },
  { id: 'ISS-04', time: '10:12', title: 'EVS Ready - 1E-115', owner: 'EVS', status: 'Resolved', eta: 'Now', comment: 'Room 115 cleaned and ready.', escalationState: 'Normal' },
  { id: 'ISS-05', time: '10:08', title: 'Staffing Update', owner: 'Nursing Admin', status: 'Acknowledged', eta: '11:00', comment: 'Additional RN available at 11:00.', escalationState: 'Normal' }
];

export const initialShiftHandoff: ShiftHandoffData = {
  currentRisks: ['Only 2 actionable beds remaining on 1 East', '1 CVICU bed protected for STEMI reserve', 'Discharge delays in rooms 114 & 117'], edHoldsCount: 2, pendingAdmissionsCount: 3, pendingTransfersCount: 2, expectedProcedureDemand: 'CABG at 12:00, High Risk PCI at 13:30, EP at 14:00', expectedDischargesCount: 4, protectedBedsSummary: '1 bed (1E-120) protected for STEMI emergency reserve through night shift.', staffingLimitations: 'Charge RN carrying patient assignment; relieving RN arriving at 11:00.', unresolvedActionItems: 2, preparedBy: 'House Supervisor (Night Shift)', supervisorAcknowledged: true, timestamp: '2026-09-08 10:24 AM'
};
