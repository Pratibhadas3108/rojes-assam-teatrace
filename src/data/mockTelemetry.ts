export type TeaGrade = 'CTC-BP' | 'CTC-BOPSM' | 'Orthodox-TGFOP' | 'Orthodox-FTGFOP1' | 'Green-Whole';

export type CustodyStatus = 'Verified' | 'Mass-Balance Alert' | 'MRL Hold';

export interface CustodyEvent {
  stage: string;
  actor: string;
  location: string;
  timestamp: string;
  metric: string;
  hash: string;
  status: 'ok' | 'warn' | 'alert';
}

export interface TeaBatch {
  batchId: string;
  passportCode: string;
  originName: string;
  growerType: 'Heritage Estate' | 'STG Cooperative' | 'Bought-Leaf Factory';
  district: 'Jorhat' | 'Dibrugarh' | 'Tinsukia' | 'Golaghat' | 'Sonitpur';
  gps: string;
  flush: 'First Flush' | 'Second Flush' | 'Monsoon' | 'Autumn';
  grade: TeaGrade;
  greenLeafKg: number;
  madeTeaKg: number;
  outturnPct: number;
  mrlStatus: 'Pass (EU/FSSAI)' | 'Pending Lab' | 'Exceedance Hold';
  giVerified: boolean;
  status: CustodyStatus;
  destination: string;
  rootHash: string;
  events: CustodyEvent[];
}

export interface DistrictCompliance {
  district: string;
  batches: number;
  greenLeafMt: number;
  madeTeaMt: number;
  avgOutturnPct: number;
  giPassRate: number;
  mrlPassRate: number;
}

export const TEA_BATCHES: TeaBatch[] = [
  {
    batchId: 'ASM-JRT-2026-0841',
    passportCode: 'TT-DPP-841A',
    originName: 'Tocklai-Cinnamara STG Cluster (14 Growers)',
    growerType: 'STG Cooperative',
    district: 'Jorhat',
    gps: '26.7294° N, 94.2251° E',
    flush: 'Second Flush',
    grade: 'Orthodox-FTGFOP1',
    greenLeafKg: 4200,
    madeTeaKg: 966,
    outturnPct: 23.0,
    mrlStatus: 'Pass (EU/FSSAI)',
    giVerified: true,
    status: 'Verified',
    destination: 'Guwahati Tea Auction Centre → Hamburg Export',
    rootHash: '0x9f4c...e81b',
    events: [
      {
        stage: '1. Green Leaf Plucking & STG Weighing',
        actor: 'Cinnamara STG Collection Shed #04',
        location: 'Jorhat, Assam',
        timestamp: '2026-06-14 08:15 IST',
        metric: '4,200 kg fine two-leaves-and-a-bud',
        hash: 'a31f8c...19d0',
        status: 'ok',
      },
      {
        stage: '2. Geo-Tagged Leaf Transport',
        actor: 'AS-03-BC-4412 Insulated Van',
        location: 'Jorhat → BLF Gate',
        timestamp: '2026-06-14 10:05 IST',
        metric: 'Temp 24.1°C · Transit 42 min',
        hash: 'b72e4a...88c2',
        status: 'ok',
      },
      {
        stage: '3. Withering & Orthodox Rolling',
        actor: 'Brahmaputra Heritage BLF Line-2',
        location: 'Jorhat, Assam',
        timestamp: '2026-06-14 21:30 IST',
        metric: 'Moisture 68% → 52% · 14h wither',
        hash: 'c91d0f...44a1',
        status: 'ok',
      },
      {
        stage: '4. Fermentation, Drying & Grading',
        actor: 'QA Officer (ID: TRA-QA-19)',
        location: 'Jorhat, Assam',
        timestamp: '2026-06-15 04:40 IST',
        metric: '966 kg made tea · 23.0% outturn',
        hash: 'd45a7b...02f9',
        status: 'ok',
      },
      {
        stage: '5. MRL Lab Clearance & QR Chest Sealing',
        actor: 'TRA Tocklai Analytical Lab',
        location: 'Jorhat, Assam',
        timestamp: '2026-06-16 14:20 IST',
        metric: '32 Chests · QR DPP Minted',
        hash: '9f4c22...e81b',
        status: 'ok',
      },
    ],
  },
  {
    batchId: 'ASM-DBR-2026-0912',
    passportCode: 'TT-DPP-912D',
    originName: 'Upper Assam Heritage Estate — Sec B4',
    growerType: 'Heritage Estate',
    district: 'Dibrugarh',
    gps: '27.4728° N, 94.9120° E',
    flush: 'Second Flush',
    grade: 'CTC-BOPSM',
    greenLeafKg: 8600,
    madeTeaKg: 1935,
    outturnPct: 22.5,
    mrlStatus: 'Pass (EU/FSSAI)',
    giVerified: true,
    status: 'Verified',
    destination: 'Kolkata Tea Auction → Domestic Packager',
    rootHash: '0x4b19...77c3',
    events: [
      {
        stage: '1. Estate Section Plucking & Weighbridge',
        actor: 'Section B4 Field Clerk',
        location: 'Dibrugarh, Assam',
        timestamp: '2026-06-15 09:00 IST',
        metric: '8,600 kg Clonal TV-25 leaf',
        hash: '11a8f2...30b1',
        status: 'ok',
      },
      {
        stage: '2. Withering Trough & CTC Cut',
        actor: 'Estate Factory Line-1',
        location: 'Dibrugarh, Assam',
        timestamp: '2026-06-15 19:45 IST',
        metric: '4-cut CTC · 108°C dryer inlet',
        hash: '22c9d1...55e4',
        status: 'ok',
      },
      {
        stage: '3. Grading & Mass-Balance Check',
        actor: 'Automated Weighbridge Sync',
        location: 'Dibrugarh, Assam',
        timestamp: '2026-06-16 07:10 IST',
        metric: '1,935 kg made tea · 22.5% outturn',
        hash: '4b1908...77c3',
        status: 'ok',
      },
    ],
  },
  {
    batchId: 'ASM-TSK-2026-0938',
    passportCode: 'TT-DPP-938T',
    originName: 'Doomdooma Bought-Leaf Intake #11',
    growerType: 'Bought-Leaf Factory',
    district: 'Tinsukia',
    gps: '27.5681° N, 95.5582° E',
    flush: 'Monsoon',
    grade: 'CTC-BP',
    greenLeafKg: 5000,
    madeTeaKg: 1490,
    outturnPct: 29.8,
    mrlStatus: 'Pending Lab',
    giVerified: false,
    status: 'Mass-Balance Alert',
    destination: 'Quarantined — Outturn Exceeds 25% Threshold',
    rootHash: '0x7e02...aa14',
    events: [
      {
        stage: '1. Green Leaf Gate Intake',
        actor: 'Doomdooma BLF Weighbridge',
        location: 'Tinsukia, Assam',
        timestamp: '2026-06-17 11:20 IST',
        metric: '5,000 kg logged green leaf',
        hash: '61f0b3...12c8',
        status: 'ok',
      },
      {
        stage: '2. Drying & Bagging Outturn Anomaly',
        actor: 'TeaTrace Mass-Balance Engine',
        location: 'Tinsukia, Assam',
        timestamp: '2026-06-18 06:30 IST',
        metric: '1,490 kg output (29.8% > 25% cap)',
        hash: '7e0291...aa14',
        status: 'alert',
      },
    ],
  },
  {
    batchId: 'ASM-GLG-2026-0954',
    passportCode: 'TT-DPP-954G',
    originName: 'Golaghat Organic STG Collective',
    growerType: 'STG Cooperative',
    district: 'Golaghat',
    gps: '26.5239° N, 93.9623° E',
    flush: 'Second Flush',
    grade: 'Orthodox-TGFOP',
    greenLeafKg: 3100,
    madeTeaKg: 728,
    outturnPct: 23.5,
    mrlStatus: 'Pass (EU/FSSAI)',
    giVerified: true,
    status: 'Verified',
    destination: 'Direct D2C & UK Specialty Importer',
    rootHash: '0x5d88...c901',
    events: [
      {
        stage: '1. Organic STG Plucking & GPS Tagging',
        actor: 'Golaghat Collective (9 Growers)',
        location: 'Golaghat, Assam',
        timestamp: '2026-06-18 07:45 IST',
        metric: '3,100 kg certified organic leaf',
        hash: '55a1c9...21b0',
        status: 'ok',
      },
      {
        stage: '2. Processing & QR Pack Serialization',
        actor: 'Golaghat Mini-Factory',
        location: 'Golaghat, Assam',
        timestamp: '2026-06-19 10:15 IST',
        metric: '728 kg made tea · 23.5% outturn',
        hash: '5d8814...c901',
        status: 'ok',
      },
    ],
  },
  {
    batchId: 'ASM-SNP-2026-0970',
    passportCode: 'TT-DPP-970S',
    originName: 'Tezpur North Bank Estate — Sec A2',
    growerType: 'Heritage Estate',
    district: 'Sonitpur',
    gps: '26.6528° N, 92.7926° E',
    flush: 'Monsoon',
    grade: 'Green-Whole',
    greenLeafKg: 2400,
    madeTeaKg: 540,
    outturnPct: 22.5,
    mrlStatus: 'Exceedance Hold',
    giVerified: true,
    status: 'MRL Hold',
    destination: 'Held at Factory — Pre-Harvest Interval Re-Test',
    rootHash: '0x2c41...f309',
    events: [
      {
        stage: '1. Green Leaf Intake',
        actor: 'Tezpur Sec A2 Weighbridge',
        location: 'Sonitpur, Assam',
        timestamp: '2026-06-19 08:30 IST',
        metric: '2,400 kg steamed green leaf',
        hash: '21b4e7...08d2',
        status: 'ok',
      },
      {
        stage: '2. MRL Screening Hold',
        actor: 'NABL Residue Lab Sync',
        location: 'Guwahati, Assam',
        timestamp: '2026-06-20 15:10 IST',
        metric: 'Bifenthrin trace > 0.05 mg/kg EU limit',
        hash: '2c4190...f309',
        status: 'warn',
      },
    ],
  },
];

export const DISTRICT_COMPLIANCE: DistrictCompliance[] = [
  {
    district: 'Jorhat',
    batches: 48,
    greenLeafMt: 194.5,
    madeTeaMt: 44.7,
    avgOutturnPct: 23.0,
    giPassRate: 98.4,
    mrlPassRate: 97.9,
  },
  {
    district: 'Dibrugarh',
    batches: 62,
    greenLeafMt: 312.0,
    madeTeaMt: 70.8,
    avgOutturnPct: 22.7,
    giPassRate: 99.1,
    mrlPassRate: 98.4,
  },
  {
    district: 'Tinsukia',
    batches: 41,
    greenLeafMt: 185.2,
    madeTeaMt: 43.9,
    avgOutturnPct: 23.7,
    giPassRate: 91.2,
    mrlPassRate: 94.0,
  },
  {
    district: 'Golaghat',
    batches: 29,
    greenLeafMt: 112.4,
    madeTeaMt: 26.2,
    avgOutturnPct: 23.3,
    giPassRate: 97.8,
    mrlPassRate: 99.0,
  },
  {
    district: 'Sonitpur',
    batches: 24,
    greenLeafMt: 96.8,
    madeTeaMt: 21.8,
    avgOutturnPct: 22.5,
    giPassRate: 96.5,
    mrlPassRate: 93.8,
  },
];
