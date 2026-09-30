export type ClassificationStatus = 
  | 'VERIFIED' 
  | 'NEEDS_REVIEW' 
  | 'PENDING_SEAL' 
  | 'TAMPERED' 
  | 'AMENDED';

export interface TariffCandidate {
  code: string;
  description: string;
  probability: number; // e.g. 0.874 for 87.4%
  rank: number;
  chapter: string;
  heading: string;
  subheading: string;
  dutyRate?: string;
  ruleBasis?: string; // e.g. "GRI 1, GRI 3(b) - Essential character of sound reproduction"
  whyCandidate?: string;
  legalNotes?: string[];
  keyDistinguishers?: string;
}

export interface FactQuestion {
  id: string;
  question: string;
  answer: 'yes' | 'no';
  probability: number; // 0.0 - 1.0 (e.g. 0.94)
  relevance: string; // why this fact separates candidates
  impactsCodes: string[];
}

export interface StructuredFields {
  material: string;
  intendedUse: string;
  countryOfOrigin: string;
  brand: string;
  additionalNotes?: string;
}

export interface OnChainAnchor {
  network: 'Polygon Amoy Testnet' | 'Ethereum Sepolia' | 'Arbitrum Sepolia';
  chainId: number;
  contractAddress: string;
  txHash: string;
  blockNumber: number;
  blockTimestamp: string;
  signer: string; // wallet address e.g. 0x7F2a9d812C44B15781E2eB295f74B1Fa26C49b4C
  status: 'CONFIRMED' | 'PENDING' | 'FAILED';
  gasUsed: string;
}

export interface CanonicalDecisionRecord {
  recordId: string;
  createdAt: string; // ISO 8601
  brokerId: string;
  brokerName: string;
  brokerLicense: string;
  productDescription: string;
  structuredFields: StructuredFields;
  tariffSchedule: string; // e.g. "WCO Harmonized System 2022 / 2026 Rev"
  candidates: TariffCandidate[];
  facts: FactQuestion[];
  finalCode: string;
  finalCodeDescription: string;
  reasoning: string;
  model: {
    name: string; // e.g. "Laya-SystemOne"
    version: string; // e.g. "v1.4.2-onnx"
    calibration: string; // e.g. "Temperature Scaling (T=1.24) on WCO Rulings Testbed"
  };
  confidence: number; // Top calibrated probability e.g. 0.874
  escalated: boolean;
  status: ClassificationStatus;
  recordHash: string; // SHA-256 canonical hash of sorted payload
  onChainHash: string; // The immutable hash recorded on-chain
  onChainTx?: OnChainAnchor;
  amends?: string | null; // recordId of parent record if this is an amendment
  amendmentReason?: string;
  amendmentHistory?: {
    version: number;
    amendedAt: string;
    amendedBy: string;
    newCode: string;
    reason: string;
    previousHash: string;
    newHash: string;
  }[];
  // Tamper demo state tracking
  isTampered?: boolean;
  originalDescription?: string;
  tamperMessage?: string;
}

export interface PrecedentItem {
  id: string;
  productTitle: string;
  productDescription: string;
  finalCode: string;
  officialDescription: string;
  similarity: number; // e.g. 0.94
  brokerReasoning: string;
  brokerName: string;
  confidence: number;
  status: 'VERIFIED' | 'AMENDED';
  date: string;
  recordId: string;
  ruleCitation: string;
}

export interface ActivityEvent {
  id: string;
  type: 'CREATED' | 'CONFIRMED' | 'SEALED' | 'VERIFIED' | 'AMENDED' | 'TAMPER_DETECTED';
  title: string;
  description: string;
  recordId: string;
  timestamp: string;
  actor: string;
  badge?: string;
}

export interface BrokerProfile {
  name: string;
  title: string;
  licenseNumber: string;
  firm: string;
  walletAddress: string;
  network: string;
  balanceEth: string;
  status: 'CONNECTED' | 'DISCONNECTED';
}
