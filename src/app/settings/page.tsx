'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { useApp } from '@/context/AppContext';
import { 
  Settings, 
  Cpu, 
  Lock, 
  ShieldCheck, 
  Sliders, 
  Wallet, 
  RotateCcw, 
  CheckCircle2, 
  ExternalLink,
  Key,
  Database
} from 'lucide-react';
import { truncateHash } from '@/lib/crypto';

export default function SettingsPage() {
  const { broker, confidenceThreshold, setConfidenceThreshold, resetDemoData, addToast } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localThreshold, setLocalThreshold] = useState(Math.round(confidenceThreshold * 100));

  const handleSaveThreshold = () => {
    setConfidenceThreshold(localThreshold / 100);
    addToast('success', `Brokerage confidence threshold updated to ${localThreshold}%`);
  };

  return (
    <div className="flex min-h-screen bg-[#070B12] text-[#F5F7FA]">
      <Sidebar 
        mobileOpen={mobileMenuOpen} 
        onMobileClose={() => setMobileMenuOpen(false)} 
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar 
          title="System Settings" 
          subtitle="Configure decision models, confidence thresholds, and blockchain testnet anchors" 
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 md:p-8 max-w-5xl w-full mx-auto space-y-6">
          {/* Header */}
          <div className="pb-2 border-b border-[#243041]">
            <h2 className="text-xl md:text-2xl font-bold text-[#F5F7FA] tracking-tight flex items-center gap-2">
              <Settings className="w-6 h-6 text-blue-400" />
              <span>Platform Configuration & Privacy Architecture</span>
            </h2>
            <p className="text-xs text-[#8D99A8] mt-1">
              Brokerage decision protocol parameters and smart contract consensus settings
            </p>
          </div>

          {/* Section 1: Model & Calibration Settings */}
          <div className="rounded-xl bg-[#0D131D] border border-[#243041] p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-[#243041]">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#F5F7FA]">
                  Laya Decision Classifier (Convai Innovations)
                </h3>
                <p className="text-xs text-[#8D99A8]">
                  Open-weight decision-only model evaluated locally via ONNX Runtime
                </p>
              </div>
              <span className="ml-auto text-xs font-mono px-2 py-0.5 rounded bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>
                Local Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3 rounded-lg bg-[#070B12] border border-[#243041]">
                <span className="text-[#8D99A8] block text-[10px]">Model Checkpoint</span>
                <span className="text-[#F5F7FA] font-bold text-sm">Laya-SystemOne v1.4.2</span>
              </div>
              <div className="p-3 rounded-lg bg-[#070B12] border border-[#243041]">
                <span className="text-[#8D99A8] block text-[10px]">Calibration Parameter</span>
                <span className="text-cyan-300 font-bold text-sm">Temperature T = 1.24</span>
              </div>
              <div className="p-3 rounded-lg bg-[#070B12] border border-[#243041]">
                <span className="text-[#8D99A8] block text-[10px]">Inference Latency</span>
                <span className="text-[#22C55E] font-bold text-sm">118ms (Local Core)</span>
              </div>
            </div>

            {/* Threshold Slider */}
            <div className="p-4 rounded-xl bg-[#070B12] border border-[#243041] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#F5F7FA] block">
                    Senior Review Escalation Threshold
                  </span>
                  <p className="text-[11px] text-[#8D99A8]">
                    Classifications with top candidate probability below this value trigger mandatory Senior Broker review.
                  </p>
                </div>
                <span className="font-mono text-base font-bold text-blue-400 bg-[#121A26] px-3 py-1 rounded border border-[#243041]">
                  {localThreshold}%
                </span>
              </div>

              <input
                type="range"
                min="50"
                max="95"
                step="1"
                value={localThreshold}
                onChange={(e) => setLocalThreshold(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-[#8D99A8] font-mono">50% (Permissive)</span>
                <button
                  onClick={handleSaveThreshold}
                  className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  Save Threshold
                </button>
                <span className="text-[10px] text-[#8D99A8] font-mono">95% (Strict)</span>
              </div>
            </div>
          </div>

          {/* Section 2: Blockchain Testnet Anchor */}
          <div className="rounded-xl bg-[#0D131D] border border-[#243041] p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#243041]">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#F5F7FA]">
                  Smart Contract Ledger (Polygon Amoy Testnet)
                </h3>
                <p className="text-xs text-[#8D99A8]">
                  Minimalist tamper-evident anchoring contract with whitelisted broker RBAC
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#070B12] border border-[#243041] space-y-2 font-mono text-xs">
              <div className="flex justify-between border-b border-[#243041]/60 pb-2">
                <span className="text-[#8D99A8]">Network:</span>
                <span className="text-[#F5F7FA]">Polygon Amoy (Chain ID 80002)</span>
              </div>
              <div className="flex justify-between border-b border-[#243041]/60 pb-2">
                <span className="text-[#8D99A8]">Contract Address:</span>
                <span className="text-blue-400 truncate max-w-xs">0x89205A3A3b2A5538C603ae0292931215A4f8A571</span>
              </div>
              <div className="flex justify-between border-b border-[#243041]/60 pb-2">
                <span className="text-[#8D99A8]">Whitelisted Broker Signer:</span>
                <span className="text-cyan-300">{broker.walletAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8D99A8]">Signer Profile:</span>
                <span className="text-[#F5F7FA]">{broker.name} ({broker.licenseNumber})</span>
              </div>
            </div>
          </div>

          {/* Section 3: Data Privacy Charter */}
          <div className="rounded-xl bg-[#0D131D] border border-blue-500/30 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#F5F7FA]">
              <Lock className="w-4 h-4 text-cyan-400" />
              <span>Commercial Confidentiality & Privacy Architecture</span>
            </div>

            <p className="text-xs text-[#8D99A8] leading-relaxed">
              &quot;Product descriptions, reasoning and documents never go on-chain. Only the cryptographic hash and minimal metadata are anchored on-chain. This protects commercial confidentiality while still proving integrity. Because the classifier runs locally, product descriptions also never leave the broker&apos;s own infrastructure.&quot;
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 rounded-lg bg-[#070B12] border border-[#243041] space-y-1">
                <div className="font-semibold text-blue-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>AI runs locally</span>
                </div>
                <p className="text-[#8D99A8] text-[11px]">
                  ONNX weights execute strictly inside client or VPC container boundary.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#070B12] border border-[#243041] space-y-1">
                <div className="font-semibold text-blue-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>Human decision required</span>
                </div>
                <p className="text-[#8D99A8] text-[11px]">
                  Autonomous filing is disabled. Every on-chain anchor requires a licensed broker EIP-712 signature.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#070B12] border border-[#243041] space-y-1">
                <div className="font-semibold text-blue-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>Blockchain integrity seal</span>
                </div>
                <p className="text-[#8D99A8] text-[11px]">
                  SHA-256 canonical hash anchors exact state at block time without revealing content.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#070B12] border border-[#243041] space-y-1">
                <div className="font-semibold text-blue-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>Auditable amendment history</span>
                </div>
                <p className="text-[#8D99A8] text-[11px]">
                  Original records cannot be deleted or rewritten; revisions are immutably appended.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Demo State Reset */}
          <div className="p-5 rounded-xl bg-[#0D131D] border border-red-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-semibold text-[#F5F7FA] flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-amber-400" />
                Reset Hackathon Demonstration Dataset
              </h4>
              <p className="text-[11px] text-[#8D99A8] mt-0.5">
                Reverts all records and tamper states back to clean initial demo states.
              </p>
            </div>
            <button
              onClick={resetDemoData}
              className="px-4 py-2 rounded-lg bg-[#121A26] hover:bg-red-950/40 text-red-300 border border-red-500/30 text-xs font-medium transition-colors shrink-0"
            >
              Reset All Demo Data
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
