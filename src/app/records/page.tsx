'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { useApp } from '@/context/AppContext';
import { 
  Database, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon, 
  ShieldCheck, 
  ChevronRight, 
  Plus,
  ExternalLink,
  Flame,
  FileCheck2,
  Loader2
} from 'lucide-react';
import { truncateHash } from '@/lib/crypto';

function RecordsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { records } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'VERIFIED' | 'NEEDS_REVIEW' | 'TAMPERED' | 'AMENDED'>('ALL');

  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.productDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.recordId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.finalCode.includes(searchQuery) ||
      record.brokerName.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === 'ALL') return true;
    return record.status === statusFilter;
  });

  return (
    <div className="flex min-h-screen bg-[#070B12] text-[#F5F7FA]">
      <Sidebar 
        mobileOpen={mobileMenuOpen} 
        onMobileClose={() => setMobileMenuOpen(false)} 
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar 
          title="Classification Records" 
          subtitle="Immutable customs decision ledger with on-chain cryptographic anchors" 
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#243041]">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#F5F7FA] tracking-tight flex items-center gap-2">
                <Database className="w-6 h-6 text-blue-400" />
                <span>Anchored Decision Records</span>
              </h2>
              <p className="text-xs text-[#8D99A8] mt-1">
                Total {records.length} canonical records stored off-chain with SHA-256 hashes on Polygon Amoy
              </p>
            </div>

            <Link
              href="/classify"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>+ New Classification</span>
            </Link>
          </div>

          {/* Search & Filter Bar */}
          <div className="rounded-xl bg-[#0D131D] border border-[#243041] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8D99A8]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by product, HS code, or ID..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#070B12] text-[#F5F7FA] placeholder-[#8D99A8]/50 border border-[#243041] rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Status Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
              {(['ALL', 'VERIFIED', 'NEEDS_REVIEW', 'TAMPERED', 'AMENDED'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3 py-1 rounded-md text-xs font-mono transition-colors shrink-0 ${
                    statusFilter === tab
                      ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 font-semibold'
                      : 'text-[#8D99A8] hover:text-[#F5F7FA] hover:bg-[#121A26]'
                  }`}
                >
                  {tab === 'ALL' ? 'All Records' : tab.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Records Table */}
          <div className="rounded-xl bg-[#0D131D] border border-[#243041] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#243041] bg-[#121A26]/50 text-[#8D99A8] font-mono uppercase text-[10px]">
                    <th className="py-3 px-4">Record ID</th>
                    <th className="py-3 px-4">Product Description</th>
                    <th className="py-3 px-4">Tariff Code</th>
                    <th className="py-3 px-4">Confidence</th>
                    <th className="py-3 px-4">Integrity Status</th>
                    <th className="py-3 px-4">Blockchain Tx</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#243041]/40 font-mono">
                  {filteredRecords.map(record => {
                    const isVerified = record.status === 'VERIFIED';
                    const isReview = record.status === 'NEEDS_REVIEW';
                    const isTampered = record.status === 'TAMPERED';
                    const isAmended = record.status === 'AMENDED';

                    return (
                      <tr
                        key={record.recordId}
                        className={`hover:bg-[#121A26]/80 transition-colors group ${
                          isTampered ? 'bg-red-950/10' : ''
                        }`}
                      >
                        <td className="py-3.5 px-4 font-semibold text-[#F5F7FA]">
                          <Link 
                            href={`/records/${record.recordId}`}
                            className="hover:text-blue-400 flex items-center gap-1.5 transition-colors"
                          >
                            <span>{record.recordId}</span>
                            <ChevronRight className="w-3 h-3 text-[#8D99A8] group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        </td>

                        <td className="py-3.5 px-4 font-sans text-xs max-w-xs">
                          <div className="text-[#F5F7FA] line-clamp-1 font-medium">
                            {record.productDescription}
                          </div>
                          <div className="text-[10px] text-[#8D99A8] mt-0.5 truncate">
                            {record.structuredFields?.material || 'Standard goods'}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="font-bold text-blue-300 bg-[#070B12] px-2 py-0.5 rounded border border-[#243041]">
                            HS {record.finalCode}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-[#F5F7FA]">
                          {(record.confidence * 100).toFixed(1)}%
                        </td>

                        <td className="py-3.5 px-4">
                          {isVerified && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/30 px-2 py-0.5 rounded">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Verified Seal</span>
                            </span>
                          )}
                          {isReview && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/30 px-2 py-0.5 rounded">
                              <AlertTriangle className="w-3 h-3" />
                              <span>Needs Review</span>
                            </span>
                          )}
                          {isTampered && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#EF4444] bg-[#EF4444]/20 border border-[#EF4444]/50 px-2 py-0.5 rounded animate-pulse">
                              <AlertOctagon className="w-3 h-3" />
                              <span>Tampered</span>
                            </span>
                          )}
                          {isAmended && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded">
                              <span>Amended (v{record.amendmentHistory?.length || 2})</span>
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-[#8D99A8] text-[11px]">
                          {record.onChainTx ? (
                            <span className="truncate hover:text-blue-300">
                              {truncateHash(record.onChainTx.txHash, 6, 4)}
                            </span>
                          ) : (
                            <span className="text-[#566474]">Off-chain draft</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/records/${record.recordId}`}
                              className="px-2.5 py-1 rounded bg-[#070B12] hover:bg-[#121A26] border border-[#243041] text-[#F5F7FA] text-xs font-sans transition-colors"
                            >
                              Inspect
                            </Link>
                            <Link
                              href={`/audit-packs?recordId=${record.recordId}`}
                              className="p-1 rounded bg-[#070B12] hover:bg-blue-600/20 text-[#8D99A8] hover:text-blue-300 border border-[#243041] transition-colors"
                              title="Generate Audit Pack"
                            >
                              <FileCheck2 className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function RecordsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-[#8D99A8] flex items-center justify-center gap-2"><Loader2 className="w-5 h-5 animate-spin text-blue-400" /> Loading Records Ledger...</div>}>
      <RecordsContent />
    </Suspense>
  );
}
