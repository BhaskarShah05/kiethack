'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, AlertTriangle, AlertOctagon, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {toasts.map(toast => {
        let icon = <Info className="w-5 h-5 text-blue-400 shrink-0" />;
        let borderClass = 'border-[#243041]';
        let bgClass = 'bg-[#0D131D]/95';

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0" />;
          borderClass = 'border-[#22C55E]/40';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-[#F59E0B] shrink-0" />;
          borderClass = 'border-[#F59E0B]/40';
        } else if (toast.type === 'error') {
          icon = <AlertOctagon className="w-5 h-5 text-[#EF4444] shrink-0" />;
          borderClass = 'border-[#EF4444]/40';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg border shadow-xl backdrop-blur-md transition-all duration-300 ${borderClass} ${bgClass}`}
          >
            {icon}
            <div className="flex-1 text-sm text-[#F5F7FA] font-medium leading-snug">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#8D99A8] hover:text-[#F5F7FA] transition-colors p-0.5 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
