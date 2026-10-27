import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Building2,
  Database,
  Flame,
  ArrowLeftRight,
  HardDriveDownload,
  ScrollText,
  Activity,
  ShieldCheck,
  Settings,
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  RefreshCw,
  Plus,
  Download,
  Filter,
  ExternalLink,
  Copy,
  Check,
  Terminal,
  Server,
  Layers,
  Lock,
  Sparkles,
  Cpu,
  Zap,
  MoreVertical,
  ArrowUpRight,
  Play,
  RotateCcw,
  Eye,
  X,
  FolderOpen,
  FileJson,
  KeyRound,
  Globe,
  Menu
} from 'lucide-react';

// ==========================================
// 1. TYPES & INTERFACES
// ==========================================

type NavSection =
  | 'overview'
  | 'companies'
  | 'explorer'
  | 'firebase'
  | 'sync'
  | 'backup'
  | 'logs'
  | 'monitoring'
  | 'access'
  | 'settings';

interface Company {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  environment: 'Production' | 'Multi-Region' | 'Hybrid';
  projectsCount: number;
  totalRecords: string;
  storageUsed: string;
  storageQuota: string;
  syncHealth: number;
  region: string;
  accentColor: string;
  lastActive: string;
}

interface FirebaseProject {
  id: string;
  projectId: string;
  name: string;
  companyId: string;
  companyName: string;
  environment: 'prod' | 'staging' | 'analytics';
  region: string;
  status: 'Connected' | 'Syncing' | 'Degraded' | 'Disconnected';
  collectionsCount: number;
  documentsCount: string;
  storageUsed: string;
  storagePercent: number;
  lastSync: string;
  serviceAccount: string;
}

interface SyncPipeline {
  id: string;
  name: string;
  sourceProject: string;
  sourceCompany: string;
  destinationProject: string;
  destinationCompany: string;
  mode: 'Real-time CDC' | 'Scheduled Batch (15m)' | 'Bi-directional';
  status: 'Active' | 'Syncing' | 'Paused' | 'Warning';
  throughput: string;
  recordsSynced24h: string;
  lastSyncTime: string;
  latencyMs: number;
}

interface BackupSnapshot {
  id: string;
  snapshotId: string;
  projectId: string;
  companyName: string;
  type: 'Automated Daily' | 'Pre-Sync Point' | 'Manual Snapshot';
  size: string;
  recordsCount: string;
  createdAt: string;
  retention: string;
  status: 'Verified' | 'Completed' | 'In Progress';
  encryption: 'AES-256-GCM';
}

interface ExplorerRecord {
  id: string;
  docId: string;
  collection: string;
  company: string;
  projectId: string;
  schemaVersion: string;
  sizeKb: number;
  updatedAt: string;
  status: 'Indexed' | 'Pending' | 'Archived';
  payloadPreview: Record<string, any>;
}

interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  action: string;
  resource: string;
  project: string;
  company: string;
  status: 'Success' | 'Warning' | 'Blocked';
  ipAddress: string;
  durationMs: number;
}

// ==========================================
// 2. REALISTIC ENTERPRISE DUMMY DATA
// ==========================================

const COMPANIES: Company[] = [
  {
    id: 'comp-kashish',
    name: 'Kashish AI',
    slug: 'kashish-ai',
    tagline: 'Generative AI Models, Vector Embeddings & Inference Telemetry',
    environment: 'Multi-Region',
    projectsCount: 4,
    totalRecords: '18.4M',
    storageUsed: '412.8 GB',
    storageQuota: '500 GB',
    syncHealth: 99.98,
    region: 'us-central1 (Iowa)',
    accentColor: 'blue',
    lastActive: '14 seconds ago',
  },
  {
    id: 'comp-nexor-tech',
    name: 'Nexor Technologies',
    slug: 'nexor-technologies',
    tagline: 'Core Enterprise ERP, Client Ledger & Distributed Microservices',
    environment: 'Production',
    projectsCount: 5,
    totalRecords: '24.9M',
    storageUsed: '684.2 GB',
    storageQuota: '1 TB',
    syncHealth: 99.95,
    region: 'europe-west1 (Belgium)',
    accentColor: 'indigo',
    lastActive: '2 minutes ago',
  },
  {
    id: 'comp-nexor-sparks',
    name: 'Nexor Sparks',
    slug: 'nexor-sparks',
    tagline: 'High-Velocity IoT Events, Edge Telemetry & Real-time Consumer Feeds',
    environment: 'Hybrid',
    projectsCount: 3,
    totalRecords: '9.1M',
    storageUsed: '198.4 GB',
    storageQuota: '250 GB',
    syncHealth: 98.72,
    region: 'asia-south1 (Mumbai)',
    accentColor: 'amber',
    lastActive: 'Just now',
  },
];

const INITIAL_PROJECTS: FirebaseProject[] = [
  {
    id: 'fp-1',
    projectId: 'kashish-ai-prod-core',
    name: 'Kashish AI Production Core',
    companyId: 'comp-kashish',
    companyName: 'Kashish AI',
    environment: 'prod',
    region: 'us-central1',
    status: 'Connected',
    collectionsCount: 34,
    documentsCount: '11,420,900',
    storageUsed: '268.4 GB',
    storagePercent: 74,
    lastSync: '22 sec ago',
    serviceAccount: 'ndti-agent@kashish-ai-prod-core.iam.gserviceaccount.com',
  },
  {
    id: 'fp-2',
    projectId: 'kashish-vector-store-v2',
    name: 'Kashish Vector Metadata Hub',
    companyId: 'comp-kashish',
    companyName: 'Kashish AI',
    environment: 'analytics',
    region: 'us-east4',
    status: 'Syncing',
    collectionsCount: 18,
    documentsCount: '6,980,110',
    storageUsed: '144.4 GB',
    storagePercent: 58,
    lastSync: 'Active stream',
    serviceAccount: 'ndti-sync@kashish-vector-store-v2.iam.gserviceaccount.com',
  },
  {
    id: 'fp-3',
    projectId: 'nexor-tech-erp-main',
    name: 'Nexor Enterprise ERP Primary',
    companyId: 'comp-nexor-tech',
    companyName: 'Nexor Technologies',
    environment: 'prod',
    region: 'europe-west1',
    status: 'Connected',
    collectionsCount: 62,
    documentsCount: '16,890,450',
    storageUsed: '482.0 GB',
    storagePercent: 81,
    lastSync: '1 min ago',
    serviceAccount: 'ndti-master@nexor-tech-erp-main.iam.gserviceaccount.com',
  },
  {
    id: 'fp-4',
    projectId: 'nexor-tech-billing-vault',
    name: 'Nexor Global Billing & Ledger',
    companyId: 'comp-nexor-tech',
    companyName: 'Nexor Technologies',
    environment: 'prod',
    region: 'us-central1',
    status: 'Connected',
    collectionsCount: 27,
    documentsCount: '8,012,300',
    storageUsed: '202.2 GB',
    storagePercent: 45,
    lastSync: '4 mins ago',
    serviceAccount: 'ndti-vault@nexor-tech-billing-vault.iam.gserviceaccount.com',
  },
  {
    id: 'fp-5',
    projectId: 'nexor-sparks-stream-io',
    name: 'Nexor Sparks Telemetry Stream',
    companyId: 'comp-nexor-sparks',
    companyName: 'Nexor Sparks',
    environment: 'prod',
    region: 'asia-south1',
    status: 'Connected',
    collectionsCount: 19,
    documentsCount: '7,450,800',
    storageUsed: '156.1 GB',
    storagePercent: 62,
    lastSync: '38 sec ago',
    serviceAccount: 'ndti-stream@nexor-sparks-stream-io.iam.gserviceaccount.com',
  },
  {
    id: 'fp-6',
    projectId: 'nexor-sparks-sandbox-09',
    name: 'Nexor Sparks Staging Node',
    companyId: 'comp-nexor-sparks',
    companyName: 'Nexor Sparks',
    environment: 'staging',
    region: 'asia-south1',
    status: 'Degraded',
    collectionsCount: 14,
    documentsCount: '1,649,200',
    storageUsed: '42.3 GB',
    storagePercent: 28,
    lastSync: '47 mins ago',
    serviceAccount: 'ndti-stage@nexor-sparks-sandbox-09.iam.gserviceaccount.com',
  },
];

const INITIAL_PIPELINES: SyncPipeline[] = [
  {
    id: 'pipe-01',
    name: 'Kashish AI Core → NDTI Central Lakehouse',
    sourceProject: 'kashish-ai-prod-core',
    sourceCompany: 'Kashish AI',
    destinationProject: 'ndti-central-warehouse-prod',
    destinationCompany: 'NDTI Core Fabric',
    mode: 'Real-time CDC',
    status: 'Active',
    throughput: '4,820 ops/sec',
    recordsSynced24h: '1,428,900',
    lastSyncTime: 'Continuous (4s lag)',
    latencyMs: 38,
  },
  {
    id: 'pipe-02',
    name: 'Nexor ERP → Kashish AI Customer Intelligence',
    sourceProject: 'nexor-tech-erp-main',
    sourceCompany: 'Nexor Technologies',
    destinationProject: 'kashish-vector-store-v2',
    destinationCompany: 'Kashish AI',
    mode: 'Scheduled Batch (15m)',
    status: 'Active',
    throughput: '1,910 ops/sec',
    recordsSynced24h: '684,210',
    lastSyncTime: '4 minutes ago',
    latencyMs: 112,
  },
  {
    id: 'pipe-03',
    name: 'Nexor Sparks Edge → Nexor ERP Analytics',
    sourceProject: 'nexor-sparks-stream-io',
    sourceCompany: 'Nexor Sparks',
    destinationProject: 'nexor-tech-erp-main',
    destinationCompany: 'Nexor Technologies',
    mode: 'Bi-directional',
    status: 'Syncing',
    throughput: '3,190 ops/sec',
    recordsSynced24h: '942,100',
    lastSyncTime: 'Sync in progress (92%)',
    latencyMs: 64,
  },
];

const INITIAL_BACKUPS: BackupSnapshot[] = [
  {
    id: 'bk-9921',
    snapshotId: 'snap-20250514-0400-kashish',
    projectId: 'kashish-ai-prod-core',
    companyName: 'Kashish AI',
    type: 'Automated Daily',
    size: '268.4 GB',
    recordsCount: '11,420,900',
    createdAt: 'Today, 04:00 UTC',
    retention: '90 Days (Coldline)',
    status: 'Verified',
    encryption: 'AES-256-GCM',
  },
  {
    id: 'bk-9920',
    snapshotId: 'snap-20250514-0330-nexor-erp',
    projectId: 'nexor-tech-erp-main',
    companyName: 'Nexor Technologies',
    type: 'Automated Daily',
    size: '482.0 GB',
    recordsCount: '16,890,450',
    createdAt: 'Today, 03:30 UTC',
    retention: '365 Days (Archive)',
    status: 'Verified',
    encryption: 'AES-256-GCM',
  },
  {
    id: 'bk-9919',
    snapshotId: 'snap-20250513-2215-sparks',
    projectId: 'nexor-sparks-stream-io',
    companyName: 'Nexor Sparks',
    type: 'Pre-Sync Point',
    size: '155.8 GB',
    recordsCount: '7,412,000',
    createdAt: 'Yesterday, 22:15 UTC',
    retention: '30 Days (Standard)',
    status: 'Completed',
    encryption: 'AES-256-GCM',
  },
  {
    id: 'bk-9918',
    snapshotId: 'snap-20250513-1800-billing',
    projectId: 'nexor-tech-billing-vault',
    companyName: 'Nexor Technologies',
    type: 'Manual Snapshot',
    size: '201.9 GB',
    recordsCount: '8,009,120',
    createdAt: 'Yesterday, 18:00 UTC',
    retention: '7 Years (Compliance)',
    status: 'Verified',
    encryption: 'AES-256-GCM',
  },
];

const EXPLORER_RECORDS: ExplorerRecord[] = [
  {
    id: 'rec-1',
    docId: 'usr_ksh_9928410a',
    collection: 'enterprise_tenants',
    company: 'Kashish AI',
    projectId: 'kashish-ai-prod-core',
    schemaVersion: 'v4.2',
    sizeKb: 14.8,
    updatedAt: '2025-05-14 14:22:09 UTC',
    status: 'Indexed',
    payloadPreview: {
      tenantId: 'tnt_kashish_global_01',
      tier: 'ENTERPRISE_DEDICATED',
      modelQuotaTokens: 500000000,
      activeVectorNamespaces: 18,
      complianceFlags: ['SOC2_TYPE_II', 'ISO27001', 'GDPR_EU'],
    },
  },
  {
    id: 'rec-2',
    docId: 'inv_nxr_8841209b',
    collection: 'ledger_settlements',
    company: 'Nexor Technologies',
    projectId: 'nexor-tech-billing-vault',
    schemaVersion: 'v3.0',
    sizeKb: 8.2,
    updatedAt: '2025-05-14 14:19:41 UTC',
    status: 'Indexed',
    payloadPreview: {
      settlementId: 'stl_9948102',
      currency: 'USD',
      amountCents: 14850000,
      counterparty: 'Kashish AI Holdings Ltd.',
      verificationHash: '0x99f8a7c6d5e4b3a21098',
    },
  },
  {
    id: 'rec-3',
    docId: 'evt_spk_7731904c',
    collection: 'iot_telemetry_streams',
    company: 'Nexor Sparks',
    projectId: 'nexor-sparks-stream-io',
    schemaVersion: 'v2.8',
    sizeKb: 4.1,
    updatedAt: '2025-05-14 14:18:12 UTC',
    status: 'Indexed',
    payloadPreview: {
      deviceCluster: 'mumbai-edge-zone-04',
      activeSensors: 4096,
      avgLatencyMs: 11.4,
      packetLossRatio: 0.0002,
      firmwareBuild: 'sparks-os-5.1.9',
    },
  },
  {
    id: 'rec-4',
    docId: 'emb_ksh_6620194d',
    collection: 'vector_embeddings_meta',
    company: 'Kashish AI',
    projectId: 'kashish-vector-store-v2',
    schemaVersion: 'v4.2',
    sizeKb: 32.6,
    updatedAt: '2025-05-14 14:15:02 UTC',
    status: 'Pending',
    payloadPreview: {
      indexName: 'enterprise-knowledge-graph-1536d',
      dimensions: 1536,
      metric: 'cosine_similarity',
      shards: 12,
      replicationFactor: 3,
    },
  },
  {
    id: 'rec-5',
    docId: 'org_nxr_5519082e',
    collection: 'erp_workforce_nodes',
    company: 'Nexor Technologies',
    projectId: 'nexor-tech-erp-main',
    schemaVersion: 'v3.5',
    sizeKb: 19.4,
    updatedAt: '2025-05-14 14:09:55 UTC',
    status: 'Indexed',
    payloadPreview: {
      departmentCode: 'ENG-CLOUD-INFRA',
      costCenter: 'CC-4019-EU',
      authorizedPrincipals: 142,
      ssoEnforced: true,
    },
  },
  {
    id: 'rec-6',
    docId: 'cfg_spk_4401928f',
    collection: 'edge_routing_policies',
    company: 'Nexor Sparks',
    projectId: 'nexor-sparks-sandbox-09',
    schemaVersion: 'v2.9-rc1',
    sizeKb: 6.7,
    updatedAt: '2025-05-14 13:51:19 UTC',
    status: 'Archived',
    payloadPreview: {
      routeGroup: 'canary-ingress-ap-south',
      failoverStrategy: 'MULTI_CLOUD_DNS',
      maxBurstRps: 250000,
    },
  },
];

const INITIAL_LOGS: AuditLogItem[] = [
  {
    id: 'log-101',
    timestamp: '2025-05-14 14:24:11.402 UTC',
    actor: 'arjun.mehta@ndti.cloud',
    actorRole: 'Principal Cloud Architect',
    action: 'firestore.collections.syncTrigger',
    resource: 'projects/kashish-ai-prod-core/databases/(default)',
    project: 'kashish-ai-prod-core',
    company: 'Kashish AI',
    status: 'Success',
    ipAddress: '10.142.0.19',
    durationMs: 142,
  },
  {
    id: 'log-102',
    timestamp: '2025-05-14 14:18:05.118 UTC',
    actor: 'system-scheduler@ndti-control.iam',
    actorRole: 'Automated Pipeline Daemon',
    action: 'backup.snapshots.verifyIntegrity',
    resource: 'snapshots/snap-20250514-0400-kashish',
    project: 'kashish-ai-prod-core',
    company: 'Kashish AI',
    status: 'Success',
    ipAddress: 'internal-vpc-01',
    durationMs: 890,
  },
  {
    id: 'log-103',
    timestamp: '2025-05-14 13:55:49.004 UTC',
    actor: 'elena.rostova@nexortech.io',
    actorRole: 'Organization Data Steward',
    action: 'iam.serviceAccounts.rotateKey',
    resource: 'ndti-master@nexor-tech-erp-main',
    project: 'nexor-tech-erp-main',
    company: 'Nexor Technologies',
    status: 'Success',
    ipAddress: '185.220.101.44',
    durationMs: 215,
  },
  {
    id: 'log-104',
    timestamp: '2025-05-14 13:42:19.772 UTC',
    actor: 'sync-worker-09@ndti-control.iam',
    actorRole: 'CDC Replication Engine',
    action: 'sync.stream.highWatermarkWarning',
    resource: 'projects/nexor-sparks-sandbox-09',
    project: 'nexor-sparks-sandbox-09',
    company: 'Nexor Sparks',
    status: 'Warning',
    ipAddress: 'internal-vpc-03',
    durationMs: 1420,
  },
  {
    id: 'log-105',
    timestamp: '2025-05-14 13:10:02.619 UTC',
    actor: 'unknown-client@203.0.113.88',
    actorRole: 'Unauthenticated Request',
    action: 'storage.buckets.exportUnencrypted',
    resource: 'projects/nexor-tech-billing-vault',
    project: 'nexor-tech-billing-vault',
    company: 'Nexor Technologies',
    status: 'Blocked',
    ipAddress: '203.0.113.88',
    durationMs: 12,
  },
];

// ==========================================
// 3. CUSTOM BRAND LOGO COMPONENT (MATCHES UPLOADED NDTI IMAGE)
// ==========================================

const NDTILogo: React.FC<{ collapsed?: boolean; showSubtitle?: boolean }> = ({
  collapsed = false,
  showSubtitle = true,
}) => {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* Vector Cloud + 'N' Ribbon + Orange Right Lobe matching uploaded NDTI brand mark */}
      <svg
        viewBox="0 0 120 82"
        className="w-10 h-7 flex-shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ndtiBlueLeft" x1="8" y1="30" x2="45" y2="75" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0B84FF" />
            <stop offset="100%" stopColor="#0051D5" />
          </linearGradient>
          <linearGradient id="ndtiBlueTop" x1="35" y1="6" x2="84" y2="72" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#19A2FF" />
            <stop offset="65%" stopColor="#0066FF" />
            <stop offset="100%" stopColor="#3B27BA" />
          </linearGradient>
          <linearGradient id="ndtiRibbon" x1="34" y1="30" x2="86" y2="74" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F5F3FF" />
            <stop offset="100%" stopColor="#9333EA" />
          </linearGradient>
          <linearGradient id="ndtiOrangeRight" x1="82" y1="28" x2="112" y2="74" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFBC1F" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
        </defs>

        {/* Left Blue Lobe */}
        <path
          d="M34 74H28C14.745 74 4 63.255 4 50C4 37.45 13.64 27.15 26 26.1V74H34Z"
          fill="url(#ndtiBlueLeft)"
        />
        {/* Center Dome & N Stem */}
        <path
          d="M26 26.5C30.5 14.5 42.2 6 56 6C72.5 6 86 19.2 86 35.8V74H26V26.5Z"
          fill="url(#ndtiBlueTop)"
        />
        {/* Diagonal White-to-Violet 'N' Stroke inside the Cloud */}
        <path
          d="M26 26.2C36.5 26.2 44.5 31.2 55 41.5L86 72.5V54.5L56.5 26.8C46.5 18.2 35.8 18.5 26 26.2Z"
          fill="url(#ndtiRibbon)"
        />
        {/* Right Orange Lobe */}
        <path
          d="M86 31.2C99.8 31.8 111 43.1 111 57C111 66.4 103.4 74 94 74H86V31.2Z"
          fill="url(#ndtiOrangeRight)"
        />
      </svg>

      {!collapsed && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-2">
            <span className="text-[20px] font-extrabold tracking-tight text-slate-900">
              NDTI
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/80">
              Enterprise
            </span>
          </div>
          {showSubtitle && (
            <span className="text-[9px] font-semibold tracking-[0.18em] text-slate-500 mt-1">
              DATA • CLOUD • INTELLIGENCE
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// ==========================================
// 4. REUSABLE STATUS BADGE
// ==========================================

const StatusBadge: React.FC<{
  status: string;
  size?: 'sm' | 'md';
}> = ({ status, size = 'sm' }) => {
  const normalized = status.toLowerCase();
  let styles = 'bg-slate-100 text-slate-700 border-slate-200';
  let dot = 'bg-slate-400';

  if (
    normalized === 'connected' ||
    normalized === 'active' ||
    normalized === 'verified' ||
    normalized === 'completed' ||
    normalized === 'indexed' ||
    normalized === 'success'
  ) {
    styles = 'bg-emerald-50/90 text-emerald-700 border-emerald-200';
    dot = 'bg-emerald-500';
  } else if (
    normalized === 'syncing' ||
    normalized === 'in progress' ||
    normalized === 'pending'
  ) {
    styles = 'bg-blue-50/90 text-blue-700 border-blue-200';
    dot = 'bg-blue-600 animate-pulse';
  } else if (
    normalized === 'degraded' ||
    normalized === 'warning' ||
    normalized === 'paused' ||
    normalized === 'archived'
  ) {
    styles = 'bg-amber-50/90 text-amber-800 border-amber-200';
    dot = 'bg-amber-500';
  } else if (normalized === 'disconnected' || normalized === 'blocked') {
    styles = 'bg-rose-50/90 text-rose-700 border-rose-200';
    dot = 'bg-rose-500';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium border rounded-full ${styles} ${
        size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-xs px-3 py-1'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
};

// ==========================================
// 5. MAIN DASHBOARD COMPONENT
// ==========================================

export default function NDTIDashboard() {
  // Navigation & Layout State
  const [activeNav, setActiveNav] = useState<NavSection>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Global Topbar Context Filters
  const [selectedCompany, setSelectedCompany] = useState<string>('ALL');
  const [selectedProject, setSelectedProject] = useState<string>('ALL');
  const [globalSearch, setGlobalSearch] = useState<string>('');

  // Stateful Enterprise Data for Interactive UI Flows
  const [projects, setProjects] = useState<FirebaseProject[]>(INITIAL_PROJECTS);
  const [pipelines, setPipelines] = useState<SyncPipeline[]>(INITIAL_PIPELINES);
  const [backups, setBackups] = useState<BackupSnapshot[]>(INITIAL_BACKUPS);
  const [logs, setLogs] = useState<AuditLogItem[]>(INITIAL_LOGS);

  // Data Explorer Local State
  const [explorerSearch, setExplorerSearch] = useState('');
  const [explorerCollection, setExplorerCollection] = useState('ALL');
  const [selectedRecord, setSelectedRecord] = useState<ExplorerRecord | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Modals & Interactive States
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [newProjectForm, setNewProjectForm] = useState({
    name: '',
    projectId: '',
    companyName: 'Kashish AI',
    region: 'us-central1',
    environment: 'prod' as 'prod' | 'staging' | 'analytics',
  });
  const [restoreTarget, setRestoreTarget] = useState<BackupSnapshot | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSyncRunning, setIsSyncRunning] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Helper to trigger non-intrusive enterprise toast notification
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3600);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    triggerToast(`Copied "${text}" to clipboard`);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // Filtered datasets based on Topbar Company & Project selectors
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCompany = selectedCompany === 'ALL' || p.companyName === selectedCompany;
      const matchProject = selectedProject === 'ALL' || p.projectId === selectedProject;
      const matchSearch =
        !globalSearch ||
        p.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
        p.projectId.toLowerCase().includes(globalSearch.toLowerCase()) ||
        p.companyName.toLowerCase().includes(globalSearch.toLowerCase());
      return matchCompany && matchProject && matchSearch;
    });
  }, [projects, selectedCompany, selectedProject, globalSearch]);

  const filteredExplorerRecords = useMemo(() => {
    return EXPLORER_RECORDS.filter((rec) => {
      const matchCompany = selectedCompany === 'ALL' || rec.company === selectedCompany;
      const matchProject = selectedProject === 'ALL' || rec.projectId === selectedProject;
      const matchCollection =
        explorerCollection === 'ALL' || rec.collection === explorerCollection;
      const matchQuery =
        !explorerSearch ||
        rec.docId.toLowerCase().includes(explorerSearch.toLowerCase()) ||
        rec.collection.toLowerCase().includes(explorerSearch.toLowerCase()) ||
        rec.projectId.toLowerCase().includes(explorerSearch.toLowerCase());
      return matchCompany && matchProject && matchCollection && matchQuery;
    });
  }, [selectedCompany, selectedProject, explorerCollection, explorerSearch]);

  const filteredLogs = useMemo(() => {
    return logs.filter((l) => {
      const matchCompany = selectedCompany === 'ALL' || l.company === selectedCompany;
      const matchProject = selectedProject === 'ALL' || l.project === selectedProject;
      const matchSearch =
        !globalSearch ||
        l.action.toLowerCase().includes(globalSearch.toLowerCase()) ||
        l.actor.toLowerCase().includes(globalSearch.toLowerCase()) ||
        l.project.toLowerCase().includes(globalSearch.toLowerCase());
      return matchCompany && matchProject && matchSearch;
    });
  }, [logs, selectedCompany, selectedProject, globalSearch]);

  // Interactive Handler: Connect a New Firebase Project (Local UI only)
  const handleCreateFirebaseConnection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectForm.name.trim() || !newProjectForm.projectId.trim()) return;

    const created: FirebaseProject = {
      id: `fp-${Date.now()}`,
      projectId: newProjectForm.projectId.trim().toLowerCase().replace(/\s+/g, '-'),
      name: newProjectForm.name.trim(),
      companyId: `comp-${newProjectForm.companyName.toLowerCase()}`,
      companyName: newProjectForm.companyName,
      environment: newProjectForm.environment,
      region: newProjectForm.region,
      status: 'Connected',
      collectionsCount: 12,
      documentsCount: '1,250,000',
      storageUsed: '28.5 GB',
      storagePercent: 19,
      lastSync: 'Just now',
      serviceAccount: `ndti-agent@${newProjectForm.projectId
        .trim()
        .toLowerCase()}.iam.gserviceaccount.com`,
    };

    setProjects([created, ...projects]);
    setLogs([
      {
        id: `log-${Date.now()}`,
        timestamp: 'Just now (UTC)',
        actor: 'admin@ndti.cloud',
        actorRole: 'Organization SuperAdmin',
        action: 'firebase.projects.connect',
        resource: `projects/${created.projectId}`,
        project: created.projectId,
        company: created.companyName,
        status: 'Success',
        ipAddress: '10.142.0.19',
        durationMs: 95,
      },
      ...logs,
    ]);
    setIsConnectModalOpen(false);
    setNewProjectForm({
      name: '',
      projectId: '',
      companyName: 'Kashish AI',
      region: 'us-central1',
      environment: 'prod',
    });
    triggerToast(`Connected Firebase project "${created.projectId}"`);
  };

  // Interactive Handler: Trigger Manual Sync Wave
  const handleManualSyncNow = () => {
    setIsSyncRunning(true);
    triggerToast('Initiated real-time CDC synchronization across active pipelines...');
    setTimeout(() => {
      setIsSyncRunning(false);
      setPipelines((prev) =>
        prev.map((p) => ({
          ...p,
          status: 'Active',
          lastSyncTime: 'Just now (0.4s lag)',
        }))
      );
      triggerToast('All synchronization pipelines verified and up-to-date.');
    }, 1500);
  };

  // Interactive Handler: Create Instant Snapshot
  const handleTriggerSnapshot = () => {
    const newSnap: BackupSnapshot = {
      id: `bk-${Date.now()}`,
      snapshotId: `snap-20250514-manual-${Math.floor(100 + Math.random() * 899)}`,
      projectId: selectedProject === 'ALL' ? 'kashish-ai-prod-core' : selectedProject,
      companyName: selectedCompany === 'ALL' ? 'Kashish AI' : selectedCompany,
      type: 'Manual Snapshot',
      size: '268.6 GB',
      recordsCount: '11,425,110',
      createdAt: 'Just now (UTC)',
      retention: '90 Days (Coldline)',
      status: 'Verified',
      encryption: 'AES-256-GCM',
    };
    setBackups([newSnap, ...backups]);
    triggerToast(`Created immutable snapshot ${newSnap.snapshotId}`);
  };

  // Navigation Items Definition
  const NAV_ITEMS: {
    id: NavSection;
    label: string;
    icon: React.FC<{ className?: string }>;
    badge?: string;
    group: 'CORE PLATFORM' | 'DATA FABRIC' | 'GOVERNANCE';
  }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, group: 'CORE PLATFORM' },
    { id: 'companies', label: 'Companies', icon: Building2, badge: '3', group: 'CORE PLATFORM' },
    { id: 'explorer', label: 'Data Explorer', icon: Database, group: 'CORE PLATFORM' },
    {
      id: 'firebase',
      label: 'Firebase Connections',
      icon: Flame,
      badge: String(projects.length),
      group: 'DATA FABRIC',
    },
    {
      id: 'sync',
      label: 'Data Synchronization',
      icon: ArrowLeftRight,
      badge: 'CDC',
      group: 'DATA FABRIC',
    },
    { id: 'backup', label: 'Backup & Recovery', icon: HardDriveDownload, group: 'DATA FABRIC' },
    { id: 'logs', label: 'Activity Logs', icon: ScrollText, group: 'GOVERNANCE' },
    { id: 'monitoring', label: 'Monitoring', icon: Activity, group: 'GOVERNANCE' },
    { id: 'access', label: 'Access Control', icon: ShieldCheck, group: 'GOVERNANCE' },
    { id: 'settings', label: 'Settings', icon: Settings, group: 'GOVERNANCE' },
  ];

  // ==========================================
  // 6. SUB-VIEW RENDERERS
  // ==========================================

  // VIEW 1: OVERVIEW + INFRASTRUCTURE OVERVIEW
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Page Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
            <span>Centralized Control Plane</span>
            <span>•</span>
            <span>Organization ID: org-ndti-global-01</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 mt-1">
            Enterprise Infrastructure Overview
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Unified telemetry, Firebase Firestore clusters, and multi-company replication across Kashish AI, Nexor Technologies, and Nexor Sparks.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleManualSyncNow}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncRunning ? 'animate-spin text-blue-600' : ''}`} />
            <span>Sync All Nodes</span>
          </button>
          <button
            onClick={() => setIsConnectModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Connect Firebase Project</span>
          </button>
        </div>
      </div>

      {/* Requirement #3: 4 Professional Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveNav('companies')}
          className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs hover:border-blue-300 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Companies
            </span>
            <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">3</span>
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              100% Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 truncate">
            Kashish AI • Nexor Tech • Nexor Sparks
          </p>
        </div>

        <div
          onClick={() => setActiveNav('firebase')}
          className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs hover:border-blue-300 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Connected Projects
            </span>
            <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              {projects.length}
            </span>
            <span className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
              4 Regions
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            174 Firestore collections indexed
          </p>
        </div>

        <div
          onClick={() => setActiveNav('explorer')}
          className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs hover:border-blue-300 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Records
            </span>
            <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              52,402,760
            </span>
            <span className="inline-flex items-center text-xs font-medium text-emerald-700">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              +4.2% (24h)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            1.29 TB total managed cloud storage
          </p>
        </div>

        <div
          onClick={() => setActiveNav('backup')}
          className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs hover:border-blue-300 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Last Backup
            </span>
            <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
              <HardDriveDownload className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              04:00 UTC
            </span>
            <StatusBadge status="Verified" />
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Point-in-time recovery (PITR) enabled
          </p>
        </div>
      </div>

      {/* Requirement #4: Infrastructure Overview Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Table 1: Firebase Projects & Storage Usage (2 columns wide) */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Firebase Infrastructure & Storage Allocation
              </h2>
              <p className="text-xs text-slate-500">
                Real-time connection status, document counts, and storage utilization across connected projects
              </p>
            </div>
            <button
              onClick={() => setActiveNav('firebase')}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
            >
              <span>View all projects</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4">Project / ID</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Storage Usage</th>
                  <th className="py-3 px-4 text-right">Records</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {filteredProjects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-900">{proj.name}</div>
                      <div className="font-mono text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <span>{proj.projectId}</span>
                        <span className="text-slate-300">•</span>
                        <span>{proj.region}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {proj.companyName}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={proj.status} />
                    </td>
                    <td className="py-3.5 px-4 min-w-[160px]">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-medium text-slate-700">{proj.storageUsed}</span>
                        <span className="text-slate-500">{proj.storagePercent}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            proj.storagePercent > 80
                              ? 'bg-amber-500'
                              : 'bg-blue-600'
                          }`}
                          style={{ width: `${proj.storagePercent}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-slate-800">
                      {proj.documentsCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 2: Synchronization History & Live Streams */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-2xs flex flex-col justify-between overflow-hidden">
          <div>
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Synchronization History
                </h2>
                <p className="text-xs text-slate-500">
                  Cross-project replication & CDC jobs
                </p>
              </div>
              <button
                onClick={() => setActiveNav('sync')}
                className="text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                Manage
              </button>
            </div>

            <div className="divide-y divide-slate-200">
              {pipelines.map((pipe) => (
                <div key={pipe.id} className="p-4 hover:bg-slate-50/70 transition">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-xs font-semibold text-slate-900">
                      {pipe.name}
                    </div>
                    <StatusBadge status={pipe.status} />
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                    <span className="truncate max-w-[130px]">{pipe.sourceProject}</span>
                    <ArrowLeftRight className="w-3 h-3 text-blue-600 flex-shrink-0" />
                    <span className="truncate max-w-[130px]">{pipe.destinationProject}</span>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Throughput: <strong className="text-slate-700">{pipe.throughput}</strong></span>
                    <span>{pipe.lastSyncTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Zero replication schema conflicts</span>
            </div>
            <span className="font-mono text-[11px] text-slate-500">SLA: 99.99%</span>
          </div>
        </div>
      </div>
    </div>
  );

  // VIEW 2: COMPANIES PAGE (Kashish AI, Nexor Technologies, Nexor Sparks)
  const renderCompanies = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Managed Companies & Subsidiaries
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Organizational tenants isolated by IAM boundaries and centralized under NDTI Data Fabric.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selectedCompany !== 'ALL' && (
            <button
              onClick={() => setSelectedCompany('ALL')}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
            >
              Reset Filter ({selectedCompany})
            </button>
          )}
        </div>
      </div>

      {/* Requirement #5: Company Cards for Kashish AI, Nexor Technologies, and Nexor Sparks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {COMPANIES.map((comp) => {
          const companyProjects = projects.filter((p) => p.companyName === comp.name);
          const isSelected = selectedCompany === comp.name;

          return (
            <div
              key={comp.id}
              className={`bg-white rounded-lg border transition shadow-2xs flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-600 ring-2 ring-blue-500/15'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Card Top Header */}
                <div className="p-5 border-b border-slate-100">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600">
                        {comp.name === 'Kashish AI' && <Sparkles className="w-5 h-5" />}
                        {comp.name === 'Nexor Technologies' && <Cpu className="w-5 h-5" />}
                        {comp.name === 'Nexor Sparks' && <Zap className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-base font-semibold text-slate-900">
                            {comp.name}
                          </h2>
                        </div>
                        <span className="text-xs font-mono text-slate-500">
                          {comp.region}
                        </span>
                      </div>
                    </div>
                    <StatusBadge status={comp.environment} />
                  </div>
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {comp.tagline}
                  </p>
                </div>

                {/* Key Statistics Grid */}
                <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 bg-slate-50/50">
                  <div className="p-3.5 text-center">
                    <div className="text-[11px] font-medium text-slate-500">Projects</div>
                    <div className="text-base font-bold text-slate-900 mt-0.5">
                      {companyProjects.length}
                    </div>
                  </div>
                  <div className="p-3.5 text-center">
                    <div className="text-[11px] font-medium text-slate-500">Records</div>
                    <div className="text-base font-bold text-slate-900 mt-0.5">
                      {comp.totalRecords}
                    </div>
                  </div>
                  <div className="p-3.5 text-center">
                    <div className="text-[11px] font-medium text-slate-500">Sync SLA</div>
                    <div className="text-base font-bold text-emerald-700 mt-0.5">
                      {comp.syncHealth}%
                    </div>
                  </div>
                </div>

                {/* Attached Firebase Projects List */}
                <div className="p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                    Connected Firebase Clusters
                  </div>
                  <div className="space-y-2">
                    {companyProjects.map((cp) => (
                      <div
                        key={cp.id}
                        className="flex items-center justify-between px-3 py-2 rounded-md bg-slate-50 border border-slate-200/80 text-xs"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <Flame className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                          <span className="font-mono text-slate-800 truncate">
                            {cp.projectId}
                          </span>
                        </div>
                        <StatusBadge status={cp.status} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Storage: <strong className="text-slate-800">{comp.storageUsed}</strong> / {comp.storageQuota}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedCompany(comp.name);
                      setActiveNav('explorer');
                    }}
                    className="font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                  >
                    <span>Explore Data</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // VIEW 3: FIREBASE CONNECTIONS PAGE
  const renderFirebaseConnections = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Firebase Connections
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage Google Cloud & Firebase project service accounts, Firestore endpoints, and IAM federation.
          </p>
        </div>
        <button
          onClick={() => setIsConnectModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span>Connect Project</span>
        </button>
      </div>

      {/* Requirement #6: Elegant project cards with project IDs, connection status badges, and Connect Project buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white border border-slate-200 rounded-lg shadow-2xs hover:border-blue-300 transition flex flex-col justify-between"
          >
            <div className="p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">
                      {proj.companyName}
                    </span>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {proj.name}
                    </h3>
                  </div>
                </div>
                <StatusBadge status={proj.status} />
              </div>

              {/* Project ID Copy Box */}
              <div className="mt-4 p-2.5 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Firebase Project ID
                  </div>
                  <div className="text-xs font-mono font-medium text-slate-800 mt-0.5">
                    {proj.projectId}
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(proj.projectId, proj.id)}
                  className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-white rounded border border-transparent hover:border-slate-200 transition"
                  title="Copy Project ID"
                >
                  {copiedId === proj.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                <div className="p-2.5 rounded border border-slate-100 bg-slate-50/40">
                  <span className="text-slate-500 block text-[11px]">Collections</span>
                  <span className="font-semibold text-slate-900">{proj.collectionsCount}</span>
                </div>
                <div className="p-2.5 rounded border border-slate-100 bg-slate-50/40">
                  <span className="text-slate-500 block text-[11px]">Total Documents</span>
                  <span className="font-semibold font-mono text-slate-900">{proj.documentsCount}</span>
                </div>
                <div className="p-2.5 rounded border border-slate-100 bg-slate-50/40">
                  <span className="text-slate-500 block text-[11px]">GCP Region</span>
                  <span className="font-mono text-slate-800">{proj.region}</span>
                </div>
                <div className="p-2.5 rounded border border-slate-100 bg-slate-50/40">
                  <span className="text-slate-500 block text-[11px]">Storage Used</span>
                  <span className="font-semibold text-slate-900">{proj.storageUsed}</span>
                </div>
              </div>

              <div className="mt-4 text-[11px] text-slate-500 truncate">
                IAM Principal: <span className="font-mono text-slate-700">{proj.serviceAccount}</span>
              </div>
            </div>

            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Synced: <strong className="text-slate-700">{proj.lastSync}</strong>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedProject(proj.projectId);
                    setActiveNav('explorer');
                  }}
                  className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-100 transition"
                >
                  Inspect Collections
                </button>
                <button
                  onClick={() =>
                    triggerToast(`Verified handshake with ${proj.projectId} (19ms RTT)`)
                  }
                  className="px-2.5 py-1 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition"
                >
                  Connect Project
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // VIEW 4: DATA SYNCHRONIZATION PAGE
  const renderDataSync = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Data Synchronization & Replication Topology
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Real-time Change Data Capture (CDC) pipelines between company Firebase projects and the central NDTI Lakehouse.
          </p>
        </div>
        <button
          onClick={handleManualSyncNow}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition shadow-2xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncRunning ? 'animate-spin' : ''}`} />
          <span>Trigger Global Sync</span>
        </button>
      </div>

      {/* Requirement #7: Visual Representation of Data Flow + Source & Destination Project Panels */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">
              Live Data Fabric Topology
            </span>
            <h2 className="text-base font-semibold text-slate-900">
              Active Cross-Project Replication Architecture
            </h2>
          </div>
          <StatusBadge status={isSyncRunning ? 'Syncing' : 'Active'} size="md" />
        </div>

        {/* Visual Source -> Engine -> Destination Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-center">
          {/* Source Panel */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Source Firebase Projects
              </span>
              <span className="text-xs font-mono text-blue-600 font-semibold">3 Streams</span>
            </div>
            <div className="space-y-2.5">
              <div className="p-3 bg-white rounded-md border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-900">Kashish AI Core</div>
                  <div className="text-[11px] font-mono text-slate-500">kashish-ai-prod-core</div>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  4.8k ops/s
                </span>
              </div>
              <div className="p-3 bg-white rounded-md border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-900">Nexor ERP Primary</div>
                  <div className="text-[11px] font-mono text-slate-500">nexor-tech-erp-main</div>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  1.9k ops/s
                </span>
              </div>
              <div className="p-3 bg-white rounded-md border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-900">Nexor Sparks Stream</div>
                  <div className="text-[11px] font-mono text-slate-500">nexor-sparks-stream-io</div>
                </div>
                <span className="text-[11px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  3.1k ops/s
                </span>
              </div>
            </div>
          </div>

          {/* Center NDTI Sync Router Visual */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center py-4">
            <div className="w-full flex items-center justify-center">
              <div className="h-0.5 flex-1 bg-gradient-to-r from-slate-300 via-blue-500 to-blue-600" />
              <div className="mx-2 px-4 py-3 rounded-xl bg-blue-600 text-white shadow-md flex flex-col items-center text-center">
                <ArrowLeftRight className="w-5 h-5 mb-1" />
                <span className="text-xs font-bold tracking-wide">NDTI CDC ENGINE</span>
                <span className="text-[10px] text-blue-100 font-mono mt-0.5">
                  Schema Validator v4.2
                </span>
              </div>
              <div className="h-0.5 flex-1 bg-gradient-to-r from-blue-600 via-blue-500 to-slate-300" />
            </div>
            <div className="mt-2.5 text-[11px] text-slate-500 font-mono">
              Avg Latency: <strong className="text-slate-800">42ms</strong> • Zero Data Loss
            </div>
          </div>

          {/* Destination Panel */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Destination Clusters
              </span>
              <span className="text-xs font-mono text-emerald-700 font-semibold">Verified</span>
            </div>
            <div className="space-y-2.5">
              <div className="p-3 bg-white rounded-md border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-900">NDTI Central Warehouse</div>
                  <div className="text-[11px] font-mono text-slate-500">ndti-central-warehouse-prod</div>
                </div>
                <StatusBadge status="Active" />
              </div>
              <div className="p-3 bg-white rounded-md border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-900">Kashish Vector Hub</div>
                  <div className="text-[11px] font-mono text-slate-500">kashish-vector-store-v2</div>
                </div>
                <StatusBadge status="Active" />
              </div>
              <div className="p-3 bg-white rounded-md border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-900">Nexor Analytics Replica</div>
                  <div className="text-[11px] font-mono text-slate-500">nexor-tech-erp-main</div>
                </div>
                <StatusBadge status="Syncing" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Synchronization Pipelines Table */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900">
            Configured Synchronization Pipelines
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Pipeline Name</th>
                <th className="py-3 px-4">Source Project</th>
                <th className="py-3 px-4">Destination Project</th>
                <th className="py-3 px-4">Mode</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Sync Time</th>
                <th className="py-3 px-4 text-right">24h Volume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {pipelines.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80">
                  <td className="py-3.5 px-4 font-medium text-slate-900">{p.name}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-700">{p.sourceProject}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-700">{p.destinationProject}</td>
                  <td className="py-3.5 px-4 text-slate-600">{p.mode}</td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{p.lastSyncTime}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-medium text-slate-900">
                    {p.recordsSynced24h} docs
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // VIEW 5: BACKUP & RECOVERY PAGE
  const renderBackupRecovery = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Backup & Disaster Recovery Vault
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Immutable AES-256 encrypted snapshots, multi-region coldline storage, and one-click point-in-time restore.
          </p>
        </div>
        <button
          onClick={handleTriggerSnapshot}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition shadow-2xs"
        >
          <HardDriveDownload className="w-4 h-4" />
          <span>Create Manual Snapshot</span>
        </button>
      </div>

      {/* Storage Information Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Vault Storage Allocated
          </span>
          <div className="text-xl font-bold text-slate-900 mt-1">1.11 TB / 2.50 TB</div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: '44%' }} />
          </div>
          <span className="text-[11px] text-slate-500 mt-1.5 block">
            Replicated across us-central1 & europe-west1
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Recovery Point Objective (RPO)
          </span>
          <div className="text-xl font-bold text-slate-900 mt-1">&lt; 5 Minutes</div>
          <span className="text-[11px] text-emerald-700 font-medium mt-2 block">
            Continuous WAL journal archiving active
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Encryption & Compliance
          </span>
          <div className="text-xl font-bold text-slate-900 mt-1">CMEK AES-256-GCM</div>
          <span className="text-[11px] text-slate-500 mt-2 block">
            Customer-Managed Encryption Keys verified
          </span>
        </div>
      </div>

      {/* Requirement #8: Backup History Table & Restore Action Buttons */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">
            Snapshot Backup History
          </h2>
          <span className="text-xs text-slate-500">{backups.length} immutable points available</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Snapshot ID</th>
                <th className="py-3 px-4">Company / Project</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Size & Records</th>
                <th className="py-3 px-4">Created (UTC)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {backups.map((bk) => (
                <tr key={bk.id} className="hover:bg-slate-50/80">
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-900">
                    {bk.snapshotId}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-900">{bk.companyName}</div>
                    <div className="font-mono text-[11px] text-slate-500">{bk.projectId}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{bk.type}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-800">{bk.size}</div>
                    <div className="text-[11px] font-mono text-slate-500">{bk.recordsCount} docs</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{bk.createdAt}</td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={bk.status} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setRestoreTarget(bk)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // VIEW 6: DATA EXPLORER PAGE
  const renderDataExplorer = () => {
    const collections = Array.from(new Set(EXPLORER_RECORDS.map((r) => r.collection)));

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Global Data Explorer
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Query, filter, and inspect indexed Firestore collections and document payloads across connected organizations.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerToast('Exported filtered dataset schema as JSON')}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>

        {/* Requirement #9: Search, Filters, Collections, Table, and Pagination */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Collections Sidebar */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs h-fit">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-between">
              <span>Firestore Collections</span>
              <span className="font-mono text-[11px]">{collections.length}</span>
            </div>
            <div className="space-y-1">
              <button
                onClick={() => setExplorerCollection('ALL')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition ${
                  explorerCollection === 'ALL'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200/80'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>All Collections</span>
                </span>
                <span className="font-mono text-[11px]">{EXPLORER_RECORDS.length}</span>
              </button>
              {collections.map((col) => (
                <button
                  key={col}
                  onClick={() => setExplorerCollection(col)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-mono transition ${
                    explorerCollection === col
                      ? 'bg-blue-50 text-blue-700 border border-blue-200/80 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate">{col}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Data Table & Search Bar */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={explorerSearch}
                  onChange={(e) => setExplorerSearch(e.target.value)}
                  placeholder="Filter by Document ID, collection, or project ID..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Filter className="w-3.5 h-3.5" />
                <span>Showing {filteredExplorerRecords.length} indexed documents</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      <th className="py-3 px-4">Document ID</th>
                      <th className="py-3 px-4">Collection</th>
                      <th className="py-3 px-4">Company / Project</th>
                      <th className="py-3 px-4">Size</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Inspect</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs">
                    {filteredExplorerRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-50/80">
                        <td className="py-3.5 px-4 font-mono font-medium text-blue-700">
                          {rec.docId}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-700">
                          {rec.collection}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-slate-900">{rec.company}</div>
                          <div className="font-mono text-[11px] text-slate-500">{rec.projectId}</div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-600">
                          {rec.sizeKb} KB
                        </td>
                        <td className="py-3.5 px-4">
                          <StatusBadge status={rec.status} />
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setSelectedRecord(rec)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50"
                          >
                            <Eye className="w-3.5 h-3.5 text-blue-600" />
                            <span>JSON</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Footer */}
              <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <span>
                  Page <strong>{currentPage}</strong> of <strong>1</strong> ({filteredExplorerRecords.length} records)
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="px-2.5 py-1 rounded border border-slate-300 bg-white disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    disabled
                    className="px-2.5 py-1 rounded border border-slate-300 bg-white disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // VIEW 7: ACTIVITY LOGS PAGE
  const renderActivityLogs = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Cloud Audit & Activity Logs
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Immutable administrative, IAM, and data synchronization audit trail across all connected projects.
          </p>
        </div>
      </div>

      {/* Requirement #10: Clean table with timestamps, actions, projects, and status indicators */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Timestamp (UTC)</th>
                <th className="py-3 px-4">Action / Method</th>
                <th className="py-3 px-4">Principal / Actor</th>
                <th className="py-3 px-4">Target Project</th>
                <th className="py-3 px-4">Latency</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80">
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                    {log.timestamp}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-medium text-slate-900">{log.action}</div>
                    <div className="font-mono text-[11px] text-slate-500">{log.resource}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-900">{log.actor}</div>
                    <div className="text-[11px] text-slate-500">
                      {log.actorRole} • {log.ipAddress}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-mono text-slate-800">{log.project}</div>
                    <div className="text-[11px] text-slate-500">{log.company}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{log.durationMs} ms</td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={log.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // VIEW 8, 9, 10: MONITORING, ACCESS CONTROL, SETTINGS
  const renderGovernanceView = (mode: 'monitoring' | 'access' | 'settings') => {
    if (mode === 'monitoring') {
      return (
        <div className="space-y-6">
          <div className="pb-4 border-b border-slate-200">
            <h1 className="text-xl font-semibold text-slate-900">
              Real-Time Telemetry & Cluster Monitoring
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Firestore read/write IOPS, CDC pipeline latency percentiles, and regional uptime SLOs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold uppercase text-slate-500">Global Read Throughput</span>
              <div className="text-2xl font-bold text-slate-900 mt-2">9,920 ops/sec</div>
              <div className="text-xs text-emerald-700 mt-1">p99 Latency: 18.4 ms</div>
            </div>
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold uppercase text-slate-500">CDC Queue Depth</span>
              <div className="text-2xl font-bold text-slate-900 mt-2">0.02% Backpressure</div>
              <div className="text-xs text-blue-700 mt-1">12 Worker Nodes Healthy</div>
            </div>
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
              <span className="text-xs font-semibold uppercase text-slate-500">30-Day Uptime SLA</span>
              <div className="text-2xl font-bold text-emerald-700 mt-2">99.994%</div>
              <div className="text-xs text-slate-500 mt-1">Zero unscheduled outages</div>
            </div>
          </div>
        </div>
      );
    }

    if (mode === 'access') {
      return (
        <div className="space-y-6">
          <div className="pb-4 border-b border-slate-200">
            <h1 className="text-xl font-semibold text-slate-900">
              IAM & Role-Based Access Control (RBAC)
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Least-privilege security policies across Kashish AI, Nexor Technologies, and Nexor Sparks.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg shadow-2xs divide-y divide-slate-200">
            {[
              { name: 'Arjun Mehta', email: 'arjun.mehta@ndti.cloud', role: 'Organization SuperAdmin', scope: 'All Companies (Global)', mfa: 'Hardware Key (FIDO2)' },
              { name: 'Dr. Kavya Sharma', email: 'kavya@kashish.ai', role: 'Tenant Data Administrator', scope: 'Kashish AI', mfa: 'Enforced (TOTP)' },
              { name: 'Elena Rostova', email: 'elena.rostova@nexortech.io', role: 'Security & Compliance Auditor', scope: 'Nexor Technologies & Sparks', mfa: 'Enforced (SAML SSO)' },
            ].map((u) => (
              <div key={u.email} className="p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div>
                  <div className="font-semibold text-slate-900">{u.name}</div>
                  <div className="font-mono text-slate-500">{u.email}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-medium">{u.role}</span>
                  <span className="text-slate-500">{u.scope}</span>
                  <StatusBadge status="Verified" />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="pb-4 border-b border-slate-200">
          <h1 className="text-xl font-semibold text-slate-900">
            Platform Settings & Organization Preferences
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Configure organization-wide retention schedules, webhook alerts, and KMS encryption keys.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-2xs space-y-4 max-w-2xl">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500">
              Organization Display Name
            </label>
            <input
              type="text"
              defaultValue="NDTI — Data • Cloud • Intelligence"
              className="mt-1.5 w-full px-3 py-2 text-sm border border-slate-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500">
              Default Snapshot Retention Policy
            </label>
            <select className="mt-1.5 w-full px-3 py-2 text-sm border border-slate-300 rounded-md bg-white">
              <option>90 Days (Google Cloud Coldline)</option>
              <option>365 Days (Enterprise Archive)</option>
              <option>7 Years (Regulatory Compliance Lock)</option>
            </select>
          </div>
          <button
            onClick={() => triggerToast('Saved organization configuration changes')}
            className="px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Save Configuration
          </button>
        </div>
      </div>
    );
  };

  // ==========================================
  // 7. MASTER SHELL RENDER
  // ==========================================

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans antialiased">
      {/* TOP NAVIGATION BAR (Requirement #2) */}
      <header className="h-14 bg-white border-b border-slate-200 sticky top-0 z-30 px-4 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Mobile Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-slate-600 hover:bg-slate-100 rounded-md"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div
            onClick={() => setActiveNav('overview')}
            className="cursor-pointer"
          >
            <NDTILogo showSubtitle={false} />
          </div>

          <div className="hidden md:flex items-center gap-2 ml-4 pl-4 border-l border-slate-200">
            {/* Company Selector */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1">
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[11px] font-medium text-slate-500">Company:</span>
              <select
                value={selectedCompany}
                onChange={(e) => {
                  setSelectedCompany(e.target.value);
                  setSelectedProject('ALL');
                }}
                className="text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Companies (3)</option>
                <option value="Kashish AI">Kashish AI</option>
                <option value="Nexor Technologies">Nexor Technologies</option>
                <option value="Nexor Sparks">Nexor Sparks</option>
              </select>
            </div>

            {/* Project Selector */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1">
              <Flame className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-[11px] font-medium text-slate-500">Project:</span>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="text-xs font-mono font-medium text-slate-800 bg-transparent focus:outline-none cursor-pointer max-w-[180px]"
              >
                <option value="ALL">All Firebase Projects</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.projectId}>
                    {p.projectId}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Search projects, collections, snapshots, or principals ( / )"
              className="w-full pl-9 pr-10 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 border border-slate-200 rounded px-1.5 py-0.5 bg-white">
              ⌘K
            </span>
          </div>
        </div>

        {/* Right: Notifications, Help, Admin Profile */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-md relative"
              title="System Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-blue-600 absolute top-1.5 right-1.5" />
            </button>
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-lg p-3 z-50 text-xs">
                <div className="font-semibold text-slate-900 pb-2 border-b border-slate-100 flex justify-between">
                  <span>System Alerts</span>
                  <button
                    onClick={() => setNotificationsOpen(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="divide-y divide-slate-100 mt-1">
                  <div className="py-2">
                    <div className="font-medium text-slate-800">Daily Snapshot Verified</div>
                    <div className="text-slate-500 text-[11px]">snap-20250514-0400-kashish completed</div>
                  </div>
                  <div className="py-2">
                    <div className="font-medium text-amber-700">Staging Sync Latency</div>
                    <div className="text-slate-500 text-[11px]">nexor-sparks-sandbox-09 lag &gt; 30m</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => triggerToast('NDTI Enterprise Documentation & API Reference v4.2')}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-md"
            title="Documentation & Support"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          <div className="h-5 w-px bg-slate-200 mx-1" />

          {/* Administrator Profile */}
          <div className="flex items-center gap-2.5 pl-1">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-semibold flex items-center justify-center">
              AM
            </div>
            <div className="hidden xl:block leading-tight">
              <div className="text-xs font-semibold text-slate-900">Arjun Mehta</div>
              <div className="text-[10px] text-slate-500">Cloud Org Admin</div>
            </div>
          </div>
        </div>
      </header>

      {/* BODY CONTAINER: SIDEBAR + MAIN WORKSPACE */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR (Requirement #1) */}
        <aside
          className={`${
            sidebarCollapsed ? 'w-16' : 'w-64'
          } bg-white border-r border-slate-200 flex-shrink-0 hidden lg:flex flex-col justify-between transition-all duration-200`}
        >
          <div className="p-3 space-y-5 overflow-y-auto">
            {/* Brand Header inside Sidebar when expanded */}
            <div className="px-2 pt-1 pb-2 border-b border-slate-100">
              <NDTILogo collapsed={sidebarCollapsed} showSubtitle={true} />
            </div>

            {(['CORE PLATFORM', 'DATA FABRIC', 'GOVERNANCE'] as const).map((group) => (
              <div key={group}>
                {!sidebarCollapsed && (
                  <div className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {group}
                  </div>
                )}
                <div className="space-y-0.5">
                  {NAV_ITEMS.filter((i) => i.group === group).map((item) => {
                    const Icon = item.icon;
                    const active = activeNav === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveNav(item.id)}
                        title={sidebarCollapsed ? item.label : undefined}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition ${
                          active
                            ? 'bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            className={`w-4 h-4 flex-shrink-0 ${
                              active ? 'text-blue-600' : 'text-slate-400'
                            }`}
                          />
                          {!sidebarCollapsed && <span>{item.label}</span>}
                        </div>
                        {!sidebarCollapsed && item.badge && (
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                              active
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Collapse Toggle Footer */}
          <div className="p-3 border-t border-slate-200 flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>All Systems Operational</span>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-md ml-auto"
              title="Toggle Sidebar"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {activeNav === 'overview' && renderOverview()}
          {activeNav === 'companies' && renderCompanies()}
          {activeNav === 'firebase' && renderFirebaseConnections()}
          {activeNav === 'sync' && renderDataSync()}
          {activeNav === 'backup' && renderBackupRecovery()}
          {activeNav === 'explorer' && renderDataExplorer()}
          {activeNav === 'logs' && renderActivityLogs()}
          {activeNav === 'monitoring' && renderGovernanceView('monitoring')}
          {activeNav === 'access' && renderGovernanceView('access')}
          {activeNav === 'settings' && renderGovernanceView('settings')}
        </main>
      </div>

      {/* ==========================================
          8. ENTERPRISE MODALS & OVERLAYS
         ========================================== */}

      {/* Modal 1: Connect Firebase Project */}
      {isConnectModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-lg max-w-md w-full shadow-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-semibold text-slate-900">
                  Connect Firebase Project
                </h3>
              </div>
              <button
                onClick={() => setIsConnectModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateFirebaseConnection} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Parent Company
                </label>
                <select
                  value={newProjectForm.companyName}
                  onChange={(e) =>
                    setNewProjectForm({ ...newProjectForm, companyName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white"
                >
                  <option value="Kashish AI">Kashish AI</option>
                  <option value="Nexor Technologies">Nexor Technologies</option>
                  <option value="Nexor Sparks">Nexor Sparks</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kashish AI Inference Cluster"
                  value={newProjectForm.name}
                  onChange={(e) =>
                    setNewProjectForm({ ...newProjectForm, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Firebase Project ID
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. kashish-inference-prod-01"
                  value={newProjectForm.projectId}
                  onChange={(e) =>
                    setNewProjectForm({ ...newProjectForm, projectId: e.target.value })
                  }
                  className="w-full px-3 py-2 font-mono border border-slate-300 rounded-md"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    GCP Region
                  </label>
                  <select
                    value={newProjectForm.region}
                    onChange={(e) =>
                      setNewProjectForm({ ...newProjectForm, region: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white"
                  >
                    <option value="us-central1">us-central1</option>
                    <option value="europe-west1">europe-west1</option>
                    <option value="asia-south1">asia-south1</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Environment
                  </label>
                  <select
                    value={newProjectForm.environment}
                    onChange={(e) =>
                      setNewProjectForm({
                        ...newProjectForm,
                        environment: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white"
                  >
                    <option value="prod">Production</option>
                    <option value="staging">Staging</option>
                    <option value="analytics">Analytics</option>
                  </select>
                </div>
              </div>
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsConnectModalOpen(false)}
                  className="px-3.5 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700"
                >
                  Establish Connection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Inspect Document JSON Payload */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-lg max-w-lg w-full shadow-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-blue-600">
                  {selectedRecord.collection} / {selectedRecord.docId}
                </span>
                <h3 className="text-sm font-semibold text-slate-900">
                  Document Payload Inspector
                </h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-3 text-xs">
              <pre className="p-4 rounded-md bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
                {JSON.stringify(selectedRecord.payloadPreview, null, 2)}
              </pre>
              <div className="flex items-center justify-between text-slate-500 pt-2">
                <span>Project: {selectedRecord.projectId}</span>
                <span>Updated: {selectedRecord.updatedAt}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Restore Snapshot Confirmation */}
      {restoreTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-lg max-w-md w-full shadow-xl p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Restore Point-in-Time Snapshot
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Target: <strong className="font-mono">{restoreTarget.snapshotId}</strong>
                </p>
              </div>
              <button
                onClick={() => setRestoreTarget(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 rounded-md bg-blue-50 border border-blue-200 text-xs text-blue-900">
              Restoring will mount an isolated recovery collection in{' '}
              <strong className="font-mono">{restoreTarget.projectId}</strong> ({restoreTarget.size}) without overwriting active production traffic.
            </div>
            <div className="flex justify-end gap-2 text-xs">
              <button
                onClick={() => setRestoreTarget(null)}
                className="px-3.5 py-2 border border-slate-300 rounded-md text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  triggerToast(`Initiated non-destructive restore of ${restoreTarget.snapshotId}`);
                  setRestoreTarget(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
              >
                Confirm Restore
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enterprise Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-lg border border-slate-700 flex items-center gap-2.5 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
