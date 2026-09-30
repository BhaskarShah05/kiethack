import React from 'react';
import { FactQuestion } from '@/types';
import { HelpCircle, CheckCircle, XCircle } from 'lucide-react';

interface FactQuestionPanelProps {
  facts: FactQuestion[];
}

export function FactQuestionPanel({ facts }: FactQuestionPanelProps) {
  return (
    <div className="rounded-xl bg-[#0D131D] border border-[#243041] p-5 shadow-sm">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#243041]">
        <div>
          <h3 className="text-sm font-semibold text-[#F5F7FA] flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-400" />
            What separates these candidates?
          </h3>
          <p className="text-xs text-[#8D99A8] mt-0.5">
            Key physical & functional discriminators evaluated by Laya decision classifier
          </p>
        </div>
        <span className="text-[10px] font-mono uppercase bg-[#121A26] text-[#8D99A8] px-2 py-0.5 rounded border border-[#243041]">
          {facts.length} Verified Facts
        </span>
      </div>

      <div className="space-y-3">
        {facts.map((fact) => {
          const isYes = fact.answer.toLowerCase() === 'yes';
          const probPercent = Math.round(fact.probability * 100);

          return (
            <div
              key={fact.id}
              className="p-3.5 rounded-lg bg-[#070B12] border border-[#243041]/80 hover:border-[#243041] transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs md:text-sm font-medium text-[#F5F7FA] leading-snug">
                  {fact.question}
                </p>

                {/* Yes/No Badge with Calibrated probability */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                      isYes
                        ? 'bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30'
                        : 'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30'
                    }`}
                  >
                    {isYes ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <XCircle className="w-3 h-3" />
                    )}
                    {isYes ? 'YES' : 'NO'}
                  </span>
                  <span className="text-xs font-mono text-[#8D99A8]">
                    {probPercent}%
                  </span>
                </div>
              </div>

              <div className="mt-2 text-[11px] text-[#8D99A8] flex items-center justify-between gap-2 pt-2 border-t border-[#243041]/40">
                <span className="truncate">{fact.relevance}</span>
                {fact.impactsCodes && fact.impactsCodes.length > 0 && (
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-[10px] text-[#566474]">Impacts:</span>
                    {fact.impactsCodes.map(code => (
                      <span key={code} className="font-mono text-[10px] bg-[#121A26] px-1.5 py-0.2 rounded text-cyan-300">
                        {code.slice(0, 7)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
