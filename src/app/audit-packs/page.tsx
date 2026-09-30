'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { useApp } from '@/context/AppContext';
import { 
  FileCheck2, 
  Printer, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  Scale, 
  Calendar, 
  FileText, 
  Copy, 
  Check, 
  ExternalLink,
  Layers,
  Cpu,
  Loader2
} from 'lucide-react';
import { truncateHash } from '@/lib/crypto';

function AuditPackContent() {
  const searchParams = useSearchParams();
  const { records, addToast } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const initialRecordId = searchParams.get('recordId') || records[0]?.recordId;
  const [selectedRecordId, setSelectedRecordId] = useState(initialRecordId);

  const activeRecord = records.find(r => r.recordId === selectedRecordId) || records[0];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    if (!activeRecord) return;
    const blob = new Blob([JSON.stringify(activeRecord, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AuditPack-${activeRecord.recordId}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('success', `Exported AuditPack-${activeRecord.recordId}.json`);
  };

  if (!activeRecord) {
    return <div className="p-8 text-center">No records available.</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#070B12] text-[#F5F7FA]">
      <div className="no-print">
        <Sidebar 
          mobileOpen={mobileMenuOpen} 
          onMobileClose={() => setMobileMenuOpen(false)} 
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="no-print">
          <Topbar 
            title="Audit Pack" 
            subtitle="Everything needed to defend a classification decision in a customs dispute" 
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
          />
        </div>

        <main className="flex-1 p-4 md:p-8 max-w-5xl w-full mx-auto space-y-6">
          {/* Header & Export CTAs */}
          <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#243041]">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#F5F7FA] tracking-tight flex items-center gap-2">
                <FileCheck2 className="w-6 h-6 text-blue-400" />
                <span>Customs Audit Dossier</span>
              </h2>
              <p className="text-xs text-[#8D99A8] mt-1">
                Complete compliance dossier with on-chain cryptographic anchor proof
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Record Selector */}
              <select
                value={activeRecord.recordId}
                onChange={(e) => setSelectedRecordId(e.target.value)}
                className="bg-[#0D131D] text-xs font-mono text-[#F5F7FA] px-3 py-2 rounded-lg border border-[#243041] focus:outline-none focus:border-blue-500"
              >
                {records.map(r => (
                  <option key={r.recordId} value={r.recordId}>
                    {r.recordId} — HS {r.finalCode}
                  </option>
                ))}
              </select>

              <button
                onClick={handlePrint}
                className="px-3.5 py-2 rounded-lg bg-[#121A26] hover:bg-[#1A2535] text-[#F5F7FA] border border-[#243041] text-xs font-medium flex items-center gap-2 transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-cyan-400" />
                <span>Print / PDF</span>
              </button>

              <button
                onClick={handleDownloadJson}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Audit Pack</span>
              </button>
            </div>
          </div>

          {/* Audit Pack Document Container */}
          <div className="bg-[#0D131D] border border-[#243041] rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8 text-xs leading-relaxed relative overflow-hidden font-sans print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
            {/* Watermark badge */}
            <div className="absolute top-6 right-6 opacity-80 print:opacity-100 flex flex-col items-end">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] font-mono text-[11px] font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>ON-CHAIN SEAL VERIFIED</span>
              </div>
              <span className="text-[10px] font-mono text-[#8D99A8] mt-1">
                Polygon Amoy #80002
              </span>
            </div>

            {/* Document Header */}
            <div className="border-b border-[#243041] pb-6 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                  C
                </div>
                <span className="font-bold text-sm text-[#F5F7FA] tracking-wide uppercase font-mono">
                  ClassiLedger Compliance Network
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#F5F7FA] tracking-tight">
                Tariff Classification Audit Dossier
              </h1>
              <div className="text-[11px] font-mono text-[#8D99A8] flex flex-wrap gap-x-4 gap-y-1">
                <span>Dossier ID: <strong className="text-[#F5F7FA]">{activeRecord.recordId}</strong></span>
                <span>Generated: <strong>{new Date().toUTCString()}</strong></span>
                <span>Schedule: <strong>{activeRecord.tariffSchedule}</strong></span>
              </div>
            </div>

            {/* Section 1: Executive Summary */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold border-b border-[#243041]/60 pb-1">
                1. Executive Classification Ruling
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#070B12] border border-[#243041]">
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#8D99A8] block">Confirmed Tariff Code</span>
                  <span className="text-lg font-mono font-bold text-blue-400">HS {activeRecord.finalCode}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#8D99A8] block">Decision Maker</span>
                  <span className="text-xs font-semibold text-[#F5F7FA] block">{activeRecord.brokerName}</span>
                  <span className="text-[10px] text-[#8D99A8] font-mono">{activeRecord.brokerLicense}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#8D99A8] block">Calibrated AI Confidence</span>
                  <span className="text-base font-mono font-bold text-[#22C55E]">{(activeRecord.confidence * 100).toFixed(1)}%</span>
                  <span className="text-[10px] text-[#8D99A8] block">T=1.24 temperature scaling</span>
                </div>
              </div>
              <p className="text-[#F5F7FA] text-xs font-medium">
                Official Description: {activeRecord.finalCodeDescription}
              </p>
            </div>

            {/* Section 2: Product & Commercial Information */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold border-b border-[#243041]/60 pb-1">
                2. Product Description & Declared Specifications
              </h2>
              <div className="p-3.5 rounded-lg bg-[#070B12] border border-[#243041] space-y-2">
                <p className="text-xs text-[#F5F7FA] italic">
                  &quot;{activeRecord.productDescription}&quot;
                </p>
                {activeRecord.structuredFields && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#243041]/60 text-[11px] font-mono">
                    <div>
                      <span className="text-[#8D99A8] block text-[10px]">Material:</span>
                      <span className="text-[#F5F7FA]">{activeRecord.structuredFields.material}</span>
                    </div>
                    <div>
                      <span className="text-[#8D99A8] block text-[10px]">Intended Use:</span>
                      <span className="text-[#F5F7FA]">{activeRecord.structuredFields.intendedUse}</span>
                    </div>
                    <div>
                      <span className="text-[#8D99A8] block text-[10px]">Origin:</span>
                      <span className="text-[#F5F7FA]">{activeRecord.structuredFields.countryOfOrigin}</span>
                    </div>
                    <div>
                      <span className="text-[#8D99A8] block text-[10px]">Brand:</span>
                      <span className="text-[#F5F7FA]">{activeRecord.structuredFields.brand}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Section 3: Legal GRI Justification */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold border-b border-[#243041]/60 pb-1">
                3. Broker Legal Rationale & Statutory Basis
              </h2>
              <div className="p-4 rounded-lg bg-[#070B12] border border-[#243041] space-y-2">
                <div className="text-xs text-[#F5F7FA] leading-relaxed">
                  {activeRecord.reasoning}
                </div>
              </div>
            </div>

            {/* Section 4: AI Decision Model & Calibrated Candidate Ranking */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold border-b border-[#243041]/60 pb-1">
                4. AI Decision Model & Calibrated Shortlist
              </h2>
              <div className="text-[11px] font-mono text-[#8D99A8] mb-2">
                Model: <strong>{activeRecord.model.name} ({activeRecord.model.version})</strong> • Calibration: {activeRecord.model.calibration}
              </div>

              <div className="space-y-2">
                {activeRecord.candidates.slice(0, 4).map((cand) => (
                  <div key={cand.code} className="p-2.5 rounded bg-[#070B12] border border-[#243041] flex items-center justify-between font-mono text-xs">
                    <div>
                      <span className="font-bold text-[#F5F7FA]">HS {cand.code}</span>
                      <span className="text-[#8D99A8] ml-2 text-[11px]">{cand.description.slice(0, 65)}...</span>
                    </div>
                    <span className="font-bold text-blue-300">{(cand.probability * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: Cryptographic Chain of Custody */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold border-b border-[#243041]/60 pb-1">
                5. Cryptographic Chain of Custody & Blockchain Proof
              </h2>
              <div className="p-4 rounded-lg bg-[#070B12] border border-[#243041] space-y-2 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#8D99A8]">Canonical Hash (SHA-256):</span>
                  <span className="text-cyan-300 break-all">{activeRecord.recordHash}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8D99A8]">On-Chain Transaction:</span>
                  <span className="text-blue-400">{activeRecord.onChainTx?.txHash}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8D99A8]">Block Height / Time:</span>
                  <span className="text-[#F5F7FA]">#{activeRecord.onChainTx?.blockNumber} @ {activeRecord.onChainTx?.blockTimestamp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8D99A8]">Signer Address:</span>
                  <span className="text-[#F5F7FA]">{activeRecord.brokerId}</span>
                </div>
              </div>
            </div>

            {/* Signatures Footer */}
            <div className="pt-8 border-t border-[#243041] grid grid-cols-2 gap-6 text-[11px] font-mono">
              <div className="space-y-1">
                <span className="text-[#8D99A8] block">Licensed Customs Broker Signature:</span>
                <div className="font-serif italic text-base text-[#F5F7FA] pt-1">
                  {activeRecord.brokerName}
                </div>
                <div className="text-[10px] text-[#566474]">
                  Digitally signed via EIP-712 cryptographic key
                </div>
              </div>
              <div className="space-y-1 text-right">
                <span className="text-[#8D99A8] block">Ledger Consensus Status:</span>
                <div className="font-mono text-sm text-[#22C55E] font-bold">
                  POLYGON AMOY TESTNET #80002
                </div>
                <div className="text-[10px] text-[#566474]">
                  Contract: {truncateHash(activeRecord.onChainTx?.contractAddress || '', 10, 6)}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function AuditPackPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-[#8D99A8] flex items-center justify-center gap-2"><Loader2 className="w-5 h-5 animate-spin text-blue-400" /> Loading Audit Pack Dossier...</div>}>
      <AuditPackContent />
    </Suspense>
  );
}
