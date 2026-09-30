'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { 
  Briefcase, 
  TrendingUp, 
  Target, 
  DollarSign, 
  PieChart, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Layers,
  Scale,
  Award,
  BarChart3,
  Building2,
  FileCheck2
} from 'lucide-react';

export default function BusinessPlanPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const marketMetrics = [
    { title: 'TAM (Global Trade Compliance)', value: '$14.8B', sub: 'Projected by 2030 (11.4% CAGR)' },
    { title: 'SAM (Digital Classification)', value: '$3.2B', sub: 'Cross-border customs software' },
    { title: 'SOM (Target Beachhead)', value: '$380M', sub: 'US, EU & APAC customs brokerages' },
    { title: 'Target Gross Margin', value: '82%', sub: 'High SaaS leverage via local edge inference' },
  ];

  const pricingTiers = [
    {
      name: 'Starter / Independent',
      price: '$299',
      period: 'per month',
      desc: 'For solo licensed customs brokers and boutique firms.',
      features: [
        '1 Licensed Broker Seat',
        'Up to 300 Sealed Decisions/mo',
        'Local ONNX Laya inference',
        'Polygon Amoy blockchain anchoring',
        'Standard Precedent Search',
        'Single-click Audit Pack export'
      ],
      cta: 'Start 14-Day Pilot',
      badge: 'Boutique'
    },
    {
      name: 'Professional Brokerage',
      price: '$1,250',
      period: 'per month',
      desc: 'For growing customs compliance agencies with team review tiers.',
      features: [
        'Up to 5 Licensed Broker Seats',
        'Up to 2,500 Sealed Decisions/mo',
        'Senior Review Escalation Workflows',
        'Vector Similarity Precedent Engine',
        'Litigation-Grade Audit Pack Dossiers',
        'Priority Polygon Amoy & Sepolia Anchors',
        'Tamper Detection Sentry Alerts'
      ],
      popular: true,
      cta: 'Deploy Brokerage Suite',
      badge: 'Most Popular'
    },
    {
      name: 'Enterprise / Global 3PL',
      price: '$4,500',
      period: 'per month + $0.25/seal',
      desc: 'For multinational freight forwarders, global 3PLs, and high-volume retail importers.',
      features: [
        'Unlimited Broker & Reviewer Seats',
        'High-Throughput Manifest Batch Engine',
        'Dedicated On-Prem / VPC Inference Cluster',
        'CargoWise, SAP GTS & Descartes Connectors',
        'Custom Private Subnet / Dedicated Ledger',
        'Dedicated SLA & 24/7 Regulatory Support',
        'Custom Fine-Tuning on Historical Rulings'
      ],
      cta: 'Contact Sales',
      badge: 'Enterprise'
    }
  ];

  const financialProjections = [
    { year: 'Year 1', arr: '$480,000', clients: '20 Brokerages', decisions: '180,000', margin: '74%', focus: 'US Port Pilot Program' },
    { year: 'Year 2', arr: '$2,150,000', clients: '75 Brokerages', decisions: '1,200,000', margin: '79%', focus: 'EU & UK Customs Expansion' },
    { year: 'Year 3', arr: '$6,800,000', clients: '210 Enterprise 3PLs', decisions: '4,500,000', margin: '82%', focus: 'CargoWise Marketplace Integration' },
    { year: 'Year 4', arr: '$16,500,000', clients: '450 Global Accounts', decisions: '14,000,000', margin: '84%', focus: 'Cross-Border E-Commerce Infrastructure' },
    { year: 'Year 5', arr: '$34,000,000', clients: '850+ Accounts', decisions: '38,000,000', margin: '85%', focus: 'Global Category Standard' },
  ];

  return (
    <div className="flex min-h-screen bg-[#070B12] text-[#F5F7FA]">
      <Sidebar 
        mobileOpen={mobileMenuOpen} 
        onMobileClose={() => setMobileMenuOpen(false)} 
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar 
          title="Executive Business Plan" 
          subtitle="Commercial strategy, market sizing, monetization model, and financial projections" 
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Header Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-[#0D131D] via-[#121A26] to-[#0D131D] border border-blue-500/30 p-6 md:p-8 shadow-xl">
            <div className="max-w-3xl space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full">
                Venture Strategy & Commercial Roadmap
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#F5F7FA] tracking-tight">
                ClassiLedger: Business Model & Monetization Plan
              </h2>
              <p className="text-xs md:text-sm text-[#8D99A8] leading-relaxed">
                Transforming tariff classification from a manual cost-center with personal broker liability into an auditable, high-margin, cryptographic decision infrastructure standard.
              </p>
            </div>
          </div>

          {/* Market Sizing TAM / SAM / SOM */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#F5F7FA] flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                <span>Market Opportunity (TAM / SAM / SOM)</span>
              </h3>
              <span className="text-xs font-mono text-[#8D99A8]">Data Source: Grand View Research & WCO Trade Monitor</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {marketMetrics.map((m, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-[#0D131D] border border-[#243041] space-y-1">
                  <span className="text-xs font-mono text-[#8D99A8] uppercase">{m.title}</span>
                  <div className="text-2xl font-bold font-mono text-cyan-300">{m.value}</div>
                  <p className="text-[11px] text-[#8D99A8]">{m.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Unit Economics & The Moat */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#0D131D] border border-[#243041] space-y-3">
              <div className="p-2 w-fit rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <DollarSign className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-[#F5F7FA]">Ultra-High Gross Margin (82%+)</h4>
              <p className="text-xs text-[#8D99A8] leading-relaxed">
                Because Laya runs locally on the broker’s device via ONNX and Polygon Amoy gas costs fractions of a cent ($0.001/anchor), ClassiLedger avoids the crushing cloud LLM API margins that cripple generic AI startups.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0D131D] border border-[#243041] space-y-3">
              <div className="p-2 w-fit rounded-lg bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-[#F5F7FA]">Zero Disintermediation Friction</h4>
              <p className="text-xs text-[#8D99A8] leading-relaxed">
                We empower licensed customs brokers rather than trying to replace them. By preserving human legal authority and protecting their licenses from customs penalties, brokers are our greatest champions.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0D131D] border border-[#243041] space-y-3">
              <div className="p-2 w-fit rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-[#F5F7FA]">The Precedent Flywheel Moat</h4>
              <p className="text-xs text-[#8D99A8] leading-relaxed">
                Every sealed classification builds an immutable institutional knowledge graph for the brokerage. Switching to another software means abandoning years of verified, audit-tested precedent reasoning.
              </p>
            </div>
          </div>

          {/* Pricing & Monetization Model */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#F5F7FA] flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-cyan-400" />
                  <span>SaaS Tiered Monetization & Pricing Model</span>
                </h3>
                <p className="text-xs text-[#8D99A8] mt-0.5">
                  Predictable subscription foundation paired with transactional anchoring usage expansion
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingTiers.map((tier, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl p-6 flex flex-col justify-between border transition-all ${
                    tier.popular
                      ? 'bg-[#121A26] border-blue-500 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500'
                      : 'bg-[#0D131D] border-[#243041]'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">
                        {tier.badge}
                      </span>
                      {tier.popular && (
                        <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-mono text-[10px] font-bold">
                          POPULAR
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-[#F5F7FA]">{tier.name}</h4>
                      <p className="text-xs text-[#8D99A8] mt-1">{tier.desc}</p>
                    </div>

                    <div className="flex items-baseline gap-1 pt-2 border-t border-[#243041]/60">
                      <span className="text-3xl font-extrabold font-mono text-[#F5F7FA]">{tier.price}</span>
                      <span className="text-xs text-[#8D99A8] font-mono">/{tier.period}</span>
                    </div>

                    <ul className="space-y-2.5 pt-2 text-xs text-[#8D99A8]">
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                          <span className="leading-snug text-[#F5F7FA]">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#243041]/60">
                    <Link
                      href="/classify"
                      className={`w-full py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        tier.popular
                          ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
                          : 'bg-[#070B12] hover:bg-[#121A26] text-[#F5F7FA] border border-[#243041]'
                      }`}
                    >
                      <span>{tier.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5-Year Financial Forecast */}
          <div className="rounded-xl bg-[#0D131D] border border-[#243041] p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#243041]">
              <div>
                <h3 className="text-base font-bold text-[#F5F7FA] flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#22C55E]" />
                  <span>5-Year Pro-Forma Financial Projections</span>
                </h3>
                <p className="text-xs text-[#8D99A8]">
                  Targeting break-even by Month 14 with 85% gross margin profile at scale
                </p>
              </div>
              <span className="text-xs font-mono text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20 px-2.5 py-1 rounded">
                Profitable by Y2
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#243041] text-[#8D99A8] uppercase text-[10px]">
                    <th className="py-3 px-3">Timeline</th>
                    <th className="py-3 px-3">Annual Run Rate (ARR)</th>
                    <th className="py-3 px-3">Active Brokerages</th>
                    <th className="py-3 px-3">Decisions Sealed</th>
                    <th className="py-3 px-3">Gross Margin</th>
                    <th className="py-3 px-3">Strategic Milestone</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#243041]/40">
                  {financialProjections.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#121A26]/80 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-cyan-300">{row.year}</td>
                      <td className="py-3.5 px-3 font-bold text-[#F5F7FA] text-sm">{row.arr}</td>
                      <td className="py-3.5 px-3 text-[#8D99A8]">{row.clients}</td>
                      <td className="py-3.5 px-3 text-[#8D99A8]">{row.decisions}</td>
                      <td className="py-3.5 px-3 text-[#22C55E] font-bold">{row.margin}</td>
                      <td className="py-3.5 px-3 text-[#F5F7FA] font-sans">{row.focus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Go-To-Market (GTM) Strategy & Acquisition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl bg-[#0D131D] border border-[#243041] p-6 space-y-4">
              <h4 className="text-sm font-bold text-[#F5F7FA] flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                Go-To-Market (GTM) Engine
              </h4>
              <div className="space-y-3 text-xs text-[#8D99A8]">
                <div className="p-3 rounded-lg bg-[#070B12] border border-[#243041]">
                  <strong className="text-[#F5F7FA] block mb-0.5">1. Bottom-Up Broker Utility (Product-Led Growth)</strong>
                  Offer free verification and desktop classification runner for individual brokers to test on tricky composite products.
                </div>
                <div className="p-3 rounded-lg bg-[#070B12] border border-[#243041]">
                  <strong className="text-[#F5F7FA] block mb-0.5">2. Industry Associations (NCBFAA, FIATA)</strong>
                  Educational webinars on defending CBP audits, WCO classification updates, and digital non-repudiation.
                </div>
                <div className="p-3 rounded-lg bg-[#070B12] border border-[#243041]">
                  <strong className="text-[#F5F7FA] block mb-0.5">3. TMS/ERP Marketplace Integration</strong>
                  Plug directly into CargoWise (WiseTech) and Descartes to automate verification stamps on every declaration.
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-[#0D131D] border border-[#243041] p-6 space-y-4">
              <h4 className="text-sm font-bold text-[#F5F7FA] flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400" />
                Strategic Acquisition & Exit Avenues
              </h4>
              <p className="text-xs text-[#8D99A8] leading-relaxed">
                By Year 4–5, ClassiLedger presents an irresistible acquisition target for the dominant global logistics and customs ERP conglomerates:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-[#070B12] border border-[#243041] text-[#F5F7FA]">
                  Descartes Systems
                  <span className="block text-[10px] text-[#8D99A8]">Customs filing suite</span>
                </div>
                <div className="p-2.5 rounded bg-[#070B12] border border-[#243041] text-[#F5F7FA]">
                  WiseTech Global
                  <span className="block text-[10px] text-[#8D99A8]">CargoWise ecosystem</span>
                </div>
                <div className="p-2.5 rounded bg-[#070B12] border border-[#243041] text-[#F5F7FA]">
                  Thomson Reuters
                  <span className="block text-[10px] text-[#8D99A8]">ONESOURCE Global Trade</span>
                </div>
                <div className="p-2.5 rounded bg-[#070B12] border border-[#243041] text-[#F5F7FA]">
                  Flexport
                  <span className="block text-[10px] text-[#8D99A8]">Digital freight forwarder</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
