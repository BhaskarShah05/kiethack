'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ArrowRight, 
  Cpu, 
  Lock, 
  Scale, 
  FileCheck2, 
  SearchCode, 
  Database, 
  Layers, 
  CheckCircle2, 
  History, 
  Sparkles,
  ChevronRight,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';

export default function LandingPage() {
  const workflowSteps = [
    { num: '01', title: 'Describe', desc: 'Enter product invoice text or technical spec sheet' },
    { num: '02', title: 'Suggest', desc: 'Laya decision model shortlists & calibrates candidate HS codes' },
    { num: '03', title: 'Review', desc: 'Inspect fact discriminators and check confidence thresholds' },
    { num: '04', title: 'Decide', desc: 'Licensed broker evaluates GRI rules and records custom reasoning' },
    { num: '05', title: 'Seal', desc: 'Canonical hash is cryptographically anchored on Polygon Amoy' },
    { num: '06', title: 'Verify', desc: 'Independently audit record integrity years later with 0-bit trust' },
  ];

  const problemCards = [
    {
      title: 'Slow, Inconsistent Classification',
      desc: 'Brokers parse vague invoice descriptions across 5,000+ tariff subheadings under tight port deadlines, causing team variance.',
      impact: 'Frequent duty calculation errors & customs border holds'
    },
    {
      title: 'Lost Broker Reasoning',
      desc: 'Critical GRI legal reasoning stays trapped in personal notes, Outlook threads, or discarded scratchpads.',
      impact: 'Impossible to reconstruct or defend decisions in retrospective audits'
    },
    {
      title: 'Vulnerable Off-Chain Records',
      desc: 'Internal brokerage spreadsheets and ERP records can be altered, disputed, or backdated after customs penalties hit.',
      impact: 'Zero independent proof of authentic classification timestamp'
    },
  ];

  return (
    <div className="min-h-screen bg-[#070B12] text-[#F5F7FA] selection:bg-blue-600 selection:text-white flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#070B12]/80 backdrop-blur-md border-b border-[#243041]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 p-0.5 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-[#070B12] rounded-[6px] flex items-center justify-center">
                <Layers className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <div>
              <span className="font-semibold text-base text-[#F5F7FA] tracking-tight">ClassiLedger</span>
              <span className="text-[10px] ml-1.5 font-mono uppercase bg-blue-500/15 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded">
                Testnet Active
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-xs text-[#8D99A8] font-medium">
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#trust-model" className="hover:text-white transition-colors">Trust Model</a>
            <a href="#precedents" className="hover:text-white transition-colors">Precedents</a>
            <Link href="/verify" className="hover:text-white transition-colors">Public Verifier</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/verify"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#8D99A8] hover:text-[#F5F7FA] bg-[#0D131D] hover:bg-[#121A26] border border-[#243041] rounded-lg transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Verify Record</span>
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden border-b border-[#243041]/60">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121A26] border border-[#243041] text-xs font-mono text-[#8D99A8] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
            <span>Enterprise Customs Decision-Support & Tamper-Evident Ledger</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F7FA] tracking-tight leading-[1.15]">
            Classify with confidence.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
              Prove it later.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#8D99A8] max-w-3xl mx-auto leading-relaxed">
            ClassiLedger combines AI-assisted tariff candidate ranking with tamper-evident blockchain decision records. Gives customs brokers a faster, standardized, and legally defensible way to classify goods.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/classify"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <SearchCode className="w-4 h-4" />
              <span>Start Classification</span>
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0D131D] hover:bg-[#121A26] text-[#F5F7FA] border border-[#243041] text-sm font-medium transition-all"
            >
              <span>Explore Dashboard</span>
              <ChevronRight className="w-4 h-4 text-[#8D99A8]" />
            </Link>
          </div>

          {/* Core Trust Pillars Bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-lg bg-[#0D131D] border border-[#243041]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#F5F7FA]">
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span>Local AI Inference</span>
              </div>
              <p className="text-[11px] text-[#8D99A8] mt-1">
                Laya model runs locally on ONNX runtime. Commercial descriptions never leave your perimeter.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0D131D] border border-[#243041]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#F5F7FA]">
                <Scale className="w-3.5 h-3.5 text-cyan-400" />
                <span>Broker Stays in Control</span>
              </div>
              <p className="text-[11px] text-[#8D99A8] mt-1">
                AI suggests candidates; licensed broker evaluates GRI rules and signs the legal reasoning.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0D131D] border border-[#243041]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#F5F7FA]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>On-Chain Seal</span>
              </div>
              <p className="text-[11px] text-[#8D99A8] mt-1">
                Deterministic SHA-256 hash anchored to Polygon Amoy testnet. 1-word modification triggers instant mismatch.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0D131D] border border-[#243041]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#F5F7FA]">
                <FileCheck2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Defensible Audit Pack</span>
              </div>
              <p className="text-[11px] text-[#8D99A8] mt-1">
                Generate 1-click verified dossiers with full GRI trail for CBP / WCO dispute resolutions.
              </p>
            </div>
          </div>
        </div>

        {/* Visualized Workflow Diagram */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="p-6 rounded-2xl bg-[#0D131D] border border-[#243041] shadow-2xl">
            <div className="text-xs font-mono uppercase text-[#8D99A8] tracking-wider mb-4 flex items-center justify-between">
              <span>The ClassiLedger Lifecycle</span>
              <span className="text-blue-400">Describe → Suggest → Review → Decide → Seal → Verify → Reuse</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {workflowSteps.map((step, idx) => (
                <div key={step.num} className="p-3.5 rounded-xl bg-[#070B12] border border-[#243041] relative group hover:border-blue-500/50 transition-all">
                  <div className="font-mono text-xs font-bold text-blue-400 mb-1">
                    {step.num}
                  </div>
                  <div className="text-xs font-semibold text-[#F5F7FA] mb-1">
                    {step.title}
                  </div>
                  <p className="text-[11px] text-[#8D99A8] leading-tight">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold">
            Industry Challenge
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] mt-2">
            Classification decisions shouldn&apos;t disappear into spreadsheets and email threads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problemCards.map((card, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-[#0D131D] border border-[#243041] flex flex-col justify-between">
              <div>
                <div className="w-2.5 h-2.5 rounded-full bg-red-400 mb-3"></div>
                <h3 className="text-base font-semibold text-[#F5F7FA] mb-2">{card.title}</h3>
                <p className="text-xs text-[#8D99A8] leading-relaxed mb-4">{card.desc}</p>
              </div>
              <div className="pt-3 border-t border-[#243041] text-[11px] font-mono text-[#EF4444] bg-red-950/20 p-2 rounded">
                Impact: {card.impact}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI + Human Balance Section */}
      <section id="trust-model" className="py-16 bg-[#0D131D]/50 border-y border-[#243041]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                Guiding Architecture Principle
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA]">
                AI suggests. Humans decide.
              </h2>
              <p className="text-xs sm:text-sm text-[#8D99A8] leading-relaxed">
                ClassiLedger never claims that the AI determines the legal tariff code. The Laya decision model ranks candidates, evaluates physical facts, and measures confidence against calibrated benchmarks.
              </p>
              <p className="text-xs sm:text-sm text-[#8D99A8] leading-relaxed">
                The licensed customs broker selects the final code, articulates the legal GRI reasoning, and signs the cryptographic seal.
              </p>

              <div className="pt-2 space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-[#22C55E]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Licensed broker retains 100% legal accountability</span>
                </div>
                <div className="flex items-center gap-2 text-[#22C55E]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Low-confidence scores trigger mandatory Senior Review</span>
                </div>
                <div className="flex items-center gap-2 text-[#22C55E]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Zero sensitive commercial text posted to public blockchain</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#070B12] border border-[#243041] font-mono text-xs space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#243041]">
                <span className="text-[#8D99A8]">Decision Support Contract</span>
                <span className="text-[#22C55E] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>
                  Enforced
                </span>
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="p-2.5 rounded bg-[#121A26] border border-[#243041]">
                  <span className="text-blue-400 block font-bold mb-0.5">Laya Model Output:</span>
                  <span className="text-[#F5F7FA]">Candidate: HS 8518.30 (87.4% Calibrated Probability)</span>
                </div>
                <div className="p-2.5 rounded bg-[#121A26] border border-[#243041]">
                  <span className="text-cyan-400 block font-bold mb-0.5">Broker Verification:</span>
                  <span className="text-[#F5F7FA]">Signed by Elena Rostova (LCB #44891) via EIP-712</span>
                </div>
                <div className="p-2.5 rounded bg-[#121A26] border border-[#243041]">
                  <span className="text-[#22C55E] block font-bold mb-0.5">Ledger Seal:</span>
                  <span className="text-[#8D99A8] break-all">0x8f2c3b889e41982bca819024f81c9e7a2b918cd4189025e1a74d89b12480ac19</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Precedents & Audit Section */}
      <section id="precedents" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-[#0D131D] border border-[#243041]">
            <div className="p-2 w-fit rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-[#F5F7FA] mb-2">
              Precedent Intelligence
            </h3>
            <p className="text-xs text-[#8D99A8] leading-relaxed mb-4">
              Similar historical classifications are surfaced in seconds with vector-matched similarity scores. Brokers can adopt proven legal arguments while maintaining consistency across high-volume accounts.
            </p>
            <Link
              href="/precedents"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300"
            >
              <span>Explore Precedent Database</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-[#0D131D] border border-[#243041]">
            <div className="p-2 w-fit rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-[#F5F7FA] mb-2">
              Audit Pack Dossiers
            </h3>
            <p className="text-xs text-[#8D99A8] leading-relaxed mb-4">
              Export comprehensive, litigation-ready classification dossiers containing product specs, candidate rankings, GRI justification, and on-chain blockchain transaction proofs.
            </p>
            <Link
              href="/audit-packs"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
            >
              <span>View Sample Audit Pack</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="mt-auto py-12 border-t border-[#243041] bg-[#070B12]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl font-bold text-[#F5F7FA]">
            Make your next customs classification defensible.
          </h2>
          <p className="text-xs text-[#8D99A8] max-w-xl mx-auto">
            Experience the full decision support workflow: describe a product, evaluate AI candidates, sign legal reasoning, and seal on Polygon Amoy.
          </p>
          <div className="pt-2">
            <Link
              href="/classify"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 transition-all"
            >
              <SearchCode className="w-4 h-4" />
              <span>Open ClassiLedger Studio</span>
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-[#243041]/40 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8D99A8] font-mono">
          <div>ClassiLedger v1.1 • Enterprise Customs Decision Infrastructure</div>
          <div>Laya Decision Classifier • Polygon Amoy Anchor #80002</div>
        </div>
      </section>
    </div>
  );
}
