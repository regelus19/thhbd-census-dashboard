import React from 'react';
import { LayoutDashboard, BedDouble, Scissors, Activity, HeartPulse, FileText, UserCheck, Sparkles, Users, BarChart3 } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'War Room', label: 'War Room', icon: LayoutDashboard },
    { id: '1E Unit', label: '1E Unit', icon: BedDouble },
    { id: 'Day Surgery', label: 'Day Surgery', icon: Scissors },
    { id: 'Cath / EP', label: 'Cath / EP', icon: Activity },
    { id: 'OR / CV Surgery', label: 'OR / CV Surgery', icon: HeartPulse },
    { id: 'Case Management', label: 'Case Management', icon: FileText },
    { id: 'MD / APP', label: 'MD / APP', icon: UserCheck },
    { id: 'EVS', label: 'EVS', icon: Sparkles },
    { id: 'Staffing', label: 'Staffing', icon: Users },
    { id: 'Reports', label: 'Reports', icon: BarChart3 }
  ];

  return (
    <nav className="bg-command-card/80 border-b border-command-border px-4 py-2 flex items-center gap-1 overflow-x-auto">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${isActive ? 'bg-command-accent text-command-dark font-bold shadow-lg' : 'text-command-muted hover:text-command-text hover:bg-command-border/40'}`}>
            <Icon size={16} />{item.label}
          </button>
        );
      })}
    </nav>
  );
};
