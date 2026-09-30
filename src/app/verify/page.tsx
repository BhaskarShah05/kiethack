'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { useApp } from '@/context/AppContext';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Search, 
  CheckCircle2, 
  AlertOctagon, 
  ExternalLink, 
  ArrowRight, 
  Loader2,
  Lock,
  Binary
} from 'lucide-react';
import { truncateHash, verifyRecord } from '@/lib/crypto';
import { CanonicalDecisionRecord } from '@/types';

export default function VerificationPage() {
  const { records, getRecord } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [query, setQuery] = useState('REC-2026-0891');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    record: CanonicalDecisionRecord;
    isValid: boolean;
    computedHash: string;
    onChainHash: string;
    timestamp: string;
  } | null>(null);
  const [notFound, setNotFound] = useState(false);

  const executeVerification = async (targetQuery: string) => {
    setIsVerifying(true);
    setNotFound(false);
    setVerificationResult(null);

    await new Promise(r => setTimeout(r, 600));

    const clean = targetQuery.trim();
    const found = records.find(
      r => r.recordId.toLowerCase() === clean.toLowerCase() ||
           r.recordHash.toLowerCase() === clean.toLowerCase() ||
           r.onChainHash.toLowerCase() === clean.toLowerCase()
    );

    if (!found) {
      setNotFound(true);
      setIsVerifying(false);
      return;
    }

    const { isValid, computedHash } = await verifyRecord(found);

    setVerificationResult({
      record: found,
      isValid: isValid && !found.isTampered,
      computedHash,
      onChainHash: found.onChainHash,
      timestamp: found.onChainTx?.blockTimestamp || found.createdAt,
    });

    setIsVerifying(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    executeVerification(query);
  };

  return (
    <div className="flex min-h-screen bg-[#070B12] text-[#F5F7FA]">
      <Sidebar 
        mobileOpen={mobileMenuOpen} 
        onMobileClose={() => setMobileMenuOpen(false)} 
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar 
          title="Independent Public Verification" 
          subtitle="Query the blockchain testnet anchor and cryptographically verify record integrity" 
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 md:p-8 max-w-4xl w-full mx-auto space-y-6">
          {/* Header */}
          <div className="pb-2 border-b border-[#243041]">
            <h2 className="text-xl md:text-2xl font-bold text-[#F5F7FA] tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
              <span>Verify a Classification Record</span>
            </h2>
            <p className="text-xs text-[#8D99A8] mt-1">
              Any customs authority or auditor can verify an off-chain record without exposing private invoice text
            </p>
          </div>

          {/* Verification Search Box */}
          <div className="rounded-xl bg-[#0D131D] border border-[#243041] p-6 shadow-sm space-y-4">
            <form onSubmit={handleFormSubmit} className="space-y-3">
              <label className="text-xs font-semibold text-[#F5F7FA] flex items-center justify-between">
                <span>Enter Record ID or Canonical SHA-256 Hash:</span>
                <span className="text-[10px] text-blue-400 font-mono">Polygon Amoy Testnet (#80002)</span>
              </label>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Binary className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8D99A8]" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g. REC-2026-0891 or 0x8f2c3b889e41982bca819024f81c9e7a2b918cd4189025e1a74d89b12480ac19"
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-[#070B12] text-xs font-mono text-[#F5F7FA] border border-[#243041] focus:outline-none focus:border-blue-500 placeholder-[#8D99A8]/40"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isVerifying}
                  className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md transition-colors disabled:opacity-50"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-cyan-300" />
                      <span>Verify Record</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Test Samples */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#8D99A8] text-[11px] font-mono uppercase mr-1">Demo Quick Tests:</span>
              <button
                type="button"
                onClick={() => {
                  setQuery('REC-2026-0891');
                  executeVerification('REC-2026-0891');
                }}
                className="px-2.5 py-1 rounded bg-[#121A26] hover:bg-[#1A2535] text-[#22C55E] border border-[#22C55E]/30 text-[11px] font-mono transition-colors"
              >
                Test Valid Seal (REC-2026-0891)
              </button>
              <button
                type="button"
                onClick={() => {
                  setQuery('REC-2026-0892');
                  executeVerification('REC-2026-0892');
                }}
                className="px-2.5 py-1 rounded bg-[#121A26] hover:bg-[#1A2535] text-amber-300 border border-amber-500/30 text-[11px] font-mono transition-colors"
              >
                Test Senior Review Case
              </button>
            </div>
          </div>

          {/* Not Found State */}
          {notFound && (
            <div className="p-5 rounded-xl bg-[#0D131D] border border-amber-500/40 text-center space-y-2">
              <div className="text-amber-400 font-semibold text-sm">
                No Record Found with ID or Hash: {query}
              </div>
              <p className="text-xs text-[#8D99A8]">
                Ensure the Record ID format is REC-2026-XXXX or try searching in the Records tab.
              </p>
            </div>
          )}

          {/* Verification Result Card */}
          {verificationResult && (
            <div
              className={`rounded-xl border p-6 space-y-5 animate-in fade-in duration-200 ${
                verificationResult.isValid
                  ? 'bg-[#0D131D] border-[#22C55E]/40 shadow-xl shadow-emerald-500/5'
                  : 'bg-[#EF4444]/10 border-[#EF4444]/50 shadow-xl shadow-rose-500/10'
              }`}
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#243041]">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-xl border ${
                      verificationResult.isValid
                        ? 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30'
                        : 'bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/40 animate-pulse'
                    }`}
                  >
                    {verificationResult.isValid ? (
                      <CheckCircle2 className="w-8 h-8" />
                    ) : (
                      <AlertOctagon className="w-8 h-8" />
                    )}
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-bold font-mono tracking-wide ${
                        verificationResult.isValid ? 'text-[#22C55E]' : 'text-[#EF4444]'
                      }`}
                    >
                      {verificationResult.isValid ? 'VERIFIED: RECORD MATCHES BLOCKCHAIN SEAL' : 'VERIFICATION FAILED: RECORD INTEGRITY COMPROMISED'}
                    </h3>
                    <p className="text-xs text-[#8D99A8] mt-0.5">
                      {verificationResult.isValid
                        ? 'The stored off-chain record is authentic and unaltered since its block anchor.'
                        : 'Stored record payload does not match the blockchain seal! Avalanche effect triggered.'}
                    </p>
                  </div>
                </div>

                <span
                  className={`font-mono text-xs px-3 py-1 rounded font-bold border ${
                    verificationResult.isValid
                      ? 'bg-[#22C55E]/20 text-[#22C55E] border-[#22C55E]/40'
                      : 'bg-red-500/20 text-red-400 border-red-500/40'
                  }`}
                >
                  {verificationResult.isValid ? 'PASS 256/256' : 'HASH MISMATCH'}
                </span>
              </div>

              {/* Data Breakdown Table */}
              <div className="p-4 rounded-xl bg-[#070B12] border border-[#243041] space-y-2.5 font-mono text-xs">
                <div className="flex justify-between border-b border-[#243041]/60 pb-2">
                  <span className="text-[#8D99A8]">Record ID</span>
                  <span className="text-[#F5F7FA] font-bold">{verificationResult.record.recordId}</span>
                </div>
                <div className="flex justify-between border-b border-[#243041]/60 pb-2">
                  <span className="text-[#8D99A8]">Confirmed HS Code</span>
                  <span className="text-blue-400 font-bold">HS {verificationResult.record.finalCode}</span>
                </div>
                <div className="flex justify-between border-b border-[#243041]/60 pb-2">
                  <span className="text-[#8D99A8]">Decision Maker</span>
                  <span className="text-[#F5F7FA]">{verificationResult.record.brokerName} ({verificationResult.record.brokerLicense})</span>
                </div>
                <div className="flex justify-between border-b border-[#243041]/60 pb-2">
                  <span className="text-[#8D99A8]">Anchor Timestamp</span>
                  <span className="text-[#F5F7FA]">{verificationResult.timestamp}</span>
                </div>
                <div className="flex justify-between border-b border-[#243041]/60 pb-2">
                  <span className="text-[#8D99A8]">Model Version</span>
                  <span className="text-[#F5F7FA]">{verificationResult.record.model.name} {verificationResult.record.model.version}</span>
                </div>
                <div className="flex justify-between border-b border-[#243041]/60 pb-2">
                  <span className="text-[#8D99A8]">Amendment Status</span>
                  <span className="text-cyan-300">
                    {verificationResult.record.amends ? `Amends ${verificationResult.record.amends}` : 'Original Primary Ruling'}
                  </span>
                </div>
                <div className="space-y-1 pt-1">
                  <span className="text-[#8D99A8] block">On-Chain Anchor Hash:</span>
                  <div className="p-2 rounded bg-[#121A26] text-blue-300 break-all text-[11px]">
                    {verificationResult.onChainHash}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <Link
                  href={`/records/${verificationResult.record.recordId}`}
                  className="px-4 py-2 rounded-lg bg-[#121A26] hover:bg-[#1A2535] text-[#F5F7FA] border border-[#243041] text-xs font-medium transition-colors"
                >
                  View Full Record & Tamper Demo
                </Link>
                <Link
                  href={`/audit-packs?recordId=${verificationResult.record.recordId}`}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-colors"
                >
                  Generate Audit Pack
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
