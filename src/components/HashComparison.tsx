import React from 'react';
import { CheckCircle2, AlertOctagon, Copy, Check, ShieldAlert, ShieldCheck } from 'lucide-react';
import { truncateHash } from '@/lib/crypto';

interface HashComparisonProps {
  localHash: string;
  onChainHash: string;
  isTampered?: boolean;
  tamperMessage?: string;
}

export function HashComparison({
  localHash,
  onChainHash,
  isTampered = false,
  tamperMessage,
}: HashComparisonProps) {
  const [copiedField, setCopiedField] = React.useState<string | null>(null);

  const isMatch = localHash.toLowerCase() === onChainHash.toLowerCase() && !isTampered;

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div
      className={`rounded-xl border p-5 transition-all ${
        isMatch
          ? 'bg-[#0D131D] border-[#22C55E]/40 shadow-lg shadow-emerald-500/5'
          : 'bg-[#EF4444]/5 border-[#EF4444]/50 shadow-lg shadow-rose-500/10'
      }`}
    >
      {/* Status Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#243041]">
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-lg border ${
              isMatch
                ? 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30'
                : 'bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/40 animate-pulse'
            }`}
          >
            {isMatch ? <ShieldCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm md:text-base font-bold font-mono tracking-wide ${
                  isMatch ? 'text-[#22C55E]' : 'text-[#EF4444]'
                }`}
              >
                {isMatch ? '✓ HASHES MATCH — CRYPTOGRAPHIC INTEGRITY VERIFIED' : '✕ INTEGRITY CHECK FAILED — TAMPER DETECTED'}
              </span>
            </div>
            <p className="text-xs text-[#8D99A8] mt-0.5">
              {isMatch
                ? 'Stored off-chain record exactly matches the on-chain immutable seal (0-bit deviation).'
                : 'Stored record payload does not match the blockchain seal! Avalanche effect triggered.'}
            </p>
          </div>
        </div>

        <div className="hidden sm:block text-right">
          <span
            className={`font-mono text-xs px-2.5 py-1 rounded font-semibold border ${
              isMatch
                ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30'
                : 'bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/50'
            }`}
          >
            {isMatch ? 'PASSED 256/256 BITS' : 'MISMATCH DETECTED'}
          </span>
        </div>
      </div>

      {/* Tamper context callout if triggered */}
      {!isMatch && tamperMessage && (
        <div className="mb-4 p-3 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 text-xs text-[#EF4444] font-medium flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 shrink-0" />
          <span>{tamperMessage}</span>
        </div>
      )}

      {/* Dual Hash Visual Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Local Stored Record Hash */}
        <div className="p-3.5 rounded-lg bg-[#070B12] border border-[#243041] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-[#8D99A8] flex items-center gap-1.5 font-medium">
              <span className={`w-2 h-2 rounded-full ${isMatch ? 'bg-cyan-400' : 'bg-red-400'}`} />
              STORED RECORD HASH (LOCAL SHA-256)
            </span>
            <button
              onClick={() => copyToClipboard(localHash, 'local')}
              className="text-[#8D99A8] hover:text-[#F5F7FA] transition-colors p-1"
              title="Copy hash"
            >
              {copiedField === 'local' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className={`p-2.5 rounded font-mono text-xs break-all border ${
            isMatch ? 'bg-[#121A26] border-[#243041] text-cyan-300' : 'bg-red-950/30 border-red-500/40 text-red-300'
          }`}>
            {localHash}
          </div>
          <div className="text-[11px] text-[#8D99A8] flex justify-between">
            <span>Canonical sorted JSON representation</span>
            <span className="font-mono">256-bit digest</span>
          </div>
        </div>

        {/* On-Chain Immutable Seal */}
        <div className="p-3.5 rounded-lg bg-[#070B12] border border-[#243041] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-[#8D99A8] flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              ON-CHAIN HASH (POLYGON AMOY SEAL)
            </span>
            <button
              onClick={() => copyToClipboard(onChainHash, 'onchain')}
              className="text-[#8D99A8] hover:text-[#F5F7FA] transition-colors p-1"
              title="Copy hash"
            >
              {copiedField === 'onchain' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className="p-2.5 rounded font-mono text-xs break-all bg-[#121A26] border border-[#243041] text-blue-300">
            {onChainHash}
          </div>
          <div className="text-[11px] text-[#8D99A8] flex justify-between">
            <span>Smart Contract Storage Slot</span>
            <span className="font-mono text-[#22C55E]">Immutable</span>
          </div>
        </div>
      </div>
    </div>
  );
}
