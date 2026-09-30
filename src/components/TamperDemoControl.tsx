'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CanonicalDecisionRecord } from '@/types';
import { 
  Flame, 
  RotateCcw, 
  AlertTriangle, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2,
  Terminal,
  Layers
} from 'lucide-react';
import { truncateHash } from '@/lib/crypto';

interface TamperDemoControlProps {
  record: CanonicalDecisionRecord;
}

export function TamperDemoControl({ record }: TamperDemoControlProps) {
  const { tamperRecord, restoreRecord } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTamperClick = async () => {
    setIsProcessing(true);
    await tamperRecord(record.recordId, 'telecommunications terminal');
    setIsProcessing(false);
  };

  const handleRestoreClick = async () => {
    setIsProcessing(true);
    await restoreRecord(record.recordId);
    setIsProcessing(false);
  };

  return (
    <div className="rounded-xl bg-[#0D131D] border border-cyan-500/30 p-5 shadow-lg relative overflow-hidden">
      {/* Accent corner banner */}
      <div className="absolute top-0 right-0 bg-gradient-to-l from-cyan-500/20 to-transparent px-4 py-1 text-[10px] font-mono uppercase text-cyan-300 border-b border-l border-cyan-500/30 rounded-bl-lg">
        Hackathon Demo Control
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Terminal className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2">
            Tamper Detection Simulator
          </h4>
          <p className="text-xs text-[#8D99A8]">
            Demonstrate cryptographic integrity: alter off-chain storage by exactly 1 word and watch the verification fail.
          </p>
        </div>
      </div>

      <div className="p-3.5 rounded-lg bg-[#070B12] border border-[#243041] mb-4 text-xs font-mono space-y-2">
        <div className="text-[#8D99A8] text-[11px]">
          Target Field: <span className="text-blue-300">productDescription</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 rounded bg-[#121A26] border border-[#243041]">
          <div className="truncate">
            <span className="text-[#8D99A8]">Current: </span>
            <span className={record.isTampered ? 'text-red-400 font-semibold' : 'text-[#22C55E]'}>
              &quot;{record.productDescription}&quot;
            </span>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded uppercase shrink-0 font-bold ${
            record.isTampered ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
          }`}>
            {record.isTampered ? 'Tampered' : 'Pristine'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        {!record.isTampered ? (
          <button
            onClick={handleTamperClick}
            disabled={isProcessing}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-semibold shadow-md shadow-red-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            <Flame className="w-4 h-4 text-amber-200" />
            <span>Simulate Record Modification (Modify 1 Word)</span>
          </button>
        ) : (
          <button
            onClick={handleRestoreClick}
            disabled={isProcessing}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-[#070B12] text-xs font-semibold shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restore Original Record (Verify 0-Bit Delta)</span>
          </button>
        )}

        <div className="text-[11px] text-[#8D99A8] italic">
          {record.isTampered ? (
            <span className="text-red-400 flex items-center gap-1 font-medium">
              <AlertTriangle className="w-3.5 h-3.5" />
              Altered data recomputed live; on-chain blockchain seal remains inviolate.
            </span>
          ) : (
            <span>Changes &quot;fitness accessory&quot; → &quot;telecommunications terminal&quot; to test SHA-256 cascade.</span>
          )}
        </div>
      </div>
    </div>
  );
}
