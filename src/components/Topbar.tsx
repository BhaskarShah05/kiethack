'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Search, 
  Bell, 
  ShieldCheck, 
  Menu, 
  ExternalLink,
  Lock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { truncateHash } from '@/lib/crypto';

interface TopbarProps {
  title: string;
  subtitle?: string;
  onOpenMobileMenu?: () => void;
}

export function Topbar({ title, subtitle, onOpenMobileMenu }: TopbarProps) {
  const router = useRouter();
  const { broker, events } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/records?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 md:px-8 bg-[#070B12]/80 backdrop-blur-md border-b border-[#243041]">
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-[#8D99A8] hover:text-[#F5F7FA] hover:bg-[#121A26] rounded-md transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div>
          <h1 className="text-base md:text-lg font-semibold text-[#F5F7FA] tracking-tight flex items-center gap-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-[#8D99A8] hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick Global Search */}
        <form onSubmit={handleSearchSubmit} className="relative hidden md:block w-64 lg:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8D99A8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search records, HS codes, rulings..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#0D131D] text-[#F5F7FA] placeholder-[#8D99A8]/60 border border-[#243041] rounded-md focus:outline-none focus:border-blue-500 transition-colors"
          />
        </form>

        {/* Confidentiality Privacy Indicator */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0D131D] border border-[#243041] text-[11px] text-[#8D99A8]">
          <Lock className="w-3 h-3 text-cyan-400" />
          <span>Off-Chain Privacy Active</span>
        </div>

        {/* Testnet Badge */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#121A26] border border-[#243041] text-xs font-mono">
          <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></div>
          <span className="text-[#F5F7FA]">Polygon Amoy</span>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-[#8D99A8] hover:text-[#F5F7FA] hover:bg-[#121A26] rounded-md transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#0D131D] border border-[#243041] rounded-lg shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#243041]">
                <span className="text-xs font-semibold text-[#F5F7FA]">Ledger Activity Notifications</span>
                <span className="text-[10px] text-blue-400 font-mono">Real-Time</span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {events.slice(0, 4).map(ev => (
                  <div key={ev.id} className="p-2 rounded bg-[#070B12] border border-[#243041]/60 text-xs">
                    <div className="flex items-center justify-between text-[11px] font-medium text-[#F5F7FA] mb-0.5">
                      <span>{ev.title}</span>
                      <span className="text-[10px] text-[#8D99A8] font-mono">{ev.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-[#8D99A8] leading-tight">{ev.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Broker Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#243041]">
          <div className="w-7 h-7 rounded-full bg-blue-600/30 border border-blue-400/40 text-blue-300 flex items-center justify-center text-xs font-medium">
            ER
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-medium text-[#F5F7FA] leading-none">
              {broker.name}
            </div>
            <div className="text-[10px] text-[#8D99A8] font-mono leading-none mt-1">
              {broker.licenseNumber}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
