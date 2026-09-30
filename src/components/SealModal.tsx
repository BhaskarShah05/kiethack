'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TariffCandidate, CanonicalDecisionRecord, FactQuestion, StructuredFields } from '@/types';
import { useApp } from '@/context/AppContext';
import { canonicalizeRecord, computeSha256 } from '@/lib/crypto';
import { 
  ShieldCheck, 
  Check, 
  Loader2, 
  FileText, 
  Binary, 
  Key, 
  Blocks, 
  CheckCircle2, 
  ExternalLink,
  X,
  Scale
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SealModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: TariffCandidate;
  productDescription: string;
  structuredFields: StructuredFields;
  facts: FactQuestion[];
  candidates: TariffCandidate[];
  brokerReasoning: string;
  onSuccess?: (newRecord: CanonicalDecisionRecord) => void;
}

export function SealModal({
  isOpen,
  onClose,
  candidate,
  productDescription,
  structuredFields,
  facts,
  candidates,
  brokerReasoning,
  onSuccess,
}: SealModalProps) {
  const router = useRouter();
  const { broker, saveNewSealedRecord } = useApp();

  const [step, setStep] = useState<number>(0); 
  // 0: Confirmation Summary & Review
  // 1: 01 Record generated
  // 2: 02 Canonical hash calculated
  // 3: 03 Wallet signature requested
  // 4: 04 Blockchain tx submitted
  // 5: 05 Record sealed (Final State)

  const [generatedRecord, setGeneratedRecord] = useState<CanonicalDecisionRecord | null>(null);
  const [canonicalString, setCanonicalString] = useState<string>('');
  const [calculatedHash, setCalculatedHash] = useState<string>('');
  const [txHash, setTxHash] = useState<string>('');

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      setGeneratedRecord(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStartSealing = async () => {
    const recordId = `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowIso = new Date().toISOString();

    // Step 1: Record generated
    setStep(1);
    await new Promise(r => setTimeout(r, 600));

    const draftRecord: Partial<CanonicalDecisionRecord> = {
      recordId,
      createdAt: nowIso,
      brokerId: broker.walletAddress,
      brokerName: broker.name,
      brokerLicense: broker.licenseNumber,
      productDescription,
      structuredFields,
      tariffSchedule: 'WCO Harmonized System 2022 / 2026 Rev (6-digit international + US HTS)',
      candidates,
      facts,
      finalCode: candidate.code,
      finalCodeDescription: candidate.description,
      reasoning: brokerReasoning,
      model: {
        name: 'Laya-SystemOne',
        version: 'v1.4.2-onnx',
        calibration: 'Temperature Scaling (T=1.24) on WCO Rulings Testbed v2',
      },
      confidence: candidate.probability,
      escalated: candidate.probability < 0.75,
      status: 'VERIFIED',
      amends: null,
    };

    // Step 2: Canonical hash calculated
    setStep(2);
    const cJson = canonicalizeRecord(draftRecord);
    setCanonicalString(cJson);
    const hash = await computeSha256(cJson);
    setCalculatedHash(hash);
    await new Promise(r => setTimeout(r, 700));

    // Step 3: Wallet signature requested
    setStep(3);
    await new Promise(r => setTimeout(r, 800));

    // Step 4: Blockchain tx submitted
    setStep(4);
    const simulatedTxHash = '0x' + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setTxHash(simulatedTxHash);
    await new Promise(r => setTimeout(r, 900));

    // Step 5: Sealed!
    const finalRecord: CanonicalDecisionRecord = {
      ...(draftRecord as CanonicalDecisionRecord),
      recordHash: hash,
      onChainHash: hash,
      onChainTx: {
        network: 'Polygon Amoy Testnet',
        chainId: 80002,
        contractAddress: '0x89205A3A3b2A5538C603ae0292931215A4f8A571',
        txHash: simulatedTxHash,
        blockNumber: 12849500 + Math.floor(Math.random() * 200),
        blockTimestamp: new Date().toISOString(),
        signer: broker.walletAddress,
        status: 'CONFIRMED',
        gasUsed: '47,820 gwei',
      },
      isTampered: false,
    };

    setGeneratedRecord(finalRecord);
    saveNewSealedRecord(finalRecord);
    setStep(5);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    if (onSuccess) {
      onSuccess(finalRecord);
    }
  };

  const stepsList = [
    { num: '01', title: 'Record generated', desc: 'Normalized JSON specification created', icon: FileText },
    { num: '02', title: 'Canonical hash calculated', desc: 'Deterministic SHA-256 digest computed', icon: Binary },
    { num: '03', title: 'Wallet signature requested', desc: 'EIP-712 typed signature from LCB address', icon: Key },
    { num: '04', title: 'Blockchain transaction submitted', desc: 'Submitting to Polygon Amoy Testnet smart contract', icon: Blocks },
    { num: '05', title: 'Record sealed', desc: 'State verified & anchored to block ledger', icon: ShieldCheck },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0D131D] border border-[#243041] rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#243041] flex items-center justify-between bg-[#121A26]/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#F5F7FA]">
                {step === 5 ? 'Decision Sealed & Anchored' : 'Confirm & Cryptographically Seal Decision'}
              </h3>
              <p className="text-xs text-[#8D99A8]">
                {step === 5
                  ? 'Canonical record anchored to blockchain ledger'
                  : 'Prepare immutable legal record with broker signature'}
              </p>
            </div>
          </div>
          {step === 0 && (
            <button
              onClick={onClose}
              className="text-[#8D99A8] hover:text-[#F5F7FA] p-1 rounded-md hover:bg-[#121A26]"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* STEP 0: Pre-seal Review */}
          {step === 0 && (
            <div className="space-y-4">
              {/* Decision Summary Card */}
              <div className="p-4 rounded-xl bg-[#070B12] border border-[#243041] space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#8D99A8]">
                      Confirmed Tariff Code
                    </span>
                    <div className="font-mono text-xl font-bold text-blue-400 tracking-wide">
                      HS {candidate.code}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#8D99A8]">
                      AI Calibrated
                    </span>
                    <div className="font-mono text-base font-semibold text-[#F5F7FA]">
                      {(candidate.probability * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="text-xs text-[#F5F7FA] leading-relaxed border-t border-[#243041]/60 pt-2.5">
                  {candidate.description}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] font-mono border-t border-[#243041]/60 text-[#8D99A8]">
                  <div>
                    <span className="text-[#566474]">Signer:</span> {broker.name} ({broker.licenseNumber})
                  </div>
                  <div>
                    <span className="text-[#566474]">Schedule:</span> WCO HS 2022/2026
                  </div>
                  <div>
                    <span className="text-[#566474]">Model:</span> Laya-SystemOne v1.4.2
                  </div>
                  <div>
                    <span className="text-[#566474]">Network:</span> Polygon Amoy (#80002)
                  </div>
                </div>
              </div>

              {/* Broker Reasoning Review */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F5F7FA] flex items-center justify-between">
                  <span>Broker Legal Justification & Evidence</span>
                  <span className="text-[11px] text-[#22C55E] font-normal">Recorded off-chain</span>
                </label>
                <div className="p-3 rounded-lg bg-[#070B12] border border-[#243041] text-xs text-[#8D99A8] leading-relaxed max-h-28 overflow-y-auto">
                  {brokerReasoning}
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/30 text-xs text-[#8D99A8] space-y-1">
                <span className="font-semibold text-blue-300 block">
                  Confidentiality Rule Enforced:
                </span>
                <p>
                  Your product text, reasoning and commercial documents never go on-chain. Only the canonical SHA-256 cryptographic hash is anchored to the testnet contract.
                </p>
              </div>
            </div>
          )}

          {/* STEP 1-4: Sealing Progress */}
          {step >= 1 && step <= 4 && (
            <div className="py-6 space-y-6">
              <div className="text-center space-y-1">
                <div className="inline-flex p-3 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-spin">
                  <Loader2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-semibold text-[#F5F7FA] pt-2">
                  Sealing Classification Record...
                </h4>
                <p className="text-xs text-[#8D99A8]">
                  Computing cryptographic digest and anchoring to smart contract ledger.
                </p>
              </div>

              {/* Progress Steps list */}
              <div className="space-y-2.5">
                {stepsList.map((item, idx) => {
                  const itemIndex = idx + 1;
                  const isDone = step > itemIndex;
                  const isCurrent = step === itemIndex;
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.num}
                      className={`p-3 rounded-lg border flex items-center justify-between transition-all ${
                        isDone
                          ? 'bg-[#121A26]/80 border-[#22C55E]/40 text-[#22C55E]'
                          : isCurrent
                          ? 'bg-blue-600/10 border-blue-500/50 text-[#F5F7FA]'
                          : 'bg-[#070B12]/50 border-[#243041]/40 text-[#8D99A8]/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-semibold ${
                            isDone
                              ? 'bg-[#22C55E]/20 text-[#22C55E]'
                              : isCurrent
                              ? 'bg-blue-500 text-white animate-pulse'
                              : 'bg-[#121A26] text-[#8D99A8]'
                          }`}
                        >
                          {isDone ? <Check className="w-4 h-4" /> : item.num}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#F5F7FA]">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-[#8D99A8]">
                            {item.desc}
                          </div>
                        </div>
                      </div>

                      {isCurrent && (
                        <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                      )}
                      {isDone && (
                        <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: Final Sealed State */}
          {step === 5 && generatedRecord && (
            <div className="space-y-4 animate-in fade-in-50 duration-200">
              <div className="p-4 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center gap-3">
                <CheckCircle2 className="w-7 h-7 text-[#22C55E] shrink-0" />
                <div>
                  <div className="text-sm font-bold text-[#22C55E] uppercase font-mono">
                    Decision Sealed & Verified
                  </div>
                  <p className="text-xs text-[#8D99A8] mt-0.5">
                    Hash successfully recorded on Polygon Amoy testnet. Record is now tamper-evident and audit-ready.
                  </p>
                </div>
              </div>

              {/* Anchored Details */}
              <div className="p-4 rounded-xl bg-[#070B12] border border-[#243041] space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-[#243041]/60 pb-2">
                  <span className="text-[#8D99A8]">Record ID</span>
                  <span className="text-[#F5F7FA] font-bold">{generatedRecord.recordId}</span>
                </div>
                <div className="space-y-1 border-b border-[#243041]/60 pb-2">
                  <span className="text-[#8D99A8]">Canonical Hash</span>
                  <div className="p-2 rounded bg-[#121A26] text-cyan-300 break-all text-[11px]">
                    {generatedRecord.recordHash}
                  </div>
                </div>
                <div className="flex justify-between border-b border-[#243041]/60 pb-2">
                  <span className="text-[#8D99A8]">Transaction ID</span>
                  <span className="text-blue-400 truncate max-w-xs">{txHash}</span>
                </div>
                <div className="flex justify-between border-b border-[#243041]/60 pb-2">
                  <span className="text-[#8D99A8]">Block Timestamp</span>
                  <span className="text-[#F5F7FA]">{generatedRecord.onChainTx?.blockTimestamp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8D99A8]">Signer</span>
                  <span className="text-[#F5F7FA]">{generatedRecord.brokerName}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTAs */}
        <div className="p-5 border-t border-[#243041] bg-[#121A26]/50 flex items-center justify-end gap-3">
          {step === 0 && (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-medium text-[#8D99A8] hover:text-[#F5F7FA] hover:bg-[#121A26] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleStartSealing}
                className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Sign & Seal On-Chain</span>
              </button>
            </>
          )}

          {step === 5 && generatedRecord && (
            <>
              <button
                onClick={() => router.push(`/records/${generatedRecord.recordId}`)}
                className="px-4 py-2 rounded-lg bg-[#121A26] hover:bg-[#1A2535] text-[#F5F7FA] border border-[#243041] text-xs font-medium transition-colors"
              >
                View Record & Tamper Demo
              </button>
              <button
                onClick={() => router.push(`/audit-packs?recordId=${generatedRecord.recordId}`)}
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Generate Audit Pack</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
