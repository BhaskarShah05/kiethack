'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { MetricCard } from '@/components/MetricCard';
import { useApp } from '@/context/AppContext';
import { 
  Plus, 
  Search, 
  FileCheck2, 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon, 
  ShieldCheck, 
  Clock, 
  ArrowUpRight, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Cpu,
  Layers
} from 'lucide-react';
import { truncateHash } from '@/lib/crypto';

export default function DashboardPage() {
  const router = useRouter();
  const { records, events, broker } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Computed metrics
  const totalDecisions = records.length + 44; // Total activity
  const avgConfidence = (
    (records.reduce((acc, r) => acc + (r.confidence || 0.8), 0) / (records.length || 1)) * 100
  ).toFixed(1);
  const needsReviewCount = records.filter(r => r.status === 'NEEDS_REVIEW').length + 5;
  const sealedCount = records.filter(r => r.status === 'VERIFIED' || r.status === 'AMENDED').length + 39;

  return (
    <div className="flex min-h-screen bg-[#070B12] text-[#F5F7FA]">
      {/* Sidebar */}
      <Sidebar 
        mobileOpen={mobileMenuOpen} 
        onMobileClose={() => setMobileMenuOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar 
          title="Dashboard" 
          subtitle="Real-time customs tariff decisions and blockchain anchoring overview" 
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Hero Section */}
          <div className="rounded-2xl bg-gradient-to-r from-[#0D131D] via-[#121A26] to-[#0D131D] border border-[#243041] p-6 md:p-8 relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-2xl">
              <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400 font-semibold bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
                Classification Intelligence
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#F5F7FA] tracking-tight mt-3">
                Make defensible tariff decisions. Seal them. Prove them.
              </h2>
              <p className="text-xs md:text-sm text-[#8D99A8] mt-2 leading-relaxed">
                Welcome back, {broker.name}. You are connected to Polygon Amoy with whitelisted broker credentials. Evaluate candidate classifications, review GRI legal rationale, and anchor immutable seals.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/classify"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ New Classification</span>
                </Link>
                <Link
                  href="/records"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#070B12] hover:bg-[#121A26] text-[#F5F7FA] border border-[#243041] text-xs font-medium transition-colors"
                >
                  <Search className="w-3.5 h-3.5 text-[#8D99A8]" />
                  <span>Search Records</span>
                </Link>
                <Link
                  href="/verify"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#070B12] hover:bg-[#121A26] text-[#8D99A8] hover:text-[#F5F7FA] border border-[#243041] text-xs font-medium transition-colors ml-auto hidden sm:inline-flex"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Public Verifier</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 4 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              label="Decisions This Week"
              value="48"
              subtext="12 pending senior review"
              icon={Layers}
              variant="default"
            />
            <MetricCard
              label="Average Confidence"
              value={`${avgConfidence}%`}
              subtext="Calibrated with temperature scaling"
              icon={Cpu}
              variant="info"
            />
            <MetricCard
              label="Needs Senior Review"
              value={needsReviewCount}
              subtext="Below 75.0% brokerage threshold"
              icon={AlertTriangle}
              variant="warning"
            />
            <MetricCard
              label="Sealed Records"
              value={sealedCount}
              subtext="100% anchored to Polygon Amoy"
              icon={ShieldCheck}
              variant="success"
            />
          </div>

          {/* Main 2-Column: Recent Classifications & Activity Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Classifications Table (2 cols) */}
            <div className="lg:col-span-2 rounded-xl bg-[#0D131D] border border-[#243041] p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#243041]">
                <div>
                  <h3 className="text-sm font-semibold text-[#F5F7FA]">
                    Recent Classifications
                  </h3>
                  <p className="text-xs text-[#8D99A8]">
                    Last customs classification decisions across active brokerage manifests
                  </p>
                </div>
                <Link
                  href="/records"
                  className="text-xs font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                >
                  <span>View all</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#243041]/60 text-[#8D99A8] font-mono uppercase text-[10px]">
                      <th className="pb-2.5 font-medium">Product / ID</th>
                      <th className="pb-2.5 font-medium">Final HS Code</th>
                      <th className="pb-2.5 font-medium">Confidence</th>
                      <th className="pb-2.5 font-medium">Status</th>
                      <th className="pb-2.5 font-medium">Broker</th>
                      <th className="pb-2.5 font-medium text-right">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#243041]/40 font-mono">
                    {records.slice(0, 5).map((record) => {
                      const isVerified = record.status === 'VERIFIED';
                      const isReview = record.status === 'NEEDS_REVIEW';
                      const isTampered = record.status === 'TAMPERED';
                      const isAmended = record.status === 'AMENDED';

                      return (
                        <tr
                          key={record.recordId}
                          onClick={() => router.push(`/records/${record.recordId}`)}
                          className="hover:bg-[#121A26]/80 cursor-pointer transition-colors group"
                        >
                          <td className="py-3 pr-3 font-sans">
                            <div className="font-medium text-[#F5F7FA] text-xs line-clamp-1 group-hover:text-blue-400 transition-colors">
                              {record.productDescription}
                            </div>
                            <span className="text-[10px] text-[#8D99A8] font-mono">
                              {record.recordId}
                            </span>
                          </td>

                          <td className="py-3 px-2">
                            <span className="font-bold text-blue-300 bg-[#121A26] px-2 py-0.5 rounded border border-[#243041]">
                              {record.finalCode}
                            </span>
                          </td>

                          <td className="py-3 px-2 text-[#F5F7FA]">
                            {(record.confidence * 100).toFixed(1)}%
                          </td>

                          <td className="py-3 px-2">
                            {isVerified && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20 px-2 py-0.5 rounded">
                                Verified
                              </span>
                            )}
                            {isReview && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/20 px-2 py-0.5 rounded">
                                Needs Review
                              </span>
                            )}
                            {isTampered && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/30 px-2 py-0.5 rounded animate-pulse">
                                Tampered
                              </span>
                            )}
                            {isAmended && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                                Amended
                              </span>
                            )}
                          </td>

                          <td className="py-3 px-2 text-[#8D99A8] font-sans text-xs">
                            {record.brokerName}
                          </td>

                          <td className="py-3 pl-2 text-right">
                            {isTampered ? (
                              <span className="text-[10px] font-bold text-red-400">
                                ✕ FAIL
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-[#22C55E] flex items-center justify-end gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>PASS</span>
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Activity Timeline (1 col) */}
            <div className="rounded-xl bg-[#0D131D] border border-[#243041] p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#243041]">
                <div>
                  <h3 className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    Activity Timeline
                  </h3>
                  <p className="text-xs text-[#8D99A8]">Recent ledger events & smart contract transactions</p>
                </div>
              </div>

              <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#243041]/60">
                {events.map((event) => (
                  <div key={event.id} className="relative flex items-start gap-3 pl-1">
                    <div className="w-6 h-6 rounded-full bg-[#121A26] border border-[#243041] flex items-center justify-center shrink-0 z-10">
                      <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    </div>
                    <div className="flex-1 min-w-0 bg-[#070B12] p-2.5 rounded-lg border border-[#243041]/70 text-xs">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="font-semibold text-[#F5F7FA] truncate">{event.title}</span>
                        <span className="text-[10px] text-[#8D99A8] font-mono shrink-0">{event.timestamp}</span>
                      </div>
                      <p className="text-[#8D99A8] text-[11px] leading-tight">
                        {event.description}
                      </p>
                      <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-[#566474]">
                        <span>{event.actor}</span>
                        {event.badge && (
                          <span className="text-blue-400">{event.badge}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
