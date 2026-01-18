// Core domain types for the Nanomedicine R&D Platform

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'scientist' | 'admin' | 'viewer';
  organization: string;
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  createdAt: string;
  updatedAt: string;
  leadScientist: string;
  experimentCount: number;
}

export interface Experiment {
  id: string;
  projectId: string;
  name: string;
  hypothesis: string;
  status: 'planning' | 'in-progress' | 'completed' | 'failed' | 'on-hold';
  createdAt: string;
  updatedAt: string;
  batchCount: number;
  notes?: string;
}

export interface LipidComposition {
  ionizableLipid: number; // percentage
  dspc: number;
  cholesterol: number;
  pegLipid: number;
}

export interface ProcessParameters {
  lipidComposition: LipidComposition;
  flowRate: number; // mL/min
  totalFlowRate: number; // mL/min
  aqueousToOrganicRatio: number;
  temperature: number; // Celsius
  pH: number;
  mixingSpeed: number; // rpm
}

export interface CharacterizationData {
  zAverage: number; // nm
  pdi: number;
  zetaPotential: number; // mV
  encapsulationEfficiency: number; // percentage
  sizeDistribution: { size: number; intensity: number }[];
  correlationFunction?: { time: number; correlation: number }[];
}

export interface Batch {
  id: string;
  experimentId: string;
  batchNumber: string;
  createdAt: string;
  processParameters: ProcessParameters;
  characterizationData?: CharacterizationData;
  status: 'pending' | 'characterized' | 'approved' | 'rejected';
  notes?: string;
}

export interface Instrument {
  id: string;
  name: string;
  type: 'dls' | 'hplc' | 'tem' | 'mass-spec' | 'uv-vis';
  status: 'online' | 'offline' | 'maintenance';
  lastSync: string;
  location: string;
}

export interface DataUpload {
  id: string;
  instrumentId: string;
  fileName: string;
  fileType: string;
  uploadedAt: string;
  batchId?: string;
  status: 'pending' | 'processed' | 'linked';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  entityType: 'project' | 'experiment' | 'batch' | 'prediction' | 'approval';
  entityId: string;
  details: string;
  ipAddress?: string;
}

export interface PredictionResult {
  id: string;
  timestamp: string;
  inputParameters: ProcessParameters;
  predictions: {
    zAverage: { value: number; confidence: number };
    pdi: { value: number; confidence: number };
    encapsulationEfficiency: { value: number; confidence: number };
    zetaPotential: { value: number; confidence: number };
  };
  suggestions?: ProcessParameters;
}

export interface ModelCard {
  id: string;
  name: string;
  version: string;
  description: string;
  trainedOn: string;
  accuracy: number;
  validationStatus: 'validated' | 'pending' | 'deprecated';
  lastUpdated: string;
}

export type DataResidency = 'KSA' | 'UAE' | 'Global';

export interface ComplianceStatus {
  dataResidency: DataResidency;
  lastAudit: string;
  pendingApprovals: number;
  electronicSignatures: number;
}
