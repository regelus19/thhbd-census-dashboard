import React from 'react';
import { Construction } from 'lucide-react';

interface PlaceholderViewProps { title: string; }

export const PlaceholderView: React.FC<PlaceholderViewProps> = ({ title }) => (
  <div className="bg-command-card border border-command-border rounded-lg p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
    <Construction size={48} className="text-command-accent mb-3 animate-pulse" />
    <h2 className="text-lg font-bold text-command-text mb-1">{title} View</h2>
    <p className="text-xs text-command-muted max-w-md">This is a placeholder within the THHBD Hospital Operations Hub MVP. Full operational integration for {title} is intentionally deferred.</p>
  </div>
);
