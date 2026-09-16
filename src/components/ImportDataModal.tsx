import React, { useState } from 'react';
import { X, Upload, FileSpreadsheet, Check } from 'lucide-react';

interface ImportDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: () => void;
}

export const ImportDataModal: React.FC<ImportDataModalProps> = ({ isOpen, onClose, onImportSuccess }) => {
  const [importType, setImportType] = useState('House Supervisor Census');
  const [successMsg, setSuccessMsg] = useState(false);

  if (!isOpen) return null;

  const handleSimulateImport = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      onImportSuccess();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-command-card border border-command-border rounded-xl max-w-lg w-full p-6 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-command-border mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <FileSpreadsheet size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-command-text">CSV / JSON Operational Data Import</h2>
              <p className="text-xs text-command-muted">Prototype adapters for de-identified operational extracts</p>
            </div>
          </div>
          <button onClick={onClose} className="text-command-muted hover:text-command-text p-1">
            <X size={20} />
          </button>
        </div>

        {successMsg ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mb-3">
              <Check size={24} />
            </div>
            <div className="text-sm font-bold text-command-text">Data Imported Successfully!</div>
            <div className="text-xs text-command-muted mt-1">Operational state and capacity thresholds refreshed.</div>
          </div>
        ) : (
          <form onSubmit={handleSimulateImport} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-command-muted mb-1">Select Data Feed Adapter</label>
              <select
                value={importType}
                onChange={(e) => setImportType(e.target.value)}
                className="w-full bg-command-dark border border-command-border rounded p-2 text-command-text font-semibold"
              >
                <option>House Supervisor Census Report (.csv)</option>
                <option>ED Charge Nurse Inbound Report (.csv)</option>
                <option>Bed Planning Turnaround Extract (.json)</option>
                <option>Staffing & Assignment Sheet (.csv)</option>
              </select>
            </div>

            <div className="border-2 border-dashed border-command-border rounded-lg p-6 text-center bg-command-dark/40 hover:border-command-accent transition-colors cursor-pointer">
              <Upload size={28} className="mx-auto text-command-muted mb-2" />
              <div className="font-semibold text-command-text">CSV / JSON import simulation</div>
              <div className="text-[11px] text-command-muted mt-1">MVP only — file parsing is not connected yet; do not use PHI</div>
            </div>

            <div className="bg-command-dark p-3 rounded border border-command-border text-[11px] text-command-muted">
              <strong>Note:</strong> This MVP does not validate PHI and does not persist uploaded files. Use synthetic or de-identified data only.
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-command-border">
              <button
                type="button"
                onClick={onClose}
                className="bg-command-border/40 hover:bg-command-border text-command-text px-4 py-2 rounded font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-command-accent text-command-dark px-4 py-2 rounded font-bold hover:bg-opacity-90 transition-colors"
              >
                Import & Refresh Hub
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
