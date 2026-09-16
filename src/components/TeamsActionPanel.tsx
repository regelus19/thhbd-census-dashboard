import React, { useState } from 'react';
import { OperationalIssue } from '../types/hospital';
import { MessageSquare, Send } from 'lucide-react';

interface TeamsActionPanelProps {
  issues: OperationalIssue[];
  onAddIssue: (newIssue: OperationalIssue) => void;
}

export const TeamsActionPanel: React.FC<TeamsActionPanelProps> = ({ issues, onAddIssue }) => {
  const [activeTab, setActiveTab] = useState<'Feed' | 'Mentions' | 'Actions' | 'Briefs'>('Feed');
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    const newIssue: OperationalIssue = {
      id: `ISS-0${issues.length + 1}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: messageInput,
      owner: 'Command Center',
      status: 'Alert',
      eta: 'Now',
      comment: 'Simulated Hub action-loop update',
      escalationState: 'Warning'
    };
    onAddIssue(newIssue);
    setMessageInput('');
  };

  return (
    <div className="bg-command-card border border-command-border rounded-lg p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-command-border"><div className="flex items-center gap-2"><MessageSquare size={18} className="text-blue-400" /><h2 className="text-sm font-bold tracking-wide text-command-text">TEAMS-STYLE ACTION LOOP</h2></div><button onClick={() => alert('Teams integration is simulated in the MVP.')} className="bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-500/40 px-2.5 py-1 rounded text-xs font-semibold transition-colors">Simulate Teams</button></div>
      <div className="flex items-center gap-2 border-b border-command-border pb-2 mb-3 text-xs">
        {['Feed', 'Mentions (3)', 'Actions (5)', 'Huddle Briefs'].map(tabName => {
          const rawName = tabName.split(' ')[0] as 'Feed' | 'Mentions' | 'Actions' | 'Briefs';
          const isActive = activeTab === rawName;
          return <button key={tabName} onClick={() => setActiveTab(rawName)} className={`px-2.5 py-1 rounded transition-colors ${isActive ? 'bg-command-accent text-command-dark font-bold' : 'text-command-muted hover:text-command-text'}`}>{tabName}</button>;
        })}
      </div>
      <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[220px] mb-3 pr-1">
        {issues.map(issue => <div key={issue.id} className="bg-command-dark/70 border border-command-border/70 p-2.5 rounded text-xs"><div className="flex items-center justify-between mb-1"><span className="font-bold text-command-text">{issue.title}</span><span className="text-[10px] text-command-muted">{issue.time}</span></div><div className="flex items-center justify-between text-[11px] text-command-muted mb-1"><span>Owner: <strong className="text-command-accent">{issue.owner}</strong></span><span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${issue.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>{issue.status}</span></div><p className="text-[11px] text-command-text opacity-90">{issue.comment}</p></div>)}
      </div>
      <div className="bg-command-dark p-2.5 rounded border border-command-border mb-3 text-[11px]"><div className="font-bold text-command-accent mb-1.5">ACTION LOOP (Closed Loop Workflow)</div><div className="grid grid-cols-4 gap-1 text-center font-semibold"><div className="bg-blue-500/20 text-blue-400 p-1 rounded border border-blue-500/40">① Alert</div><div className="bg-emerald-500/20 text-emerald-400 p-1 rounded border border-emerald-500/40">② Acknowledge</div><div className="bg-amber-500/20 text-amber-400 p-1 rounded border border-amber-500/40">③ Update</div><div className="bg-purple-500/20 text-purple-400 p-1 rounded border border-purple-500/40">④ Resolve</div></div></div>
      <form onSubmit={handleSendMessage} className="flex gap-2"><input type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder="Type a message or issue alert..." className="flex-1 bg-command-dark border border-command-border rounded px-3 py-1.5 text-xs text-command-text focus:outline-none focus:border-command-accent" /><button type="submit" className="bg-command-accent text-command-dark px-3 py-1.5 rounded text-xs font-bold hover:bg-opacity-90 transition-colors flex items-center gap-1"><Send size={14} /></button></form>
    </div>
  );
};
