'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  CanonicalDecisionRecord, 
  BrokerProfile, 
  ActivityEvent, 
  PrecedentItem,
  TariffCandidate 
} from '@/types';
import { 
  INITIAL_SEALED_RECORDS, 
  CURRENT_BROKER, 
  INITIAL_TIMELINE_EVENTS, 
  PRECEDENT_LIBRARY 
} from '@/lib/mockData';
import { canonicalizeRecord, computeSha256 } from '@/lib/crypto';

interface ToastNotification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  timestamp: Date;
}

interface AppContextType {
  records: CanonicalDecisionRecord[];
  broker: BrokerProfile;
  confidenceThreshold: number;
  setConfidenceThreshold: (val: number) => void;
  events: ActivityEvent[];
  precedents: PrecedentItem[];
  toasts: ToastNotification[];
  addToast: (type: ToastNotification['type'], message: string) => void;
  removeToast: (id: string) => void;
  getRecord: (id: string) => CanonicalDecisionRecord | undefined;
  saveNewSealedRecord: (record: CanonicalDecisionRecord) => void;
  tamperRecord: (recordId: string, alteredWord?: string) => Promise<void>;
  restoreRecord: (recordId: string) => Promise<void>;
  amendRecord: (recordId: string, newCode: string, newDescription: string, reason: string) => Promise<void>;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = useState<CanonicalDecisionRecord[]>(INITIAL_SEALED_RECORDS);
  const [broker] = useState<BrokerProfile>(CURRENT_BROKER);
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(0.75); // 75%
  const [events, setEvents] = useState<ActivityEvent[]>(INITIAL_TIMELINE_EVENTS);
  const [precedents] = useState<PrecedentItem[]>(PRECEDENT_LIBRARY);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Load from localStorage if present on client
  useEffect(() => {
    try {
      const saved = localStorage.getItem('classiledger_records_v1');
      if (saved) {
        setRecords(JSON.parse(saved));
      }
    } catch {
      // fallback to initial
    }
  }, []);

  // Save to localStorage when records change
  const persistRecords = (updatedRecords: CanonicalDecisionRecord[]) => {
    setRecords(updatedRecords);
    try {
      localStorage.setItem('classiledger_records_v1', JSON.stringify(updatedRecords));
    } catch {
      // ignore
    }
  };

  const addToast = (type: ToastNotification['type'], message: string) => {
    const newToast: ToastNotification = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      message,
      timestamp: new Date()
    };
    setToasts(prev => [newToast, ...prev.slice(0, 4)]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const getRecord = (id: string) => {
    return records.find(r => r.recordId.toLowerCase() === id.toLowerCase());
  };

  const saveNewSealedRecord = (newRecord: CanonicalDecisionRecord) => {
    const updated = [newRecord, ...records];
    persistRecords(updated);
    
    // Add activity event
    const newEvent: ActivityEvent = {
      id: `ev-${Date.now()}`,
      type: 'SEALED',
      title: 'Classification Sealed On-Chain',
      description: `${newRecord.recordId} (${newRecord.finalCode}) anchored to Polygon Amoy Testnet.`,
      recordId: newRecord.recordId,
      timestamp: 'Just now',
      actor: `${newRecord.brokerName} (${newRecord.brokerLicense})`,
      badge: `${newRecord.onChainTx?.txHash.slice(0, 6)}...${newRecord.onChainTx?.txHash.slice(-4)}`
    };
    setEvents(prev => [newEvent, ...prev]);
    addToast('success', `Record ${newRecord.recordId} successfully anchored to Polygon Amoy Testnet!`);
  };

  const tamperRecord = async (recordId: string, alteredWord = 'telecommunications terminal') => {
    const target = records.find(r => r.recordId === recordId);
    if (!target) return;

    const originalText = target.originalDescription || target.productDescription;
    // Replace "fitness accessory" with "telecommunications terminal" or append
    let modifiedDescription = originalText;
    if (modifiedDescription.includes('fitness accessory')) {
      modifiedDescription = modifiedDescription.replace('fitness accessory', alteredWord);
    } else {
      modifiedDescription = modifiedDescription + ' [MODIFIED: unauthorized revision]';
    }

    const tamperedRecordCopy: CanonicalDecisionRecord = {
      ...target,
      originalDescription: originalText,
      productDescription: modifiedDescription,
      isTampered: true,
      status: 'TAMPERED',
      tamperMessage: `Modified 1 word in product description from "fitness accessory" to "${alteredWord}". Avalanche effect triggered.`
    };

    // Recompute canonical hash of the modified data
    const canonicalString = canonicalizeRecord(tamperedRecordCopy);
    const newHash = await computeSha256(canonicalString);

    tamperedRecordCopy.recordHash = newHash;
    // onChainHash stays fixed to the original seal!

    const updated = records.map(r => r.recordId === recordId ? tamperedRecordCopy : r);
    persistRecords(updated);

    // Event
    const tamperEvent: ActivityEvent = {
      id: `ev-${Date.now()}`,
      type: 'TAMPER_DETECTED',
      title: 'Integrity Check Failed (Tamper Demo)',
      description: `Discrepancy detected in ${recordId}. Stored hash does not match on-chain anchor.`,
      recordId,
      timestamp: 'Just now',
      actor: 'Automated Ledger Sentry',
      badge: '✕ Hash Mismatch'
    };
    setEvents(prev => [tamperEvent, ...prev]);
    addToast('error', `Record ${recordId} modified! Cryptographic integrity check failed.`);
  };

  const restoreRecord = async (recordId: string) => {
    const target = records.find(r => r.recordId === recordId);
    if (!target || !target.originalDescription) return;

    const restoredCopy: CanonicalDecisionRecord = {
      ...target,
      productDescription: target.originalDescription,
      isTampered: false,
      status: 'VERIFIED',
      tamperMessage: undefined
    };

    const canonicalString = canonicalizeRecord(restoredCopy);
    const restoredHash = await computeSha256(canonicalString);
    restoredCopy.recordHash = restoredHash;

    const updated = records.map(r => r.recordId === recordId ? restoredCopy : r);
    persistRecords(updated);

    addToast('success', `Record ${recordId} restored to authentic original state. Hash matches blockchain seal.`);
  };

  const amendRecord = async (recordId: string, newCode: string, newDescription: string, reason: string) => {
    const target = records.find(r => r.recordId === recordId);
    if (!target) return;

    const currentHistory = target.amendmentHistory || [];
    const newVersion = currentHistory.length + 1;

    const updatedRecord: CanonicalDecisionRecord = {
      ...target,
      finalCode: newCode,
      finalCodeDescription: newDescription,
      reasoning: `[AMENDED v${newVersion}] ${reason}. Prior justification: ${target.reasoning}`,
      status: 'AMENDED',
      amends: target.recordId,
      amendmentReason: reason,
      amendmentHistory: [
        ...currentHistory,
        {
          version: newVersion,
          amendedAt: new Date().toISOString(),
          amendedBy: `${broker.name} (${broker.licenseNumber})`,
          newCode,
          reason,
          previousHash: target.recordHash,
          newHash: '0x' + Math.random().toString(16).substring(2, 34) + Math.random().toString(16).substring(2, 34)
        }
      ]
    };

    const canonicalString = canonicalizeRecord(updatedRecord);
    const newHash = await computeSha256(canonicalString);
    updatedRecord.recordHash = newHash;
    updatedRecord.onChainHash = newHash; // Anchored as amendment link

    const updated = records.map(r => r.recordId === recordId ? updatedRecord : r);
    persistRecords(updated);

    const amendEvent: ActivityEvent = {
      id: `ev-${Date.now()}`,
      type: 'AMENDED',
      title: `Record Amended to v${newVersion}`,
      description: `${recordId} re-anchored with transparent revision history to HS ${newCode}.`,
      recordId,
      timestamp: 'Just now',
      actor: `${broker.name} (${broker.licenseNumber})`,
      badge: `v${newVersion} Linked`
    };
    setEvents(prev => [amendEvent, ...prev]);
    addToast('info', `Amendment recorded for ${recordId}. Original hash remains immutably linked.`);
  };

  const resetDemoData = () => {
    persistRecords(INITIAL_SEALED_RECORDS);
    setEvents(INITIAL_TIMELINE_EVENTS);
    addToast('info', 'Demo data reset to default verified state.');
  };

  return (
    <AppContext.Provider
      value={{
        records,
        broker,
        confidenceThreshold,
        setConfidenceThreshold,
        events,
        precedents,
        toasts,
        addToast,
        removeToast,
        getRecord,
        saveNewSealedRecord,
        tamperRecord,
        restoreRecord,
        amendRecord,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
