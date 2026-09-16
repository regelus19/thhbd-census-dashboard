import { CapacityStatus, Room, IncomingDemandItem } from '../types/hospital';

export function calculateCapacityStatus(
  rooms: Room[],
  demandQueue: IncomingDemandItem[],
  staffedBeds: number,
  currentCensus: number
): { status: CapacityStatus; actionableBeds: number; projectedCensus: number; reason: string } {
  const actionableRooms = rooms.filter(r => r.state === 'Available' && r.receivingAvailable);
  const staffedHeadroom = Math.max(0, staffedBeds - currentCensus);
  const actionableBeds = Math.min(actionableRooms.length, staffedHeadroom);
  const activeDemandCount = demandQueue.filter(d => d.status === 'Waiting' || d.status === 'Pending').length;
  const expectedDischarges = rooms.filter(r => r.state === 'Pending Discharge').length;
  const projectedCensus = Math.max(0, currentCensus + activeDemandCount - expectedDischarges);

  let status: CapacityStatus = 'NORMAL';
  let reason = 'Adequate actionable capacity';

  if (actionableBeds === 0 && activeDemandCount > 0) {
    status = 'CRITICAL';
    reason = 'No actionable capacity with unresolved incoming demand';
  } else if (actionableBeds <= 1 || projectedCensus >= staffedBeds) {
    status = 'ALERT';
    reason = 'Projected demand is consuming operational capacity';
  } else if (actionableBeds <= 2 || projectedCensus >= Math.ceil(staffedBeds * 0.85)) {
    status = 'WATCH';
    reason = 'Occupancy or projected demand is approaching operational capacity';
  }

  return { status, actionableBeds, projectedCensus, reason };
}
