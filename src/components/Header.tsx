import React from 'react';

interface HeaderProps {
  currentShift: string;
  currentTime: string;
}

export const Header: React.FC<HeaderProps> = ({ currentShift, currentTime }) => {
  return (
    <header className="bg-command-card border-b border-command-border px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 font-bold text-xl">🫀</div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider text-red-400 uppercase">THHBD</span>
            <span className="text-xs text-command-muted">|</span>
            <span className="text-xs tracking-wide text-command-muted">The Heart Hospital Baylor Denton</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-command-text">HOSPITAL OPERATIONS HUB</h1>
        </div>
      </div>
      <div className="hidden xl:flex items-center gap-3 text-xs font-semibold tracking-widest text-command-accent">
        <span>PATIENT FLOW</span><span className="text-command-border">•</span><span>CAPACITY</span><span className="text-command-border">•</span><span>PEOPLE</span><span className="text-command-border">•</span><span>PLAN</span><span className="text-command-border">•</span><span>TOGETHER</span>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right"><div className="text-sm font-bold text-command-text">{currentTime}</div><div className="text-xs text-command-muted">Mon, Sep 8, 2026</div></div>
        <div className="bg-command-dark px-3 py-1.5 rounded border border-command-border text-xs"><div className="font-semibold text-command-accent">{currentShift}</div><div className="text-[10px] text-command-muted">19:00 - 07:00</div></div>
        <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/40 px-3 py-1.5 rounded text-xs text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span><div className="leading-tight"><div className="font-bold">Live Data</div><div className="text-[10px] opacity-75">Last updated: {currentTime}</div></div></div>
      </div>
    </header>
  );
};
