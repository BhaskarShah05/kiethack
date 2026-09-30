import { 
  CanonicalDecisionRecord, 
  PrecedentItem, 
  ActivityEvent, 
  BrokerProfile, 
  TariffCandidate, 
  FactQuestion 
} from '@/types';

export const CURRENT_BROKER: BrokerProfile = {
  name: 'Elena Rostova',
  title: 'Senior Licensed Customs Broker',
  licenseNumber: 'LCB #44891',
  firm: 'Apex Global Trade Compliance LLP',
  walletAddress: '0x7F2a9d812C44B15781E2eB295f74B1Fa26C49b4C',
  network: 'Polygon Amoy Testnet (Chain ID 80002)',
  balanceEth: '1.425 POL',
  status: 'CONNECTED',
};

export const DEMO_PRODUCT_DEFAULT = {
  description: 'Wireless earbuds with charging case, sold as a fitness accessory.',
  material: 'Molded ABS thermoplastic, silicone ear tips, rechargeable lithium-ion pouch cells',
  intendedUse: 'Hands-free Bluetooth audio streaming and telephonic communication during physical exercise and running',
  countryOfOrigin: 'VN — Vietnam',
  brand: 'AuraPulse Sound Systems',
  additionalNotes: 'Packaged together for retail sale in single blister packaging with USB-C charging cradle.',
};

export const DEMO_CANDIDATES: TariffCandidate[] = [
  {
    code: '8518.30.20',
    description: 'Headphones and earphones, whether or not combined with a microphone, and sets consisting of a microphone and one or more loudspeakers: Other',
    probability: 0.874,
    rank: 1,
    chapter: 'Chapter 85',
    heading: '8518',
    subheading: '8518.30',
    dutyRate: 'Free (General)',
    ruleBasis: 'GRI 1 & GRI 3(b) — Essential character of electroacoustic sound reproduction',
    whyCandidate: 'Primary physical and functional identity is electroacoustic sound reproduction. Bluetooth transceiver and fitness branding are auxiliary to its primary acoustic transducer role.',
    legalNotes: [
      'Note 1(b) to Chapter 85: Heading 8518 includes wireless headphones having built-in receivers.',
      'Explanatory Notes to 8518: Earphones combined with a microphone for telephony remain classified under 8518.30.',
      'CBP Ruling HQ H260821: True Wireless Stereo (TWS) sets with charging cases are classified under heading 8518 as a set.'
    ],
    keyDistinguishers: 'Acoustic drivers present; microphone is subordinate; charging case constitutes composite set packing.'
  },
  {
    code: '8517.62.00',
    description: 'Machines for the reception, conversion and transmission or regeneration of voice, images or other data, including switching and routing apparatus',
    probability: 0.082,
    rank: 2,
    chapter: 'Chapter 85',
    heading: '8517',
    subheading: '8517.62',
    dutyRate: 'Free',
    ruleBasis: 'GRI 1 — Radio apparatus for data transmission',
    whyCandidate: 'Candidate triggered by Bluetooth transceiver circuitry (2.4 GHz RF transmission). Rejected by model because audio output is the intended consumer function, not generic data transmission.',
    legalNotes: [
      'Heading 8517 covers telecommunication apparatus. Where apparatus has acoustic output, 8518 takes precedence under specific description.'
    ],
    keyDistinguishers: 'Focuses on transmission hardware rather than end acoustic transducer.'
  },
  {
    code: '8518.90.80',
    description: 'Parts of microphones, loudspeakers, headphones, earphones and audio-frequency electric amplifiers',
    probability: 0.044,
    rank: 3,
    chapter: 'Chapter 85',
    heading: '8518',
    subheading: '8518.90',
    dutyRate: '4.9%',
    ruleBasis: 'GRI 2(a) — Incomplete or unassembled articles',
    whyCandidate: 'Evaluated in the event the earbuds and charging cradle were imported separately as unassembled parts.',
    legalNotes: [
      'Only applicable if imported in bulk without complete functional matching sets.'
    ],
    keyDistinguishers: 'Applies to standalone components; here the item is imported as a complete retail set.'
  },
  {
    code: '9506.91.00',
    description: 'Articles and equipment for general physical exercise, gymnastics, athletics, other sports or outdoor games',
    probability: 0.018,
    rank: 4,
    chapter: 'Chapter 95',
    heading: '9506',
    subheading: '9506.91',
    dutyRate: '4.6%',
    ruleBasis: 'GRI 1 — Articles for sports/exercise (Broker Trap Avoidance)',
    whyCandidate: 'Common misclassification trap triggered by marketing copy "fitness accessory". Commercial packaging does not override chapter exclusionary notes.',
    legalNotes: [
      'Note 1(m) to Chapter 95 excludes electrical machinery and equipment of Chapter 85 from Chapter 95.',
      'WCO Advisory Opinion 2021: Sports-branded consumer electronics remain classified by electro-mechanical function.'
    ],
    keyDistinguishers: 'Chapter 95 excludes Chapter 85 electronics regardless of sports marketing.'
  },
  {
    code: '8504.40.95',
    description: 'Static converters: Power supplies, charging cradles and adapters',
    probability: 0.011,
    rank: 5,
    chapter: 'Chapter 85',
    heading: '8504',
    subheading: '8504.40',
    dutyRate: '1.5%',
    ruleBasis: 'GRI 3(b) — Component evaluation',
    whyCandidate: 'Evaluated specifically for the charging case module. Under GRI 3(b), the set is classified by its essential character (the earbuds).',
    legalNotes: [
      'Charging case is subordinate packaging providing replenishment to the principal article.'
    ],
    keyDistinguishers: 'Applies only if charging case is imported as standalone accessory.'
  },
  {
    code: '8507.60.00',
    description: 'Electric accumulators: Lithium-ion rechargeable batteries',
    probability: 0.009,
    rank: 6,
    chapter: 'Chapter 85',
    heading: '8507',
    subheading: '8507.60',
    dutyRate: '3.4%',
    ruleBasis: 'GRI 1 — Sub-assembly component',
    whyCandidate: 'Triggered by declared battery material specification. Ruled out as internal component under GRI 2(a).',
    legalNotes: ['Internal cell does not dictate classification of finished consumer apparatus.'],
    keyDistinguishers: 'Component level only.'
  },
  {
    code: '8517.70.00',
    description: 'Parts of telephone sets, smartphones and other apparatus for transmission of voice/data',
    probability: 0.006,
    rank: 7,
    chapter: 'Chapter 85',
    heading: '8517',
    subheading: '8517.70',
    dutyRate: 'Free',
    ruleBasis: 'GRI 1 — Accessory classification',
    whyCandidate: 'Evaluated if classified as dedicated mobile phone peripheral.',
    legalNotes: ['Cross-chapter exclusions give precedence to heading 8518.'],
    keyDistinguishers: 'Not dedicated exclusively to telephone sets (universal Bluetooth audio).'
  },
  {
    code: '8527.99.15',
    description: 'Reception apparatus for radio-broadcasting: Other',
    probability: 0.004,
    rank: 8,
    chapter: 'Chapter 85',
    heading: '8527',
    subheading: '8527.99',
    dutyRate: '6.0%',
    ruleBasis: 'GRI 1 — Broadcast receiver',
    whyCandidate: 'Ruled out because Bluetooth is point-to-point packet radio, not public radio-broadcast spectrum.',
    legalNotes: ['Bluetooth short-range protocols fall under 8517 or 8518.'],
    keyDistinguishers: 'No AM/FM broadcast tuner.'
  }
];

export const DEMO_FACTS: FactQuestion[] = [
  {
    id: 'fact-1',
    question: 'Is the item primarily designed for electroacoustic sound reproduction?',
    answer: 'yes',
    probability: 0.98,
    relevance: 'Separates Heading 8518 (Headphones) from Heading 8517 (Generic telecom transmitters).',
    impactsCodes: ['8518.30.20', '8517.62.00']
  },
  {
    id: 'fact-2',
    question: 'Does the apparatus incorporate a microphone for two-way voice telephony?',
    answer: 'yes',
    probability: 0.94,
    relevance: 'Verifies subheading 8518.30 ("whether or not combined with a microphone").',
    impactsCodes: ['8518.30.20']
  },
  {
    id: 'fact-3',
    question: 'Is it presented in packaging for retail sale together with the charging cradle?',
    answer: 'yes',
    probability: 0.91,
    relevance: 'Invokes GRI 3(b) for goods put up in sets for retail sale.',
    impactsCodes: ['8518.30.20', '8504.40.95']
  },
  {
    id: 'fact-4',
    question: 'Does fitness marketing alter the electro-mechanical nature of the article?',
    answer: 'no',
    probability: 0.99,
    relevance: 'Enforces Chapter 95 Note 1(m) exclusion: sports goods do not include electrical machinery.',
    impactsCodes: ['9506.91.00', '8518.30.20']
  },
  {
    id: 'fact-5',
    question: 'Does the device operate via short-range Bluetooth RF transceiver rather than broadcast radio?',
    answer: 'yes',
    probability: 0.96,
    relevance: 'Eliminates radio-broadcast heading 8527 in favor of Chapter 85 Note 1(b).',
    impactsCodes: ['8527.99.15', '8518.30.20']
  }
];

export const INITIAL_SEALED_RECORDS: CanonicalDecisionRecord[] = [
  {
    recordId: 'REC-2026-0891',
    createdAt: '2026-09-28T14:22:15.000Z',
    brokerId: '0x7F2a9d812C44B15781E2eB295f74B1Fa26C49b4C',
    brokerName: 'Elena Rostova',
    brokerLicense: 'LCB #44891',
    productDescription: 'Wireless earbuds with charging case, sold as a fitness accessory.',
    structuredFields: {
      material: 'Molded ABS thermoplastic, silicone ear tips, rechargeable lithium-ion pouch cells',
      intendedUse: 'Hands-free Bluetooth audio streaming and telephonic communication during physical exercise and running',
      countryOfOrigin: 'VN — Vietnam',
      brand: 'AuraPulse Sound Systems',
      additionalNotes: 'Packaged together for retail sale in single blister packaging with USB-C charging cradle.',
    },
    tariffSchedule: 'WCO Harmonized System 2022 / 2026 Rev (6-digit international + US HTS)',
    candidates: DEMO_CANDIDATES,
    facts: DEMO_FACTS,
    finalCode: '8518.30.20',
    finalCodeDescription: 'Headphones and earphones, whether or not combined with a microphone, and sets consisting of a microphone and one or more loudspeakers: Other',
    reasoning: 'Pursuant to General Rules of Interpretation (GRI) 1 and 3(b), the subject article consists of wireless earphones packaged with a battery charging cradle for retail sale. The essential character is imparted by the earphones under heading 8518, which provide the primary electroacoustic sound reproduction function. Despite commercial labeling as a "fitness accessory", Chapter 95 Note 1(m) explicitly excludes electrical machinery of Chapter 85. Supported by CBP Ruling HQ H260821.',
    model: {
      name: 'Laya-SystemOne',
      version: 'v1.4.2-onnx',
      calibration: 'Temperature Scaling (T=1.24) on WCO Rulings Testbed v2',
    },
    confidence: 0.874,
    escalated: false,
    status: 'VERIFIED',
    recordHash: '0x8f2c3b889e41982bca819024f81c9e7a2b918cd4189025e1a74d89b12480ac19',
    onChainHash: '0x8f2c3b889e41982bca819024f81c9e7a2b918cd4189025e1a74d89b12480ac19',
    onChainTx: {
      network: 'Polygon Amoy Testnet',
      chainId: 80002,
      contractAddress: '0x89205A3A3b2A5538C603ae0292931215A4f8A571',
      txHash: '0x9a82f34710bc88e178129ad01f358b661d98129e013a2bb617cc11b22e1858a2',
      blockNumber: 12849102,
      blockTimestamp: '2026-09-28T14:23:02.000Z',
      signer: '0x7F2a9d812C44B15781E2eB295f74B1Fa26C49b4C',
      status: 'CONFIRMED',
      gasUsed: '47,219 gwei'
    },
    isTampered: false,
  },
  {
    recordId: 'REC-2026-0892',
    createdAt: '2026-09-29T10:14:00.000Z',
    brokerId: '0x7F2a9d812C44B15781E2eB295f74B1Fa26C49b4C',
    brokerName: 'Marcus Vance',
    brokerLicense: 'LCB #38902',
    productDescription: 'Smart cycling helmet with integrated crash-sensor, bone-conduction audio speakers, and emergency LED signaling.',
    structuredFields: {
      material: 'Expanded polystyrene (EPS) foam core, polycarbonate shell, piezoelectric transducers, LED array',
      intendedUse: 'Bicycle safety protective headgear with auxiliary rider communication and hazard warning',
      countryOfOrigin: 'TW — Taiwan',
      brand: 'AeroShield Tech',
      additionalNotes: 'Composite article with multiple independent functions. Essential character contestable between headgear and electronics.',
    },
    tariffSchedule: 'WCO Harmonized System 2022 / 2026 Rev',
    candidates: [
      {
        code: '6506.10.60',
        description: 'Safety headgear, whether or not lined or trimmed: Other',
        probability: 0.412,
        rank: 1,
        chapter: 'Chapter 65',
        heading: '6506',
        subheading: '6506.10',
        whyCandidate: 'Protective crash shell function under GRI 3(b).'
      },
      {
        code: '8518.30.20',
        description: 'Headphones and earphones (Bone conduction transducers)',
        probability: 0.385,
        rank: 2,
        chapter: 'Chapter 85',
        heading: '8518',
        subheading: '8518.30',
        whyCandidate: 'Integrated audio communication subsystem.'
      },
      {
        code: '8531.80.00',
        description: 'Electric sound or visual signalling apparatus: Other',
        probability: 0.203,
        rank: 3,
        chapter: 'Chapter 85',
        heading: '8531',
        subheading: '8531.80',
        whyCandidate: 'Emergency automatic brake and crash beacon LEDs.'
      }
    ],
    facts: [
      {
        id: 'f-helm-1',
        question: 'Does the primary utility reside in preventing cranial impact trauma?',
        answer: 'yes',
        probability: 0.84,
        relevance: 'Addresses essential character test under GRI 3(b).',
        impactsCodes: ['6506.10.60']
      },
      {
        id: 'f-helm-2',
        question: 'Can the audio transducers function if removed from the EPS structural liner?',
        answer: 'no',
        probability: 0.92,
        relevance: 'Subordinates electronics to the monolithic helmet architecture.',
        impactsCodes: ['6506.10.60', '8518.30.20']
      }
    ],
    finalCode: '6506.10.60',
    finalCodeDescription: 'Safety headgear, whether or not lined or trimmed: Other',
    reasoning: 'Model returned low top confidence (41.2% < 75.0% threshold). Escalated for Senior Broker Determination. Applied GRI 3(b): protective headgear imparts the primary character because consumers purchase the article principally for cranial impact safety on public roads; electronic telemetry and speakers are secondary enhancements.',
    model: {
      name: 'Laya-SystemOne',
      version: 'v1.4.2-onnx',
      calibration: 'Temperature Scaling (T=1.24)',
    },
    confidence: 0.412,
    escalated: true,
    status: 'NEEDS_REVIEW',
    recordHash: '0x3c71a90f8452147d3328e46927bf491209b55231c998a4d781523490aa18451f',
    onChainHash: '0x3c71a90f8452147d3328e46927bf491209b55231c998a4d781523490aa18451f',
    onChainTx: {
      network: 'Polygon Amoy Testnet',
      chainId: 80002,
      contractAddress: '0x89205A3A3b2A5538C603ae0292931215A4f8A571',
      txHash: '0x172bc94017ea661138290fbb664817cd8912e73a018bcfa6619114b092c48191',
      blockNumber: 12849340,
      blockTimestamp: '2026-09-29T10:15:30.000Z',
      signer: '0x7F2a9d812C44B15781E2eB295f74B1Fa26C49b4C',
      status: 'CONFIRMED',
      gasUsed: '48,102 gwei'
    },
    isTampered: false,
  },
  {
    recordId: 'REC-2026-0888',
    createdAt: '2026-09-26T09:41:20.000Z',
    brokerId: '0x7F2a9d812C44B15781E2eB295f74B1Fa26C49b4C',
    brokerName: 'Elena Rostova',
    brokerLicense: 'LCB #44891',
    productDescription: 'Portable outdoor power bank 20,000mAh with monocrystalline solar trickle panel.',
    structuredFields: {
      material: 'Lithium-iron-phosphate (LiFePO4) cells, aluminum housing, photovoltaic glass',
      intendedUse: 'Emergency off-grid power storage and USB-C laptop recharging',
      countryOfOrigin: 'KR — South Korea',
      brand: 'SolarVolt Expedition',
    },
    tariffSchedule: 'WCO Harmonized System 2022 / 2026 Rev',
    candidates: [
      {
        code: '8507.60.00',
        description: 'Electric accumulators: Lithium-ion rechargeable batteries',
        probability: 0.912,
        rank: 1,
        chapter: 'Chapter 85',
        heading: '8507',
        subheading: '8507.60',
        whyCandidate: 'Storage battery capacity defines essential character under GRI 3(b).'
      },
      {
        code: '8541.43.00',
        description: 'Photovoltaic cells assembled in modules or made up into panels',
        probability: 0.088,
        rank: 2,
        chapter: 'Chapter 85',
        heading: '8541',
        subheading: '8541.43',
        whyCandidate: 'Solar panel component auxiliary.'
      }
    ],
    facts: [
      {
        id: 'f-pb-1',
        question: 'Does the primary utility derive from storing and delivering stored electric charge?',
        answer: 'yes',
        probability: 0.98,
        relevance: 'GRI 3(b) test vs photovoltaic generator.',
        impactsCodes: ['8507.60.00']
      }
    ],
    finalCode: '8507.60.00',
    finalCodeDescription: 'Electric accumulators: Lithium-ion rechargeable batteries',
    reasoning: 'Classified under heading 8507 per GRI 3(b). The solar cell provides only nominal trickle recharging (1.5W vs 65W battery delivery), so the 20,000mAh accumulator imparts the essential character. Follows WCO Ruling 8507.60/1.',
    model: {
      name: 'Laya-SystemOne',
      version: 'v1.4.2-onnx',
      calibration: 'Temperature Scaling (T=1.24)',
    },
    confidence: 0.912,
    escalated: false,
    status: 'VERIFIED',
    recordHash: '0x5d9821ea9401738be4523910c85741029b384619cd827103ba19827461937102',
    onChainHash: '0x5d9821ea9401738be4523910c85741029b384619cd827103ba19827461937102',
    onChainTx: {
      network: 'Polygon Amoy Testnet',
      chainId: 80002,
      contractAddress: '0x89205A3A3b2A5538C603ae0292931215A4f8A571',
      txHash: '0x442ea9104812bc8819024f3312948719bc44102948172c91823901ba19284710',
      blockNumber: 12847920,
      blockTimestamp: '2026-09-26T09:42:15.000Z',
      signer: '0x7F2a9d812C44B15781E2eB295f74B1Fa26C49b4C',
      status: 'CONFIRMED',
      gasUsed: '47,150 gwei'
    },
    isTampered: false,
  },
  {
    recordId: 'REC-2026-0865',
    createdAt: '2026-09-20T11:05:00.000Z',
    brokerId: '0x7F2a9d812C44B15781E2eB295f74B1Fa26C49b4C',
    brokerName: 'Elena Rostova',
    brokerLicense: 'LCB #44891',
    productDescription: 'Organic cold-pressed virgin olive oil infused with rosemary extract for gourmet culinary dressing.',
    structuredFields: {
      material: 'Extra virgin olive oil (98.5%), natural rosemary oleoresin (1.5%)',
      intendedUse: 'Direct culinary condiment and salad dressing',
      countryOfOrigin: 'ES — Spain',
      brand: 'Terra Nostra Organics',
    },
    tariffSchedule: 'WCO Harmonized System 2022 / 2026 Rev',
    candidates: [
      {
        code: '1509.20.00',
        description: 'Extra virgin olive oil',
        probability: 0.724,
        rank: 1,
        chapter: 'Chapter 15',
        heading: '1509',
        subheading: '1509.20',
        whyCandidate: 'Primary oil base.'
      },
      {
        code: '2103.90.90',
        description: 'Sauces and preparations therefor; mixed condiments and mixed seasonings',
        probability: 0.276,
        rank: 2,
        chapter: 'Chapter 21',
        heading: '2103',
        subheading: '2103.90',
        whyCandidate: 'Flavoring infusion alters virgin oil status.'
      }
    ],
    facts: [
      {
        id: 'f-oil-1',
        question: 'Does the addition of 1.5% rosemary flavoring disqualify the oil from Chapter 15 Note 1?',
        answer: 'yes',
        probability: 0.89,
        relevance: 'Chapter 15 heading 1509 covers only pure, unflavored olive oil.',
        impactsCodes: ['1509.20.00', '2103.90.90']
      }
    ],
    finalCode: '2103.90.90',
    finalCodeDescription: 'Sauces and preparations therefor; mixed condiments and mixed seasonings: Other',
    reasoning: 'Amended decision. Under Chapter 15 legal notes, flavoured or infused olive oils are excluded from heading 1509 and are classified as mixed condiment seasonings under heading 2103 per US Customs Ruling NY N301294.',
    model: {
      name: 'Laya-SystemOne',
      version: 'v1.4.2-onnx',
      calibration: 'Temperature Scaling (T=1.24)',
    },
    confidence: 0.890,
    escalated: false,
    status: 'AMENDED',
    recordHash: '0x192847a0192837bc99102948172c91823901ba19284710442ea9104812bc8819',
    onChainHash: '0x192847a0192837bc99102948172c91823901ba19284710442ea9104812bc8819',
    onChainTx: {
      network: 'Polygon Amoy Testnet',
      chainId: 80002,
      contractAddress: '0x89205A3A3b2A5538C603ae0292931215A4f8A571',
      txHash: '0x712901ba19284710442ea9104812bc8819024f3312948719bc44102948172c91',
      blockNumber: 12845110,
      blockTimestamp: '2026-09-20T11:06:14.000Z',
      signer: '0x7F2a9d812C44B15781E2eB295f74B1Fa26C49b4C',
      status: 'CONFIRMED',
      gasUsed: '47,890 gwei'
    },
    amends: null,
    amendmentHistory: [
      {
        version: 1,
        amendedAt: '2026-09-20T11:05:00.000Z',
        amendedBy: 'Elena Rostova (LCB #44891)',
        newCode: '1509.20.00',
        reason: 'Initial classification as virgin olive oil based on commercial invoice draft',
        previousHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
        newHash: '0x99482104812bc8819024f3312948719bc44102948172c91823901ba192847104'
      },
      {
        version: 2,
        amendedAt: '2026-09-21T15:30:00.000Z',
        amendedBy: 'Elena Rostova (LCB #44891)',
        newCode: '2103.90.90',
        reason: 'Client provided spec sheet confirming 1.5% rosemary oleoresin infusion. Chapter 15 legal notes preclude flavored oils from 1509; reclassified to 2103.90 as mixed condiment.',
        previousHash: '0x99482104812bc8819024f3312948719bc44102948172c91823901ba192847104',
        newHash: '0x192847a0192837bc99102948172c91823901ba19284710442ea9104812bc8819'
      }
    ],
    isTampered: false,
  }
];

export const PRECEDENT_LIBRARY: PrecedentItem[] = [
  {
    id: 'prec-01',
    productTitle: 'Active noise-cancelling Bluetooth sport headset with water-resistant charging cradle',
    productDescription: 'In-ear true wireless stereo (TWS) headphones packaged with IPX7 charging cradle, sold with athletic silicone ear stabilizers.',
    finalCode: '8518.30.20',
    officialDescription: 'Headphones and earphones, whether or not combined with a microphone: Other',
    similarity: 0.94,
    brokerReasoning: 'Applied GRI 1 and 3(b). Essential character lies in the acoustic drivers. Charging case is accessory packaging. Disregard athletic marketing under Chapter 95 Note 1(m).',
    brokerName: 'Elena Rostova (LCB #44891)',
    confidence: 0.892,
    status: 'VERIFIED',
    date: '2026-06-12',
    recordId: 'REC-2026-0412',
    ruleCitation: 'GRI 3(b) / WCO 8518.30 / CBP HQ H260821'
  },
  {
    id: 'prec-02',
    productTitle: 'Over-ear studio monitoring headphones with detachable 3.5mm coiled cord & Bluetooth 5.2',
    productDescription: 'Professional DJ monitoring headset featuring dual wired/wireless connectivity and foldable earcups.',
    finalCode: '8518.30.20',
    officialDescription: 'Headphones and earphones: Other',
    similarity: 0.88,
    brokerReasoning: 'Dual connectivity does not alter primary classification under 8518.30. Corded adapter and carry pouch classified as composite set.',
    brokerName: 'Marcus Vance (LCB #38902)',
    confidence: 0.924,
    status: 'VERIFIED',
    date: '2026-05-18',
    recordId: 'REC-2026-0377',
    ruleCitation: 'GRI 1 / Explanatory Note 8518'
  },
  {
    id: 'prec-03',
    productTitle: 'Tactical bone-conduction communication headset with boom microphone',
    productDescription: 'Headset utilizing bone-conduction vibration transducers for ambient audio bypass, with noise-canceling boom mic for radio comms.',
    finalCode: '8518.30.10',
    officialDescription: 'Line telephone sets; earphones combined with a microphone for telephony',
    similarity: 0.81,
    brokerReasoning: 'Dedicated telephonic communication apparatus with integrated microphone for two-way tactical voice comms.',
    brokerName: 'Sarah Jenkins (LCB #51204)',
    confidence: 0.865,
    status: 'VERIFIED',
    date: '2026-04-03',
    recordId: 'REC-2026-0290',
    ruleCitation: 'GRI 1 / Heading 8518 Subheading Note'
  },
  {
    id: 'prec-04',
    productTitle: 'Smart swimming goggles with in-lens micro-OLED heads-up display and heart rate sensor',
    productDescription: 'Aquatic performance goggles with optical seal, real-time pace display projected in lens corner, and Bluetooth sync.',
    finalCode: '9004.90.00',
    officialDescription: 'Spectacles, goggles and the like, corrective, protective or other: Other',
    similarity: 0.72,
    brokerReasoning: 'Applied GRI 3(b). Protective watertight swimming goggle framework imparts the essential character; HUD sensor is an auxiliary telemetry aid.',
    brokerName: 'Elena Rostova (LCB #44891)',
    confidence: 0.781,
    status: 'VERIFIED',
    date: '2026-03-14',
    recordId: 'REC-2026-0188',
    ruleCitation: 'GRI 3(b) / Heading 9004'
  },
  {
    id: 'prec-05',
    productTitle: 'Solar charging phone case with integrated 4,500mAh lithium-polymer backup accumulator',
    productDescription: 'Protective polyurethane smartphone sleeve incorporating embedded solar panel and auxiliary power bank circuit.',
    finalCode: '8507.60.00',
    officialDescription: 'Electric accumulators: Lithium-ion rechargeable batteries',
    similarity: 0.69,
    brokerReasoning: 'Essential character under GRI 3(b) determined by auxiliary power bank capacity rather than basic plastic protective sleeve.',
    brokerName: 'David Cho (LCB #42109)',
    confidence: 0.840,
    status: 'VERIFIED',
    date: '2026-02-28',
    recordId: 'REC-2026-0145',
    ruleCitation: 'GRI 3(b) / CBP Ruling N310492'
  }
];

export const INITIAL_TIMELINE_EVENTS: ActivityEvent[] = [
  {
    id: 'ev-1',
    type: 'SEALED',
    title: 'Decision Sealed On-Chain',
    description: 'REC-2026-0891 (HS 8518.30) anchored to Polygon Amoy Testnet block #12849102',
    recordId: 'REC-2026-0891',
    timestamp: '2 hours ago',
    actor: 'Elena Rostova (LCB #44891)',
    badge: '0x9a82...58a2'
  },
  {
    id: 'ev-2',
    type: 'CONFIRMED',
    title: 'Senior Review Escalated',
    description: 'REC-2026-0892 flagged for low confidence (41.2%). Assigned to Senior Broker review.',
    recordId: 'REC-2026-0892',
    timestamp: '4 hours ago',
    actor: 'Marcus Vance (LCB #38902)',
    badge: 'Senior Review'
  },
  {
    id: 'ev-3',
    type: 'VERIFIED',
    title: 'Independent Verification Check',
    description: 'Audit query performed on REC-2026-0888. Cryptographic hash matched on-chain seal (0 bit delta).',
    recordId: 'REC-2026-0888',
    timestamp: 'Yesterday',
    actor: 'Customs Auditor Portal #19',
    badge: '✓ Verified'
  },
  {
    id: 'ev-4',
    type: 'AMENDED',
    title: 'Decision Record Amended',
    description: 'REC-2026-0865 reclassified from 1509.20 to 2103.90 per Ruling NY N301294 with linked parent hash.',
    recordId: 'REC-2026-0865',
    timestamp: '2 days ago',
    actor: 'Elena Rostova (LCB #44891)',
    badge: 'v2 Linked'
  },
  {
    id: 'ev-5',
    type: 'CREATED',
    title: 'Candidate Shortlist Generated',
    description: 'Laya-SystemOne calibrated 8 candidates for fitness audio accessory with 87.4% top probability.',
    recordId: 'REC-2026-0891',
    timestamp: '3 days ago',
    actor: 'Laya v1.4.2-onnx',
    badge: '8 Candidates'
  }
];
