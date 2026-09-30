'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { HashComparison } from '@/components/HashComparison';
import { TamperDemoControl } from '@/components/TamperDemoControl';
import { useApp } from '@/context/AppContext';
import { 
  Database, 
  ArrowLeft, 
  FileCheck2, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  Scale, 
  Clock, 
  Cpu, 
  FileEdit, 
  History, 
  ExternalLink,
  Layers,
  Copy,
  Check,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import { truncateHash } from '@/lib/crypto';

export default function RecordDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { getRecord, amendRecord, addToast } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const record = getRecord(resolvedParams.id);

  // Amendment modal state
  const [isAmendModalOpen, setIsAmendModalOpen] = useState(false);
  const [amendCode, setAmendCode] = useState('');
  const [amendDescription, setAmendDescription] = useState('');
  const [amendReason, setAmendReason] = useState('');
  const [isSubmittingAmend, setIsSubmittingAmend] = useState(false);

  if (!record) {
    return (
      <div className="flex min-h-screen bg-[#070B12] text-[#F5F7FA]">
        <Sidebar mobileOpen={mobileMenuOpen} onMobileClose={() => setMobileMenuOpen(false)} />
        <div className="flex-1 p-8 text-center space-y-4">
          <div className="text-xl font-bold">Record Not Found</div>
          <p className="text-xs text-[#8D99A8]">Record {resolvedParams.id} does not exist in local ledger.</p>
          <Link href="/records" className="text-xs text-blue-400 underline">
            Back to Records
          </Link>
        </div>
      </div>
    );
  }

  const handleAmendSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amendCode || !amendReason) {
      addToast('error', 'Please provide revised HS code and legal justification.');
      return;
    }
    setIsSubmittingAmend(true);
    await amendRecord(record.recordId, amendCode, amendDescription || 'Amended Classification', amendReason);
    setIsSubmittingAmend(false);
    setIsAmendModalOpen(false);
  };

  const isVerified = record.status === 'VERIFIED' && !record.isTampered;

  return (
    <div className="flex min-h-screen bg-[#070B12] text-[#F5F7FA]">
      <Sidebar 
        mobileOpen={mobileMenuOpen} 
        onMobileClose={() => setMobileMenuOpen(false)} 
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar 
          title={`Record ${record.recordId}`} 
          subtitle="Cryptographically sealed canonical tariff decision dossier" 
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Back link & Top CTAs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Link
              href="/records"
              className="inline-flex items-center gap-1.5 text-xs text-[#8D99A8] hover:text-[#F5F7FA] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all records</span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAmendCode(record.finalCode);
                  setAmendDescription(record.finalCodeDescription);
                  setIsAmendModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#0D131D] hover:bg-[#121A26] border border-[#243041] text-xs font-medium text-[#F5F7FA] flex items-center gap-1.5 transition-colors"
              >
                <FileEdit className="w-3.5 h-3.5 text-cyan-400" />
                <span>Amend Decision</span>
              </button>

              <Link
                href={`/audit-packs?recordId=${record.recordId}`}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Generate Audit Pack</span>
              </Link>
            </div>
          </div>

          {/* Record Header Card */}
          <div className="rounded-xl bg-[#0D131D] border border-[#243041] p-6 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#243041]">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xl md:text-2xl font-bold text-[#F5F7FA]">
                    {record.recordId}
                  </span>

                  {isVerified ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      🟢 VERIFIED
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40 animate-pulse">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      ✕ INTEGRITY CHECK FAILED
                    </span>
                  )}

                  {record.amends && (
                    <span className="text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2 py-0.5 rounded">
                      Amends {record.amends}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#8D99A8] font-mono">
                  Created {new Date(record.createdAt).toUTCString()} • Broker: {record.brokerName} ({record.brokerLicense})
                </p>
              </div>

              {/* Final Code Pill */}
              <div className="p-3 rounded-lg bg-[#070B12] border border-[#243041] text-right font-mono">
                <span className="text-[10px] text-[#8D99A8] uppercase tracking-wider block">
                  Final Confirmed Code
                </span>
                <span className="text-xl font-bold text-blue-400">
                  HS {record.finalCode}
                </span>
                <div className="text-[10px] text-[#22C55E] mt-0.5">
                  Confidence: {(record.confidence * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Quick Metadata Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono text-[#8D99A8]">
              <div>
                <span className="text-[#566474] block text-[10px]">Model & Version</span>
                <span className="text-[#F5F7FA]">{record.model.name} ({record.model.version})</span>
              </div>
              <div>
                <span className="text-[#566474] block text-[10px]">Calibration Method</span>
                <span className="text-[#F5F7FA] truncate block">{record.model.calibration}</span>
              </div>
              <div>
                <span className="text-[#566474] block text-[10px]">Tariff Schedule</span>
                <span className="text-[#F5F7FA] truncate block">{record.tariffSchedule}</span>
              </div>
              <div>
                <span className="text-[#566474] block text-[10px]">Signer Wallet</span>
                <span className="text-cyan-300">{truncateHash(record.brokerId, 8, 4)}</span>
              </div>
            </div>
          </div>

          {/* CRITICAL HACKATHON DEMO: Tamper Demo Control */}
          <TamperDemoControl record={record} />

          {/* Cryptographic Verification Section */}
          <HashComparison
            localHash={record.recordHash}
            onChainHash={record.onChainHash}
            isTampered={record.isTampered}
            tamperMessage={record.tamperMessage}
          />

          {/* Detailed Content Grid: Product, Reasoning, Candidates */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 cols: Product Description & Broker Reasoning */}
            <div className="lg:col-span-7 space-y-6">
              {/* Product Description */}
              <div className="rounded-xl bg-[#0D131D] border border-[#243041] p-5 space-y-3">
                <h3 className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-400" />
                  Product Description
                </h3>
                <p className={`text-sm leading-relaxed p-3.5 rounded-lg border ${
                  record.isTampered
                    ? 'bg-red-950/20 border-red-500/40 text-red-200'
                    : 'bg-[#070B12] border-[#243041] text-[#F5F7FA]'
                }`}>
                  {record.productDescription}
                </p>

                {/* Structured Fields */}
                {record.structuredFields && (
                  <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                    <div className="p-2.5 rounded bg-[#070B12] border border-[#243041]/60">
                      <span className="text-[#8D99A8] block text-[10px] font-mono uppercase">Material</span>
                      <span className="text-[#F5F7FA]">{record.structuredFields.material || 'N/A'}</span>
                    </div>
                    <div className="p-2.5 rounded bg-[#070B12] border border-[#243041]/60">
                      <span className="text-[#8D99A8] block text-[10px] font-mono uppercase">Intended Use</span>
                      <span className="text-[#F5F7FA]">{record.structuredFields.intendedUse || 'N/A'}</span>
                    </div>
                    <div className="p-2.5 rounded bg-[#070B12] border border-[#243041]/60">
                      <span className="text-[#8D99A8] block text-[10px] font-mono uppercase">Country of Origin</span>
                      <span className="text-[#F5F7FA]">{record.structuredFields.countryOfOrigin || 'N/A'}</span>
                    </div>
                    <div className="p-2.5 rounded bg-[#070B12] border border-[#243041]/60">
                      <span className="text-[#8D99A8] block text-[10px] font-mono uppercase">Brand</span>
                      <span className="text-[#F5F7FA]">{record.structuredFields.brand || 'N/A'}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Broker Legal Reasoning */}
              <div className="rounded-xl bg-[#0D131D] border border-[#243041] p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#243041]">
                  <h3 className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2">
                    <Scale className="w-4 h-4 text-cyan-400" />
                    Broker Reasoning & Legal Basis
                  </h3>
                  <span className="text-[10px] font-mono text-[#22C55E] uppercase">
                    Human Authority
                  </span>
                </div>
                <div className="p-3.5 rounded-lg bg-[#070B12] border border-[#243041] text-xs text-[#F5F7FA] leading-relaxed">
                  {record.reasoning}
                </div>
                <p className="text-[11px] text-[#8D99A8]">
                  Signed by {record.brokerName} using licensed broker credentials.
                </p>
              </div>

              {/* Amendment History Timeline (if amended) */}
              {record.amendmentHistory && record.amendmentHistory.length > 0 && (
                <div className="rounded-xl bg-[#0D131D] border border-cyan-500/30 p-5 space-y-3">
                  <h3 className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2">
                    <History className="w-4 h-4 text-cyan-400" />
                    Transparent Amendment History
                  </h3>
                  <p className="text-xs text-[#8D99A8]">
                    Prior classifications are never overwritten or erased; each version forms a cryptographically linked tree.
                  </p>

                  <div className="space-y-3 pt-2">
                    {record.amendmentHistory.map((amend) => (
                      <div key={amend.version} className="p-3 rounded-lg bg-[#070B12] border border-[#243041] text-xs font-mono space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-cyan-300 font-bold">Version #{amend.version}</span>
                          <span className="text-[#8D99A8] text-[10px]">{new Date(amend.amendedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="text-[#F5F7FA]">
                          Reclassified to: <span className="font-bold text-blue-400">HS {amend.newCode}</span>
                        </div>
                        <p className="text-[11px] text-[#8D99A8] font-sans">
                          Reason: {amend.reason}
                        </p>
                        <div className="text-[10px] text-[#566474] flex justify-between pt-1 border-t border-[#243041]/40">
                          <span>Signer: {amend.amendedBy}</span>
                          <span className="text-blue-400">{truncateHash(amend.newHash, 6, 4)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right 5 cols: AI Candidates & Fact questions evaluated */}
            <div className="lg:col-span-5 space-y-6">
              {/* Evaluated Shortlist */}
              <div className="rounded-xl bg-[#0D131D] border border-[#243041] p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#243041]">
                  <h3 className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-blue-400" />
                    AI Candidate Shortlist
                  </h3>
                  <span className="text-[10px] font-mono text-[#8D99A8]">
                    {record.candidates.length} Scored
                  </span>
                </div>

                <div className="space-y-2.5">
                  {record.candidates.slice(0, 5).map((cand) => (
                    <div
                      key={cand.code}
                      className={`p-3 rounded-lg border text-xs space-y-1.5 ${
                        cand.code === record.finalCode
                          ? 'bg-[#121A26] border-blue-500/50'
                          : 'bg-[#070B12] border-[#243041]'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono">
                        <span className="font-bold text-[#F5F7FA]">
                          HS {cand.code}
                        </span>
                        <span className="text-blue-300 font-semibold">
                          {(cand.probability * 100).toFixed(1)}%
                        </span>
                      </div>
                      <p className="text-[11px] text-[#8D99A8] line-clamp-1">
                        {cand.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Classification Facts */}
              {record.facts && record.facts.length > 0 && (
                <div className="rounded-xl bg-[#0D131D] border border-[#243041] p-5 space-y-3">
                  <h3 className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-cyan-400" />
                    Discriminator Facts
                  </h3>
                  <div className="space-y-2">
                    {record.facts.map((fact) => (
                      <div key={fact.id} className="p-2.5 rounded bg-[#070B12] border border-[#243041] text-xs">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[#F5F7FA] font-medium leading-tight">
                            {fact.question}
                          </span>
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#22C55E]/15 text-[#22C55E]">
                            {fact.answer.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Amendment Modal */}
      {isAmendModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#0D131D] border border-[#243041] rounded-2xl max-w-lg w-full shadow-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-[#F5F7FA] flex items-center gap-2">
              <FileEdit className="w-5 h-5 text-cyan-400" />
              Amend Classification Record {record.recordId}
            </h3>
            <p className="text-xs text-[#8D99A8]">
              Amendments create an authenticated new version linked to the original hash. The original seal remains permanently preserved.
            </p>

            <form onSubmit={handleAmendSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-mono text-[#8D99A8] uppercase block mb-1">
                  Revised HS Tariff Code
                </label>
                <input
                  type="text"
                  value={amendCode}
                  onChange={(e) => setAmendCode(e.target.value)}
                  placeholder="e.g. 2103.90.90"
                  className="w-full px-3 py-2 rounded bg-[#070B12] border border-[#243041] text-[#F5F7FA] font-mono focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-[#8D99A8] uppercase block mb-1">
                  Reason for Amendment (Statutory / Legal Basis)
                </label>
                <textarea
                  value={amendReason}
                  onChange={(e) => setAmendReason(e.target.value)}
                  rows={4}
                  placeholder="Explain why this amendment is necessary (e.g. CBP Ruling NY N301294, newly submitted lab assay, client re-specification)..."
                  className="w-full p-3 rounded bg-[#070B12] border border-[#243041] text-[#F5F7FA] focus:outline-none focus:border-blue-500 font-sans"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#243041]">
                <button
                  type="button"
                  onClick={() => setIsAmendModalOpen(false)}
                  className="px-4 py-2 rounded text-xs text-[#8D99A8] hover:text-[#F5F7FA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingAmend}
                  className="px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md"
                >
                  {isSubmittingAmend ? 'Recording Amendment...' : 'Sign & Record Amendment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
