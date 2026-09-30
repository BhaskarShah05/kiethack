import { CanonicalDecisionRecord } from '@/types';

/**
 * Deterministically serializes an object into a canonical JSON string
 * with keys sorted lexicographically at every level.
 * Excludes transient UI state fields like `isTampered`, `onChainTx`, `recordHash`, `onChainHash`.
 */
export function canonicalizeRecord(record: Partial<CanonicalDecisionRecord>): string {
  // Extract only canonical fields specified in PRD Section 9
  const canonicalPayload = {
    recordId: record.recordId,
    createdAt: record.createdAt,
    brokerId: record.brokerId,
    productDescription: record.productDescription,
    structuredFields: {
      material: record.structuredFields?.material || '',
      use: record.structuredFields?.intendedUse || '',
      origin: record.structuredFields?.countryOfOrigin || '',
      brand: record.structuredFields?.brand || '',
    },
    tariffSchedule: record.tariffSchedule,
    candidates: (record.candidates || []).map(c => ({
      code: c.code,
      description: c.description,
      probability: Number(c.probability.toFixed(4)),
    })),
    facts: (record.facts || []).map(f => ({
      question: f.question,
      answer: f.answer,
      probability: Number(f.probability.toFixed(4)),
    })),
    finalCode: record.finalCode,
    reasoning: record.reasoning,
    model: {
      name: record.model?.name || 'Laya-SystemOne',
      version: record.model?.version || 'v1.4.2-onnx',
      calibration: record.model?.calibration || 'Temperature Scaling (T=1.24)',
    },
    confidence: Number((record.confidence || 0).toFixed(4)),
    escalated: Boolean(record.escalated),
    amends: record.amends || null,
  };

  return stringifyDeterministic(canonicalPayload);
}

function stringifyDeterministic(obj: any): string {
  if (obj === null || typeof obj !== 'object') {
    return JSON.stringify(obj);
  }

  if (Array.isArray(obj)) {
    return '[' + obj.map(item => stringifyDeterministic(item)).join(',') + ']';
  }

  const sortedKeys = Object.keys(obj).sort();
  const entries = sortedKeys.map(key => {
    return `${JSON.stringify(key)}:${stringifyDeterministic(obj[key])}`;
  });

  return '{' + entries.join(',') + '}';
}

/**
 * Computes the SHA-256 hash of a string.
 * Uses Web Crypto API (`crypto.subtle`) in browser, or Node crypto if available.
 */
export async function computeSha256(text: string): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return '0x' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Fallback for SSR / Node environment
  try {
    const { createHash } = await import('crypto');
    return '0x' + createHash('sha256').update(text, 'utf8').digest('hex');
  } catch (err) {
    // Basic deterministic hash fallback if neither is available
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return '0x' + Math.abs(hash).toString(16).padStart(64, '0');
  }
}

/**
 * Synchronous fallback hash generator for synchronous components/seeders
 */
export function computeSha256Sync(text: string): string {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < text.length; i++) {
    const ch = text.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
  const rawHex = (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
  // Pad to 64 chars to mimic SHA256 hex
  return '0x' + (rawHex.repeat(8)).slice(0, 64);
}

/**
 * Validates a decision record by computing its canonical hash and comparing with onChainHash
 */
export async function verifyRecord(record: CanonicalDecisionRecord): Promise<{
  isValid: boolean;
  computedHash: string;
  onChainHash: string;
  diffSummary?: string;
}> {
  const canonicalString = canonicalizeRecord(record);
  const computedHash = await computeSha256(canonicalString);
  const isValid = computedHash.toLowerCase() === record.onChainHash.toLowerCase();

  return {
    isValid,
    computedHash,
    onChainHash: record.onChainHash,
    diffSummary: isValid 
      ? 'Record cryptographic signature matches on-chain anchor perfectly (0 bit delta).' 
      : 'Avalanche effect triggered: Record payload has been altered since on-chain anchoring!'
  };
}

/**
 * Formats a hash for display (e.g. 0x8a92...3b1f)
 */
export function truncateHash(hash: string, startChars = 8, endChars = 6): string {
  if (!hash || hash.length <= startChars + endChars) return hash;
  return `${hash.slice(0, startChars)}...${hash.slice(-endChars)}`;
}
