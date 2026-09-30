'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  LayoutDashboard, 
  SearchCode, 
  Database, 
  BookmarkCheck, 
  FileCheck2, 
  ShieldCheck, 
  Settings, 
  Cpu, 
  Wallet, 
  ExternalLink,
  RotateCcw,
  Menu,
  X,
  Layers
} from 'lucide-react';
import { truncateHash } from '@/lib/crypto';

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const { broker, resetDemoData } = useApp();

  const navLinks = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Classify', href: '/classify', icon: SearchCode, highlight: true },
    { label: 'Records', href: '/records', icon: Database },
    { label: 'Precedents', href: '/precedents', icon: BookmarkCheck },
    { label: 'Audit Packs', href: '/audit-packs', icon: FileCheck2 },
    { label: 'Verification', href: '/verify', icon: ShieldCheck },
    { label: 'Settings', href: '/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0D131D] border-r border-[#243041] select-none">
      {/* Top Header */}
      <div className="p-5 border-b border-[#243041]/80">
        <Link 
          href="/" 
          className="flex items-center gap-3 group"
          onClick={onMobileClose}
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 p-0.5 flex items-center justify-center shadow-lg shadow-blue-500/10 group-hover:shadow-blue-500/25 transition-all">
            <div className="w-full h-full bg-[#070B12] rounded-[7px] flex items-center justify-center">
              <Layers className="w-5 h-5 text-blue-400 group-hover:scale-105 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-base text-[#F5F7FA] tracking-tight">ClassiLedger</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">v1.1</span>
            </div>
            <p className="text-[11px] text-[#8D99A8] font-mono tracking-wider uppercase">
              Decision Intelligence
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-mono uppercase text-[#8D99A8]/70 tracking-wider">
          Core Workflows
        </div>
        {navLinks.map(item => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                  : 'text-[#8D99A8] hover:text-[#F5F7FA] hover:bg-[#121A26]/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-colors ${
                  isActive ? 'text-blue-400' : 'text-[#8D99A8] group-hover:text-[#F5F7FA]'
                }`} />
                <span>{item.label}</span>
              </div>
              {item.highlight && !isActive && (
                <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded border border-blue-500/30">
                  Model
                </span>
              )}
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-sm shadow-blue-400" />
              )}
            </Link>
          );
        })}

        {/* Quick Demo Reset */}
        <div className="pt-4 px-2">
          <button
            onClick={() => resetDemoData()}
            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 text-xs text-[#8D99A8] hover:text-white bg-[#121A26] hover:bg-[#1A2535] border border-[#243041] rounded-md transition-colors"
            title="Reset dataset to initial state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo State</span>
          </button>
        </div>
      </nav>

      {/* Model & Privacy Trust Box */}
      <div className="mx-3 mb-3 p-2.5 rounded-lg bg-[#070B12]/80 border border-[#243041]/70 text-[11px] space-y-1">
        <div className="flex items-center justify-between text-[#8D99A8]">
          <span className="flex items-center gap-1.5 font-medium text-blue-300">
            <Cpu className="w-3.5 h-3.5" /> Laya-SystemOne
          </span>
          <span className="text-[10px] text-[#22C55E] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>
            Local ONNX
          </span>
        </div>
        <p className="text-[10px] text-[#8D99A8] leading-tight">
          Product descriptions never leave local runtime.
        </p>
      </div>

      {/* Bottom Broker Profile & Wallet Section */}
      <div className="p-4 border-t border-[#243041] bg-[#0A0F17]/90 space-y-3">
        {/* Broker identity */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-500 flex items-center justify-center text-xs font-semibold text-white border border-white/20">
            ER
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-[#F5F7FA] truncate">
              {broker.name}
            </div>
            <div className="text-[11px] text-[#8D99A8] font-mono truncate">
              {broker.licenseNumber}
            </div>
          </div>
        </div>

        {/* Wallet status */}
        <div className="pt-2 border-t border-[#243041]/60 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#8D99A8] flex items-center gap-1">
              <Wallet className="w-3 h-3 text-cyan-400" /> Wallet
            </span>
            <span className="flex items-center gap-1 text-[#22C55E] font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
              Connected
            </span>
          </div>

          <div className="flex items-center justify-between bg-[#121A26] px-2 py-1.5 rounded border border-[#243041] text-[11px] font-mono">
            <span className="text-[#F5F7FA]">{truncateHash(broker.walletAddress, 6, 4)}</span>
            <span className="text-[#8D99A8] text-[10px]">Amoy #80002</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={onMobileClose}
        >
          <div 
            className="fixed inset-y-0 left-0 w-72 bg-[#0D131D] shadow-2xl z-50 transition-transform duration-300"
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute top-3 right-3">
              <button 
                onClick={onMobileClose}
                className="p-1 rounded text-[#8D99A8] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
