import React, { useState } from 'react';
import { Room } from '../types/hospital';
import { Pencil } from 'lucide-react';

interface RoomGridProps {
  rooms: Room[];
  onUpdateRoom: (room: Room) => void;
}

export const RoomGrid: React.FC<RoomGridProps> = ({ rooms, onUpdateRoom }) => {
  const [filter, setFilter] = useState<string>('All Rooms');
  const [editing, setEditing] = useState<Room | null>(null);

  const getRoomStateColor = (state: Room['state']) => {
    switch (state) {
      case 'Available': return 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400';
      case 'Occupied': return 'bg-command-dark border-command-border text-command-muted';
      case 'Pending Discharge': return 'bg-amber-950/60 border-amber-500/50 text-amber-400';
      case 'Cleaning / EVS':
      case 'Dirty': return 'bg-orange-950/60 border-orange-500/50 text-orange-400';
      case 'Incoming': return 'bg-blue-950/60 border-blue-500/50 text-blue-400';
      case 'Protected STEMI': return 'bg-purple-950/60 border-purple-500/50 text-purple-400';
      case 'Reserved': return 'bg-cyan-950/60 border-cyan-500/50 text-cyan-400';
      case 'Blocked':
      case 'Out of Service': return 'bg-slate-950 border-slate-500/50 text-slate-400';
      default: return 'bg-command-dark border-command-border text-command-muted';
    }
  };

  const filteredRooms = rooms.filter(room => {
    if (filter === 'All Rooms') return true;
    if (filter === 'Available') return room.state === 'Available';
    if (filter === 'Occupied') return room.state === 'Occupied';
    if (filter === 'Pending DC') return room.state === 'Pending Discharge';
    if (filter === 'Protected') return room.state === 'Protected STEMI';
    return true;
  });

  const saveRoom = () => {
    if (!editing) return;
    onUpdateRoom(editing);
    setEditing(null);
  };

  return (
    <>
      <div className="bg-command-card border border-command-border rounded-lg p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
          <div>
            <h2 className="text-sm font-bold tracking-wide text-command-text">UNIT / ROOM STATUS <span className="text-xs font-normal text-command-muted">(1E – 22 Beds)</span></h2>
            <div className="text-[11px] text-command-muted mt-1">Click a room to manually change state, receiving readiness, or note.</div>
          </div>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-command-dark border border-command-border rounded px-2.5 py-1 text-xs text-command-text font-semibold">
            <option value="All Rooms">1E - All Rooms</option><option>Available</option><option>Occupied</option><option>Pending DC</option><option>Protected</option>
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2">
          {filteredRooms.map(room => (
            <button key={room.id} onClick={() => setEditing({ ...room })} className={`text-left border rounded-lg p-2.5 flex flex-col justify-between hover:scale-[1.02] transition-transform ${getRoomStateColor(room.state)}`}>
              <div className="flex items-center justify-between"><span className="font-bold text-sm">{room.number}</span><Pencil size={11} className="opacity-60" /></div>
              <div className="text-[10px] font-semibold opacity-80">{room.levelOfCare}</div>
              <div className="my-2"><div className="text-[11px] font-bold truncate">{room.state}</div><div className="text-[10px] opacity-75 truncate">{room.statusNote || (room.receivingAvailable ? 'Receiving Ready' : 'Not Available')}</div></div>
            </button>
          ))}
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-command-card border border-command-accent/40 rounded-lg p-5 shadow-2xl">
            <h3 className="text-lg font-bold text-command-text">Edit Room {editing.number}</h3>
            <p className="text-xs text-command-muted mb-4">Manual MVP room state. No patient identifiers.</p>
            <div className="space-y-3">
              <label className="block text-xs text-command-muted">State
                <select value={editing.state} onChange={(e) => setEditing(prev => prev ? ({ ...prev, state: e.target.value as Room['state'] }) : prev)} className="mt-1 w-full bg-command-dark border border-command-border rounded px-3 py-2 text-command-text">
                  <option>Occupied</option><option>Available</option><option>Pending Discharge</option><option>Dirty</option><option>Cleaning / EVS</option><option>Incoming</option><option>Reserved</option><option>Protected STEMI</option><option>Blocked</option><option>Out of Service</option>
                </select>
              </label>
              <label className="block text-xs text-command-muted">Level of Care
                <input value={editing.levelOfCare} onChange={(e) => setEditing(prev => prev ? ({ ...prev, levelOfCare: e.target.value }) : prev)} className="mt-1 w-full bg-command-dark border border-command-border rounded px-3 py-2 text-command-text" />
              </label>
              <label className="block text-xs text-command-muted">Operational Note
                <input value={editing.statusNote || ''} onChange={(e) => setEditing(prev => prev ? ({ ...prev, statusNote: e.target.value }) : prev)} placeholder="e.g. CABG 12:00, DC expected 15:30" className="mt-1 w-full bg-command-dark border border-command-border rounded px-3 py-2 text-command-text" />
              </label>
              <label className="flex items-center gap-2 text-xs text-command-text"><input type="checkbox" checked={editing.receivingAvailable} onChange={(e) => setEditing(prev => prev ? ({ ...prev, receivingAvailable: e.target.checked }) : prev)} /> Receiving available now</label>
            </div>
            <div className="flex justify-end gap-2 mt-5"><button onClick={() => setEditing(null)} className="px-3 py-2 rounded border border-command-border text-command-muted">Cancel</button><button onClick={saveRoom} className="px-4 py-2 rounded bg-command-accent text-command-dark font-bold">Save Room</button></div>
          </div>
        </div>
      )}
    </>
  );
};
