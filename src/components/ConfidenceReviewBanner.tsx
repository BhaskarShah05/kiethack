import React from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ConfidenceReviewBannerProps {
  confidence: number; // e.g. 0.618 or 0.874
  threshold: number; // e.g. 0.75
  isEscalated?: boolean;
}

export function ConfidenceReviewBanner({
  confidence,
  threshold,
  isEscalated = false,
}: ConfidenceReviewBannerProps) {
  const isBelowThreshold = confidence < threshold;
  const confPercent = (confidence * 100).toFixed(1);
  const threshPercent = (threshold * 100).toFixed(0);

  if (!isBelowThreshold) {
    return (
      <div className="rounded-xl bg-[#0D131D] border border-[#243041] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase font-mono tracking-wider text-[#22C55E] font-semibold">
              Confidence Calibrated • Above Threshold
            </div>
            <p className="text-xs text-[#8D99A8] mt-0.5">
              Candidate probability meets brokerage confidence protocol ({threshPercent}% threshold).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-[#070B12] px-3 py-2 rounded-lg border border-[#243041] text-xs font-mono">
          <div>
            <span className="text-[#8D99A8] block text-[10px]">Confidence</span>
            <span className="text-[#F5F7FA] font-bold">{confPercent}%</span>
          </div>
          <div className="w-px h-6 bg-[#243041]"></div>
          <div>
            <span className="text-[#8D99A8] block text-[10px]">Threshold</span>
            <span className="text-[#8D99A8] font-bold">{threshPercent}%</span>
          </div>
          <div className="w-px h-6 bg-[#243041]"></div>
          <div>
            <span className="text-[#8D99A8] block text-[10px]">Escalation</span>
            <span className="text-[#22C55E] font-bold">Standard</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-[#F59E0B]/5 border border-[#F59E0B]/40 p-4 md:p-5 shadow-lg shadow-amber-500/5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30 shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider font-bold text-[#F59E0B]">
                Senior Review Recommended
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40">
                Escalation Required
              </span>
            </div>
            <p className="text-xs md:text-sm text-[#F5F7FA] mt-1 font-medium">
              Model confidence is below the configured brokerage threshold. Do not rely on a single recommendation.
            </p>
            <p className="text-xs text-[#8D99A8] mt-0.5">
              Tariff candidates exhibit competing Chapter classifications. A licensed senior broker must independently evaluate GRI notes before sealing.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 bg-[#070B12] px-4 py-2.5 rounded-lg border border-[#F59E0B]/30 text-xs font-mono">
          <div>
            <span className="text-[#8D99A8] block text-[10px]">Confidence</span>
            <span className="text-[#EF4444] font-bold text-sm">{confPercent}%</span>
          </div>
          <div className="w-px h-7 bg-[#243041]"></div>
          <div>
            <span className="text-[#8D99A8] block text-[10px]">Threshold</span>
            <span className="text-[#8D99A8] font-bold text-sm">{threshPercent}%</span>
          </div>
          <div className="w-px h-7 bg-[#243041]"></div>
          <div>
            <span className="text-[#8D99A8] block text-[10px]">Escalation Status</span>
            <span className="text-[#F59E0B] font-bold text-xs uppercase">Needs Review</span>
          </div>
        </div>
      </div>
    </div>
  );
}
