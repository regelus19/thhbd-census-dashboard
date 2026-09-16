export type CapacityStatus = 'NORMAL' | 'WATCH' | 'ALERT' | 'CRITICAL';
export type RoomState = 'Occupied' | 'Available' | 'Pending Discharge' | 'Dirty' | 'Cleaning / EVS' | 'Incoming' | 'Reserved' | 'Protected STEMI' | 'Blocked' | 'Out of Service';
export type DemandStatus = 'Waiting' | 'Pending' | 'On Schedule' | 'Ready' | 'Assigned' | 'Delayed' | 'Protected' | 'Contingency';
export type IssueStatus = 'Alert' | 'Acknowledged' | 'Updated' | 'Resolved';
export type DelayReason = 'Staffing / Acuity Capacity' | 'Protected STEMI / Emergency Capacity' | 'Procedural Bed Commitment' | 'Awaiting Discharge' | 'EVS / Room Readiness' | 'Level-of-Care / Bed Compatibility' | 'Competing Demand' | 'Shift Handoff / Inherited Delay' | 'Communication / Coordination' | 'Other' | 'Unknown / Review Required';

export interface HospitalUnit { id: string; name: string; physicalBeds: number; staffedBeds: number; currentCensus: number; }
export interface Room { id: string; number: string; levelOfCare: string; state: RoomState; receivingAvailable: boolean; statusNote?: string; }
export interface Nurse { id: string; name: string; assignedRooms: string[]; workloadScore: number; acuityLoad: 'Low' | 'Medium' | 'High' | 'Max'; remainingCapacity: number; isCharge: boolean; carryingPatient: boolean; }
export interface NurseAssignment { nurseId: string; roomIds: string[]; shift: 'Day' | 'Night'; receivingAvailable: boolean; }
export interface IncomingDemandItem { id: string; eta: string; source: 'ED' | 'Direct' | 'External Transfer' | 'OR' | 'Cath' | 'EP' | 'Day Surgery'; patientType: string; requestedLoc: string; preferredDestination: string; alternateGates: string[]; backupGate: string; contingency: string; status: DemandStatus; priority: 'Routine' | 'Urgent' | 'Emergent'; delayReason?: DelayReason | string; }
export interface PatientFlowEvent { id: string; time: string; category: 'ED' | 'OR' | 'Cath' | 'DaySurgery' | 'Transfers' | 'Discharges'; title: string; type: 'scheduled' | 'admission' | 'discharge' | 'transfer' | 'ed-hold'; }
export type TimelineEvent = PatientFlowEvent;
export interface ExpectedDischarge { id: string; roomId: string; expectedTime: string; state: 'Expected Discharge' | 'Discharge Order' | 'Awaiting Physician' | 'Awaiting Transportation' | 'Awaiting Family' | 'Awaiting Medication' | 'Patient Departed' | 'Room Dirty' | 'EVS Requested' | 'Cleaning' | 'Bed Ready'; }
export interface ProceduralDemand { id: string; service: 'OR' | 'Cath' | 'EP' | 'Day Surgery'; expectedReturnTime: string; requestedLoc: string; preferredRoom?: string; }
export interface CapacitySnapshot { timestamp: string; unitId: string; census: number; physicalBeds: number; staffedBeds: number; actionableBeds: number; protectedBeds: number; committedBeds: number; capacityStatus: CapacityStatus; }
export interface ForecastSnapshot { horizonHours: 0 | 6 | 12 | 24; projectedCensus: number; expectedAdmissions: number; expectedDischarges: number; projectedActionableCapacity: number; projectedDeficit: number; }
export interface StaffingException { id: string; unitId: string; startTime: string; endTime?: string; reason: string; impact: string; }
export interface OperationalIssue { id: string; time: string; title: string; owner: string; status: IssueStatus; eta: string; comment: string; escalationState: 'Normal' | 'Warning' | 'Critical'; }
export interface ActionItem { id: string; issueId?: string; owner: string; dueTime?: string; status: IssueStatus; note: string; }
export interface Huddle { id: string; timestamp: string; type: 'Morning Bed Huddle' | 'Midday Capacity Review' | 'Shift Handoff' | string; summary: string; actionItemIds: string[]; }
export interface ShiftHandoffData { currentRisks: string[]; edHoldsCount: number; pendingAdmissionsCount: number; pendingTransfersCount: number; expectedProcedureDemand: string; expectedDischargesCount: number; protectedBedsSummary: string; staffingLimitations: string; unresolvedActionItems: number; preparedBy: string; supervisorAcknowledged: boolean; timestamp: string; }
