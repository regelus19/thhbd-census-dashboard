import React, { useState } from 'react';
import { Room } from '../types/hospital';

interface RoomGridProps {
  rooms: Room[];
}

export const RoomGrid: React.FC<RoomGridProps> = ({ rooms }) => {
  const [filter, setFilter] = useState<string>('All Rooms');

  const getRoomStateColor = (state: Room['state']) => {
    switch (state) {
      case 'Available':
        return 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400';
      case 'Occupied':
        return 'bg-command-dark border-command-border text-command-muted';
      case 'Pending Discharge':
        return 'bg-amber-950/60 border-amber-500/50 text-amber-400';
      case 'Cleaning / EVS':
      case 'Dirty':
        return 'bg-orange-950/60 border-orange-500/50 text-orange-400';
      case 'Incoming':
        return 'bg-blue-950/60 border-blue-500/50 text-blue-400';
      case 'Protected STEMI':
        return 'bg-purple-950/60 border-purple-500/50 text-purple-400 animate-pulse';
      default:
        return 'bg-command-dark border-command-border text-command-muted';
    }
  };

  const filteredRooms = rooms.filter(room => {
    if (filter === 'All Rooms') return true;
    if (filter === 'Available' && room.state === 'Available') return true;
    if (filter === 'Occupied' && room.state === 'Occupied') return true;
    if (filter === 'Pending DC' && room.state === 'Pending Discharge') return true;
    if (filter === 'Protected' && room.state === 'Protected STEMI') return true;
    return false;
  });

  return (
    <div className="bg-command-card border border-command-border rounded-lg p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
        <h2 className="text-sm font-bold tracking-wide text-command-text">
          UNIT / ROOM STATUS <span className="text-xs font-normal text-command-muted">(1E – 22 Beds)</span>
        </h2>
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-command-muted">
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Available</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-command-border"></span> Occupied</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Pending Discharge</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Cleaning (EVS)</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Incoming</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Protected STEMI</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3 pt-2 border-t border-command-border/60">
        <div className="text-xs text-command-muted">Click any room card to inspect nurse workload, acuity, and receiving availability.</div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-command-dark border border-command-border rounded px-2.5 py-1 text-xs text-command-text font-semibold">
          <option value="All Rooms">1E - All Rooms</option>
          <option>Available</option><option>Occupied</option><option>Pending DC</option><option>Protected</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2">
        {filteredRooms.map(room => (
          <div key={room.id} onClick={() => alert(`Room ${room.number} (${room.levelOfCare}): State is [${room.state}]. Note: ${room.statusNote || 'None'}`)} className={`border rounded-lg p-2.5 flex flex-col justify-between cursor-pointer hover:scale-105 transition-transform ${getRoomStateColor(room.state)}`}>
            <div className="flex items-center justify-between"><span className="font-bold text-sm">{room.number}</span><span className="text-[10px] font-semibold opacity-80">{room.levelOfCare}</span></div>
            <div className="my-2"><div className="text-[11px] font-bold truncate">{room.state}</div><div className="text-[10px] opacity-75 truncate">{room.statusNote || (room.receivingAvailable ? 'Receiving Ready' : 'Not Available')}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
};
