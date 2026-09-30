'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { useApp } from '@/context/AppContext';
import { 
  BookmarkCheck, 
  Search, 
  Scale, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight, 
  Copy, 
  Check, 
  Sparkles,
  Info
} from 'lucide-react';

export default function PrecedentsPage() {
  const router = useRouter();
  const { precedents, addToast } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPrecedents = precedents.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.productTitle.toLowerCase().includes(q) ||
      p.productDescription.toLowerCase().includes(q) ||
      p.finalCode.includes(q) ||
      p.brokerReasoning.toLowerCase().includes(q) ||
      p.ruleCitation.toLowerCase().includes(q)
    );
  });

  const handleUsePrecedent = (precedent: typeof precedents[0]) => {
    addToast('info', `Precedent reasoning copied. Navigating to Classification Studio...`);
    const params = new URLSearchParams({
      description: precedent.productTitle,
      code: precedent.finalCode,
      reasoning: `Precedent reuse (${precedent.recordId} • ${precedent.ruleCitation}): ${precedent.brokerReasoning}`,
    });
    router.push(`/classify?${params.toString()}`);
  };

  const copyReasoning = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addToast('success', 'Reasoning copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex min-h-screen bg-[#070B12] text-[#F5F7FA]">
      <Sidebar 
        mobileOpen={mobileMenuOpen} 
        onMobileClose={() => setMobileMenuOpen(false)} 
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar 
          title="Precedent Intelligence" 
          subtitle="Find similar classifications and reuse defensible reasoning" 
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#243041]">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#F5F7FA] tracking-tight flex items-center gap-2">
                <BookmarkCheck className="w-6 h-6 text-blue-400" />
                <span>Precedent Intelligence Library</span>
              </h2>
              <p className="text-xs text-[#8D99A8] mt-1">
                Indexed repository of verified customs decisions with vector similarity ranking
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono bg-[#121A26] px-3 py-1.5 rounded-lg border border-[#243041] text-[#8D99A8]">
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              <span>Precedents inform consistency; broker makes final decision.</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="rounded-xl bg-[#0D131D] border border-[#243041] p-5 shadow-sm space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8D99A8]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by product description (e.g. 'earbuds', 'headset', 'power bank', 'helmet')..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#070B12] text-[#F5F7FA] placeholder-[#8D99A8]/50 border border-[#243041] rounded-lg focus:outline-none focus:border-blue-500 font-sans"
              />
            </div>

            {/* Quick Filter chips */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#8D99A8] text-[11px] font-mono uppercase mr-1">Quick Filters:</span>
              {['Wireless Earbuds', 'Audio Headsets', 'Power Banks', 'Protective Gear', 'Chapter 85'].map(chip => (
                <button
                  key={chip}
                  onClick={() => setSearchQuery(chip === 'Chapter 85' ? '85' : chip)}
                  className="px-2.5 py-1 rounded bg-[#121A26] hover:bg-[#1A2535] text-[#8D99A8] hover:text-[#F5F7FA] border border-[#243041] text-[11px] font-mono transition-colors"
                >
                  {chip}
                </button>
              ))}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-blue-400 hover:underline ml-2"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>

          {/* Precedent Cards List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-[#8D99A8] font-mono px-1">
              <span>Found {filteredPrecedents.length} matching precedent cases</span>
              <span>Sorted by Semantic Relevance</span>
            </div>

            <div className="space-y-4">
              {filteredPrecedents.map((item) => {
                const simPercent = Math.round(item.similarity * 100);

                return (
                  <div
                    key={item.id}
                    className="rounded-xl bg-[#0D131D] border border-[#243041] hover:border-blue-500/40 p-5 shadow-sm transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="font-mono text-sm font-bold text-blue-400 bg-[#070B12] px-2.5 py-0.5 rounded border border-[#243041]">
                            HS {item.finalCode}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 px-2 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3" />
                            {item.status}
                          </span>
                          <span className="text-[10px] font-mono text-[#8D99A8]">
                            Record {item.recordId} • {item.date}
                          </span>
                        </div>

                        <h3 className="text-sm md:text-base font-semibold text-[#F5F7FA]">
                          {item.productTitle}
                        </h3>
                        <p className="text-xs text-[#8D99A8] mt-0.5">
                          {item.productDescription}
                        </p>
                      </div>

                      {/* Similarity Chip */}
                      <div className="text-right shrink-0">
                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{simPercent}% Similar</span>
                        </div>
                        <div className="text-[10px] text-[#8D99A8] mt-1 font-mono">
                          Confidence: {(item.confidence * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>

                    {/* Reasoning Quotation Box */}
                    <div className="p-3.5 rounded-lg bg-[#070B12] border border-[#243041] space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-[11px] text-[#8D99A8]">
                        <span className="flex items-center gap-1.5 font-medium text-cyan-300 font-mono">
                          <Scale className="w-3.5 h-3.5" />
                          Tested Broker Rationale:
                        </span>
                        <button
                          onClick={() => copyReasoning(item.id, item.brokerReasoning)}
                          className="text-[#8D99A8] hover:text-[#F5F7FA] flex items-center gap-1 transition-colors"
                        >
                          {copiedId === item.id ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                          <span>Copy Rationale</span>
                        </button>
                      </div>
                      <p className="text-[#F5F7FA] leading-relaxed italic">
                        &quot;{item.brokerReasoning}&quot;
                      </p>
                      <div className="pt-1.5 border-t border-[#243041]/50 flex items-center justify-between text-[10px] font-mono text-[#566474]">
                        <span>Author: {item.brokerName}</span>
                        <span>Citation: {item.ruleCitation}</span>
                      </div>
                    </div>

                    {/* Bottom Action CTAs */}
                    <div className="flex items-center justify-end gap-3 pt-1">
                      <Link
                        href={`/records/${item.recordId}`}
                        className="px-3 py-1.5 rounded-lg bg-[#121A26] hover:bg-[#1A2535] text-[#F5F7FA] border border-[#243041] text-xs font-medium transition-colors"
                      >
                        View Record
                      </Link>

                      <button
                        onClick={() => handleUsePrecedent(item)}
                        className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <span>Use as Precedent</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
