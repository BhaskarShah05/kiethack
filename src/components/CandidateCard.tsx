'use client';

import React, { useState } from 'react';
import { TariffCandidate } from '@/types';
import { ChevronDown, ChevronUp, Check, Scale, BookOpen, AlertCircle } from 'lucide-react';

interface CandidateCardProps {
  candidate: TariffCandidate;
  isSelected: boolean;
  onSelect: (candidate: TariffCandidate) => void;
  isTopCandidate?: boolean;
}

export function CandidateCard({
  candidate,
  isSelected,
  onSelect,
  isTopCandidate = false,
}: CandidateCardProps) {
  const [expanded, setExpanded] = useState(isTopCandidate);
  const probPercent = (candidate.probability * 100).toFixed(1);
  const rankStr = String(candidate.rank).padStart(2, '0');

  return (
    <div
      className={`rounded-xl border transition-all duration-200 ${
        isSelected
          ? 'bg-[#121A26] border-blue-500 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500'
          : isTopCandidate
          ? 'bg-[#0D131D] border-blue-500/50 hover:border-blue-400'
          : 'bg-[#0D131D] border-[#243041] hover:border-[#38485E]'
      }`}
    >
      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          {/* Rank & Code */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold px-2 py-1 rounded bg-[#121A26] text-[#8D99A8] border border-[#243041]">
              {rankStr}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg font-bold text-[#F5F7FA] tracking-wide">
                  HS {candidate.code}
                </span>
                {isTopCandidate && (
                  <span className="text-[10px] font-mono uppercase bg-blue-500/15 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded font-medium">
                    Top Shortlist Match
                  </span>
                )}
              </div>
              <span className="text-xs text-[#8D99A8] font-mono">
                {candidate.chapter} • Heading {candidate.heading} {candidate.dutyRate ? `• MFN: ${candidate.dutyRate}` : ''}
              </span>
            </div>
          </div>

          {/* Probability & Select Button */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="font-mono text-base font-bold text-[#F5F7FA]">
                {probPercent}%
              </span>
              <div className="text-[10px] text-[#8D99A8] uppercase font-mono tracking-tight">
                Calibrated
              </div>
            </div>

            <button
              onClick={() => onSelect(candidate)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-[#121A26] text-[#F5F7FA] hover:bg-blue-600 hover:text-white border border-[#243041]'
              }`}
            >
              {isSelected ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Selected</span>
                </>
              ) : (
                <span>Select Code</span>
              )}
            </button>
          </div>
        </div>

        {/* Probability Bar */}
        <div className="mt-3 w-full bg-[#121A26] h-1.5 rounded-full overflow-hidden border border-[#243041]/50">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${
              candidate.probability > 0.6
                ? 'bg-blue-500'
                : candidate.probability > 0.2
                ? 'bg-cyan-500'
                : 'bg-[#8D99A8]'
            }`}
            style={{ width: `${Math.max(candidate.probability * 100, 2)}%` }}
          />
        </div>

        {/* Official Description */}
        <p className="mt-3 text-xs md:text-sm text-[#F5F7FA] leading-relaxed">
          {candidate.description}
        </p>

        {/* Rule basis brief */}
        {candidate.ruleBasis && (
          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#8D99A8] bg-[#070B12]/60 px-2.5 py-1 rounded border border-[#243041]/60">
            <Scale className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="font-mono text-[11px] text-blue-300">Rule Basis:</span>
            <span className="truncate">{candidate.ruleBasis}</span>
          </div>
        )}

        {/* Why this candidate? Accordion */}
        <div className="mt-3 pt-3 border-t border-[#243041]/70">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-between w-full text-xs text-[#8D99A8] hover:text-[#F5F7FA] transition-colors"
          >
            <span className="flex items-center gap-1.5 font-medium">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              Why this candidate?
            </span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {expanded && (
            <div className="mt-2.5 space-y-2 text-xs bg-[#070B12] p-3 rounded-lg border border-[#243041] animate-in fade-in-50 duration-150">
              {candidate.whyCandidate && (
                <div>
                  <div className="text-[11px] font-mono text-cyan-300 font-semibold mb-0.5">
                    Model Analysis:
                  </div>
                  <p className="text-[#8D99A8] leading-relaxed">
                    {candidate.whyCandidate}
                  </p>
                </div>
              )}

              {candidate.keyDistinguishers && (
                <div>
                  <div className="text-[11px] font-mono text-blue-300 font-semibold mb-0.5">
                    Key Distinguishers:
                  </div>
                  <p className="text-[#8D99A8] leading-relaxed">
                    {candidate.keyDistinguishers}
                  </p>
                </div>
              )}

              {candidate.legalNotes && candidate.legalNotes.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono text-[#8D99A8] font-semibold mb-1">
                    Applicable Legal & Explanatory Notes:
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-[#8D99A8]/90">
                    {candidate.legalNotes.map((note, idx) => (
                      <li key={idx} className="leading-snug">{note}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
