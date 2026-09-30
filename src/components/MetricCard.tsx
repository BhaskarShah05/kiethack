import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'info';
}

export function MetricCard({
  label,
  value,
  subtext,
  icon: Icon,
  variant = 'default',
}: MetricCardProps) {
  let accentBorder = 'border-[#243041]';
  let iconColor = 'text-blue-400 bg-blue-500/10';
  let valueColor = 'text-[#F5F7FA]';

  if (variant === 'success') {
    accentBorder = 'border-[#243041] hover:border-[#22C55E]/40';
    iconColor = 'text-[#22C55E] bg-[#22C55E]/10';
  } else if (variant === 'warning') {
    accentBorder = 'border-[#243041] hover:border-[#F59E0B]/40';
    iconColor = 'text-[#F59E0B] bg-[#F59E0B]/10';
  }

  return (
    <div className={`p-4 md:p-5 rounded-xl bg-[#0D131D] border ${accentBorder} shadow-sm transition-all hover:shadow-md`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#8D99A8] uppercase tracking-wider">
          {label}
        </span>
        <div className={`p-2 rounded-lg ${iconColor}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className={`text-2xl md:text-3xl font-semibold tracking-tight font-mono ${valueColor}`}>
          {value}
        </span>
      </div>
      {subtext && (
        <p className="mt-1 text-xs text-[#8D99A8] flex items-center gap-1.5">
          {subtext}
        </p>
      )}
    </div>
  );
}
