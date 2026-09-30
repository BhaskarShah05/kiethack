'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { CandidateCard } from '@/components/CandidateCard';
import { FactQuestionPanel } from '@/components/FactQuestion';
import { ConfidenceReviewBanner } from '@/components/ConfidenceReviewBanner';
import { SealModal } from '@/components/SealModal';
import { useApp } from '@/context/AppContext';
import { 
  TariffCandidate, 
  FactQuestion, 
  StructuredFields,
  CanonicalDecisionRecord
} from '@/types';
import { 
  DEMO_PRODUCT_DEFAULT, 
  DEMO_CANDIDATES, 
  DEMO_FACTS 
} from '@/lib/mockData';
import { 
  SearchCode, 
  Cpu, 
  Sparkles, 
  Scale, 
  ShieldCheck, 
  Check, 
  AlertCircle, 
  ChevronRight, 
  FileText, 
  RotateCcw,
  SlidersHorizontal,
  Lock,
  Loader2
} from 'lucide-react';

function ClassifyContent() {
  const searchParams = useSearchParams();
  const { confidenceThreshold, addToast } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form input state
  const [description, setDescription] = useState(DEMO_PRODUCT_DEFAULT.description);
  const [showStructured, setShowStructured] = useState(true);
  const [structuredFields, setStructuredFields] = useState<StructuredFields>({
    material: DEMO_PRODUCT_DEFAULT.material,
    intendedUse: DEMO_PRODUCT_DEFAULT.intendedUse,
    countryOfOrigin: DEMO_PRODUCT_DEFAULT.countryOfOrigin,
    brand: DEMO_PRODUCT_DEFAULT.brand,
    additionalNotes: DEMO_PRODUCT_DEFAULT.additionalNotes,
  });

  // Classification Execution State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisResults, setAnalysisResults] = useState<{
    candidates: TariffCandidate[];
    facts: FactQuestion[];
    topConfidence: number;
  } | null>({
    candidates: DEMO_CANDIDATES,
    facts: DEMO_FACTS,
    topConfidence: DEMO_CANDIDATES[0].probability,
  });

  // Broker Decision & Seal state
  const [selectedCandidate, setSelectedCandidate] = useState<TariffCandidate | null>(DEMO_CANDIDATES[0]);
  const [brokerReasoning, setBrokerReasoning] = useState(
    'Pursuant to General Rules of Interpretation (GRI) 1 and 3(b), the subject article consists of wireless earphones packaged with a battery charging cradle for retail sale. The essential character is imparted by the earphones under heading 8518, which provide the primary electroacoustic sound reproduction function. Despite commercial labeling as a "fitness accessory", Chapter 95 Note 1(m) explicitly excludes electrical machinery of Chapter 85. Supported by CBP Ruling HQ H260821.'
  );
  const [isSealModalOpen, setIsSealModalOpen] = useState(false);

  // Pre-fill from query params if available
  useEffect(() => {
    const qDesc = searchParams.get('description');
    const qCode = searchParams.get('code');
    const qReasoning = searchParams.get('reasoning');

    if (qDesc) setDescription(qDesc);
    if (qReasoning) setBrokerReasoning(qReasoning);
    if (qCode) {
      const match = DEMO_CANDIDATES.find(c => c.code.startsWith(qCode));
      if (match) setSelectedCandidate(match);
    }
  }, [searchParams]);

  // Demo loaders
  const loadEarbudsDemo = () => {
    setDescription(DEMO_PRODUCT_DEFAULT.description);
    setStructuredFields({
      material: DEMO_PRODUCT_DEFAULT.material,
      intendedUse: DEMO_PRODUCT_DEFAULT.intendedUse,
      countryOfOrigin: DEMO_PRODUCT_DEFAULT.countryOfOrigin,
      brand: DEMO_PRODUCT_DEFAULT.brand,
      additionalNotes: DEMO_PRODUCT_DEFAULT.additionalNotes,
    });
    setAnalysisResults({
      candidates: DEMO_CANDIDATES,
      facts: DEMO_FACTS,
      topConfidence: DEMO_CANDIDATES[0].probability,
    });
    setSelectedCandidate(DEMO_CANDIDATES[0]);
    setBrokerReasoning(
      'Pursuant to General Rules of Interpretation (GRI) 1 and 3(b), the subject article consists of wireless earphones packaged with a battery charging cradle for retail sale. The essential character is imparted by the earphones under heading 8518. Chapter 95 Note 1(m) excludes electrical machinery of Chapter 85 from athletic goods.'
    );
    addToast('info', 'Loaded Centerpiece Demo: Wireless Earbuds with Charging Case');
  };

  const loadHelmetDemo = () => {
    setDescription('Smart cycling helmet with integrated crash-sensor, bone-conduction audio speakers, and emergency LED signaling.');
    setStructuredFields({
      material: 'EPS foam, polycarbonate shell, piezoelectric bone-conduction transducers, LED strip',
      intendedUse: 'Bicycle safety headgear with auxiliary audio communication and crash beacon',
      countryOfOrigin: 'TW — Taiwan',
      brand: 'AeroShield Tech',
      additionalNotes: 'Composite article. Essential character contestable between headgear and electronics.',
    });

    const helmetCandidates: TariffCandidate[] = [
      {
        code: '6506.10.60',
        description: 'Safety headgear, whether or not lined or trimmed: Other',
        probability: 0.412,
        rank: 1,
        chapter: 'Chapter 65',
        heading: '6506',
        subheading: '6506.10',
        dutyRate: 'Free',
        ruleBasis: 'GRI 3(b) — Protective headgear character',
        whyCandidate: 'Protective impact mitigation is the primary purchase purpose.',
        legalNotes: ['Chapter 65 covers headgear. Composite electronic safety helmets are classified by impact protection.'],
        keyDistinguishers: 'Monolithic impact foam structure cannot be decoupled from helmet shell.'
      },
      {
        code: '8518.30.20',
        description: 'Headphones and earphones (Bone conduction transducers)',
        probability: 0.385,
        rank: 2,
        chapter: 'Chapter 85',
        heading: '8518',
        subheading: '8518.30',
        dutyRate: 'Free',
        ruleBasis: 'GRI 1 — Electroacoustic communication',
        whyCandidate: 'Integrated audio communication subsystem.',
        legalNotes: ['Heading 8518 covers earphones.'],
        keyDistinguishers: 'Subordinate to cranial protection.'
      },
      {
        code: '8531.80.00',
        description: 'Electric sound or visual signalling apparatus: Other',
        probability: 0.203,
        rank: 3,
        chapter: 'Chapter 85',
        heading: '8531',
        subheading: '8531.80',
        dutyRate: '1.3%',
        ruleBasis: 'GRI 1 — Visual emergency beacon',
        whyCandidate: 'Automatic crash beacon LEDs.',
        legalNotes: ['Warning signals.'],
        keyDistinguishers: 'Auxiliary signaling.'
      }
    ];

    const helmetFacts: FactQuestion[] = [
      {
        id: 'fh-1',
        question: 'Does the primary utility reside in preventing cranial impact trauma during cycling?',
        answer: 'yes',
        probability: 0.86,
        relevance: 'GRI 3(b) essential character test between safety gear and electronics.',
        impactsCodes: ['6506.10.60']
      },
      {
        id: 'fh-2',
        question: 'Can the audio transducers function independently if extracted from the EPS helmet liner?',
        answer: 'no',
        probability: 0.94,
        relevance: 'Subordinates electronics to the monolithic helmet architecture.',
        impactsCodes: ['6506.10.60', '8518.30.20']
      }
    ];

    setAnalysisResults({
      candidates: helmetCandidates,
      facts: helmetFacts,
      topConfidence: 0.412,
    });
    setSelectedCandidate(helmetCandidates[0]);
    setBrokerReasoning(
      'Senior Review Escalation: Model confidence is 41.2% (below 75% threshold). Under GRI 3(b), safety headgear under heading 6506 imparts the essential character because the user acquires the good primarily for cranial impact protection. Bone-conduction audio and LED telemetry are secondary features.'
    );
    addToast('warning', 'Loaded Ambiguous Case: Top confidence 41.2% triggers Senior Review warning!');
  };

  const handleAnalyze = async () => {
    if (!description.trim()) {
      addToast('error', 'Please enter a product description to analyze.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisStep(1);
    await new Promise(r => setTimeout(r, 600));

    setAnalysisStep(2);
    await new Promise(r => setTimeout(r, 700));

    setAnalysisStep(3);
    await new Promise(r => setTimeout(r, 800));

    setAnalysisStep(4);
    await new Promise(r => setTimeout(r, 600));

    if (description.toLowerCase().includes('helmet')) {
      loadHelmetDemo();
    } else {
      setAnalysisResults({
        candidates: DEMO_CANDIDATES,
        facts: DEMO_FACTS,
        topConfidence: DEMO_CANDIDATES[0].probability,
      });
      setSelectedCandidate(DEMO_CANDIDATES[0]);
    }

    setIsAnalyzing(false);
    setAnalysisStep(0);
    addToast('success', 'Candidate shortlist ranked & calibrated successfully.');
  };

  const handleReasoningTemplate = (type: 'gri3b' | 'gri1' | 'chap95') => {
    if (type === 'gri3b') {
      setBrokerReasoning(prev => 
        'Pursuant to General Rule of Interpretation 3(b), goods put up in sets for retail sale are classified according to the component which imparts their essential character. Here, the primary electroacoustic transducer imparts the essential character over the auxiliary packaging/charging cradle. ' + prev
      );
    } else if (type === 'gri1') {
      setBrokerReasoning(prev => 
        'Classified pursuant to GRI 1 by the terms of Heading 8518 ("Headphones and earphones, whether or not combined with a microphone"). ' + prev
      );
    } else if (type === 'chap95') {
      setBrokerReasoning(prev => 
        'Chapter 95 Note 1(m) explicitly excludes electrical machinery and equipment of Chapter 85 from Chapter 95. Marketing terminology as "fitness/sports equipment" does not alter this statutory exclusion. ' + prev
      );
    }
    addToast('info', 'Appended legal reasoning template.');
  };

  return (
    <div className="flex min-h-screen bg-[#070B12] text-[#F5F7FA]">
      <Sidebar 
        mobileOpen={mobileMenuOpen} 
        onMobileClose={() => setMobileMenuOpen(false)} 
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar 
          title="Classify Product" 
          subtitle="Describe the product and let ClassiLedger surface the strongest tariff candidates" 
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Page Heading & Quick Demo Presets */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#243041]">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#F5F7FA] tracking-tight flex items-center gap-2.5">
                <SearchCode className="w-6 h-6 text-blue-400" />
                <span>Product Classification Studio</span>
              </h2>
              <p className="text-xs text-[#8D99A8] mt-1">
                Laya-SystemOne calibrated decision model • WCO Harmonized System 2022/2026
              </p>
            </div>

            {/* Quick Demo Pre-sets for Judges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono text-[#8D99A8] uppercase mr-1">
                Hackathon Presets:
              </span>
              <button
                onClick={loadEarbudsDemo}
                className="px-2.5 py-1 text-xs rounded bg-[#121A26] hover:bg-[#1A2535] text-blue-300 border border-[#243041] transition-colors"
                title="Earbuds with charging case (High confidence 87.4%)"
              >
                Earbuds Case (Demo)
              </button>
              <button
                onClick={loadHelmetDemo}
                className="px-2.5 py-1 text-xs rounded bg-[#121A26] hover:bg-[#1A2535] text-amber-300 border border-amber-500/30 transition-colors"
                title="Smart Helmet (Ambiguous 41.2% - Senior Review)"
              >
                Smart Helmet (Escalated)
              </button>
            </div>
          </div>

          {/* Product Description Input Panel */}
          <div className="rounded-xl bg-[#0D131D] border border-[#243041] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2">
                <span>Product Description</span>
                <span className="text-[11px] font-normal text-blue-400 font-mono">
                  (Required for candidate ranking)
                </span>
              </label>

              <button
                onClick={() => setShowStructured(!showStructured)}
                className="text-xs text-[#8D99A8] hover:text-[#F5F7FA] flex items-center gap-1.5 transition-colors font-medium"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{showStructured ? 'Hide Structured Fields' : 'Add Structured Attributes'}</span>
              </button>
            </div>

            <div className="relative">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Example: Wireless earbuds with charging case, sold as a fitness accessory..."
                className="w-full p-3.5 rounded-lg bg-[#070B12] text-[#F5F7FA] text-sm border border-[#243041] placeholder-[#8D99A8]/50 focus:outline-none focus:border-blue-500 transition-colors leading-relaxed font-sans"
              />
            </div>

            {/* Optional Structured Fields */}
            {showStructured && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-[#243041]/60 text-xs animate-in fade-in-50 duration-150">
                <div>
                  <label className="text-[11px] text-[#8D99A8] uppercase font-mono block mb-1">
                    Material
                  </label>
                  <input
                    type="text"
                    value={structuredFields.material}
                    onChange={(e) => setStructuredFields({ ...structuredFields, material: e.target.value })}
                    placeholder="e.g. ABS plastic, silicone"
                    className="w-full px-2.5 py-1.5 rounded bg-[#070B12] border border-[#243041] text-[#F5F7FA] placeholder-[#8D99A8]/40 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-[#8D99A8] uppercase font-mono block mb-1">
                    Intended Use
                  </label>
                  <input
                    type="text"
                    value={structuredFields.intendedUse}
                    onChange={(e) => setStructuredFields({ ...structuredFields, intendedUse: e.target.value })}
                    placeholder="e.g. Hands-free audio listening"
                    className="w-full px-2.5 py-1.5 rounded bg-[#070B12] border border-[#243041] text-[#F5F7FA] placeholder-[#8D99A8]/40 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-[#8D99A8] uppercase font-mono block mb-1">
                    Country of Origin
                  </label>
                  <input
                    type="text"
                    value={structuredFields.countryOfOrigin}
                    onChange={(e) => setStructuredFields({ ...structuredFields, countryOfOrigin: e.target.value })}
                    placeholder="e.g. VN — Vietnam"
                    className="w-full px-2.5 py-1.5 rounded bg-[#070B12] border border-[#243041] text-[#F5F7FA] placeholder-[#8D99A8]/40 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-[#8D99A8] uppercase font-mono block mb-1">
                    Brand / Model
                  </label>
                  <input
                    type="text"
                    value={structuredFields.brand}
                    onChange={(e) => setStructuredFields({ ...structuredFields, brand: e.target.value })}
                    placeholder="e.g. AuraPulse Sound Systems"
                    className="w-full px-2.5 py-1.5 rounded bg-[#070B12] border border-[#243041] text-[#F5F7FA] placeholder-[#8D99A8]/40 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-[#8D99A8]">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Zero telemetry: description processed in local inference engine</span>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Classification...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                    <span>Analyze Classification</span>
                  </>
                )}
              </button>
            </div>

            {/* Multi-stage loading progress state */}
            {isAnalyzing && (
              <div className="p-4 rounded-lg bg-[#070B12] border border-blue-500/30 space-y-2.5 animate-in fade-in duration-150">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-blue-400 font-semibold flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    {analysisStep === 1 && 'Searching tariff schedule database (WCO 2022/2026)...'}
                    {analysisStep === 2 && 'Building candidate shortlist (8-12 subheadings)...'}
                    {analysisStep === 3 && 'Running Laya-SystemOne typed question inference...'}
                    {analysisStep === 4 && 'Calibrating confidence with temperature scaling (T=1.24)...'}
                  </span>
                  <span className="text-[#8D99A8]">
                    {analysisStep * 25}%
                  </span>
                </div>
                <div className="w-full bg-[#121A26] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full transition-all duration-300 ease-out"
                    style={{ width: `${analysisStep * 25}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* AI Results & Decision Support */}
          {analysisResults && (
            <div className="space-y-6">
              {/* Confidence Banner */}
              <ConfidenceReviewBanner
                confidence={analysisResults.topConfidence}
                threshold={confidenceThreshold}
                isEscalated={analysisResults.topConfidence < confidenceThreshold}
              />

              {/* Notice label */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold">
                  <Scale className="w-4 h-4 text-cyan-400" />
                  <span>AI Suggestion — Broker Decision Required</span>
                </div>
                <span className="text-xs text-[#8D99A8] font-mono">
                  Showing {analysisResults.candidates.length} ranked candidate subheadings
                </span>
              </div>

              {/* 2-Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* LEFT: Candidate Cards (7 cols) */}
                <div className="lg:col-span-7 space-y-3">
                  {analysisResults.candidates.map((cand, idx) => (
                    <CandidateCard
                      key={cand.code}
                      candidate={cand}
                      isSelected={selectedCandidate?.code === cand.code}
                      onSelect={(c) => setSelectedCandidate(c)}
                      isTopCandidate={idx === 0}
                    />
                  ))}
                </div>

                {/* RIGHT: Fact Questions & Broker Decision Confirmation (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Fact Analysis Panel */}
                  <FactQuestionPanel facts={analysisResults.facts} />

                  {/* Broker Decision Confirmation Card */}
                  <div className="rounded-xl bg-[#0D131D] border border-blue-500/40 p-5 shadow-lg shadow-blue-500/5 space-y-4">
                    <div className="pb-3 border-b border-[#243041] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-blue-400 font-semibold">
                          Confirm Classification
                        </span>
                        <h4 className="text-sm font-semibold text-[#F5F7FA] mt-0.5">
                          Selected Code: {selectedCandidate ? `HS ${selectedCandidate.code}` : 'None Selected'}
                        </h4>
                      </div>
                      {selectedCandidate && (
                        <div className="text-right font-mono">
                          <span className="text-[10px] text-[#8D99A8] block">Confidence</span>
                          <span className="text-xs font-bold text-[#F5F7FA]">
                            {(selectedCandidate.probability * 100).toFixed(1)}%
                          </span>
                        </div>
                      )}
                    </div>

                    {selectedCandidate && (
                      <p className="text-xs text-[#8D99A8] line-clamp-2 leading-relaxed">
                        {selectedCandidate.description}
                      </p>
                    )}

                    {/* Mandatory Reasoning Field */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-[#F5F7FA]">
                          Broker Reasoning (Mandatory)
                        </label>
                        <span className="text-[10px] text-[#8D99A8] font-mono">
                          Will be hashed off-chain
                        </span>
                      </div>

                      {/* Quick Legal Rationale Snippets */}
                      <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                        <button
                          type="button"
                          onClick={() => handleReasoningTemplate('gri3b')}
                          className="px-2 py-0.5 rounded bg-[#121A26] hover:bg-[#1A2535] text-blue-300 border border-[#243041] transition-colors"
                        >
                          + GRI 3(b) Set Rule
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReasoningTemplate('gri1')}
                          className="px-2 py-0.5 rounded bg-[#121A26] hover:bg-[#1A2535] text-blue-300 border border-[#243041] transition-colors"
                        >
                          + GRI 1 Heading
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReasoningTemplate('chap95')}
                          className="px-2 py-0.5 rounded bg-[#121A26] hover:bg-[#1A2535] text-blue-300 border border-[#243041] transition-colors"
                        >
                          + Ch. 95 Exclusion
                        </button>
                      </div>

                      <textarea
                        value={brokerReasoning}
                        onChange={(e) => setBrokerReasoning(e.target.value)}
                        rows={5}
                        placeholder="Explain why this tariff code was selected based on the product characteristics, GRI rules, and available evidence..."
                        className="w-full p-3 rounded-lg bg-[#070B12] text-[#F5F7FA] text-xs border border-[#243041] placeholder-[#8D99A8]/40 focus:outline-none focus:border-blue-500 leading-relaxed font-sans"
                      />
                    </div>

                    {/* Seal CTA Button */}
                    <button
                      onClick={() => {
                        if (!selectedCandidate) {
                          addToast('error', 'Please select an HS candidate code.');
                          return;
                        }
                        if (!brokerReasoning.trim()) {
                          addToast('error', 'Broker reasoning is mandatory before sealing.');
                          return;
                        }
                        setIsSealModalOpen(true);
                      }}
                      className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <ShieldCheck className="w-4 h-4 text-cyan-300" />
                      <span>Confirm & Seal Decision On-Chain</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* 5-Step Blockchain Sealing Modal */}
      {selectedCandidate && (
        <SealModal
          isOpen={isSealModalOpen}
          onClose={() => setIsSealModalOpen(false)}
          candidate={selectedCandidate}
          productDescription={description}
          structuredFields={structuredFields}
          facts={analysisResults?.facts || []}
          candidates={analysisResults?.candidates || []}
          brokerReasoning={brokerReasoning}
        />
      )}
    </div>
  );
}

export default function ClassifyPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-[#8D99A8] flex items-center justify-center gap-2"><Loader2 className="w-5 h-5 animate-spin text-blue-400" /> Loading Classification Studio...</div>}>
      <ClassifyContent />
    </Suspense>
  );
}
