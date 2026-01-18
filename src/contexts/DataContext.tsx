import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { 
  Project, 
  Experiment, 
  Batch, 
  Instrument, 
  DataUpload, 
  AuditLogEntry, 
  PredictionResult, 
  User 
} from '@/types';
import {
  mockUser,
  mockProjects,
  mockExperiments,
  mockBatches,
  mockInstruments,
  mockDataUploads,
  mockAuditLog,
  mockPredictions,
} from '@/data/mockData';

interface DataContextType {
  // User
  user: User;
  
  // Projects
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  // Experiments
  experiments: Experiment[];
  addExperiment: (experiment: Experiment) => void;
  updateExperiment: (id: string, updates: Partial<Experiment>) => void;
  deleteExperiment: (id: string) => void;
  getExperimentsByProject: (projectId: string) => Experiment[];
  
  // Batches
  batches: Batch[];
  addBatch: (batch: Batch) => void;
  updateBatch: (id: string, updates: Partial<Batch>) => void;
  deleteBatch: (id: string) => void;
  getBatchesByExperiment: (experimentId: string) => Batch[];
  
  // Instruments
  instruments: Instrument[];
  
  // Data Uploads
  dataUploads: DataUpload[];
  addDataUpload: (upload: DataUpload) => void;
  linkUploadToBatch: (uploadId: string, batchId: string) => void;
  
  // Audit Log
  auditLog: AuditLogEntry[];
  addAuditEntry: (entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => void;
  
  // Predictions
  predictions: PredictionResult[];
  addPrediction: (prediction: PredictionResult) => void;
  
  // Reset to initial data
  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  projects: 'nanomed-projects',
  experiments: 'nanomed-experiments',
  batches: 'nanomed-batches',
  dataUploads: 'nanomed-uploads',
  auditLog: 'nanomed-audit',
  predictions: 'nanomed-predictions',
  initialized: 'nanomed-initialized',
};

export function DataProvider({ children }: { children: ReactNode }) {
  const [initialized, setInitialized] = useLocalStorage(STORAGE_KEYS.initialized, false);
  const [projects, setProjects] = useLocalStorage<Project[]>(STORAGE_KEYS.projects, []);
  const [experiments, setExperiments] = useLocalStorage<Experiment[]>(STORAGE_KEYS.experiments, []);
  const [batches, setBatches] = useLocalStorage<Batch[]>(STORAGE_KEYS.batches, []);
  const [dataUploads, setDataUploads] = useLocalStorage<DataUpload[]>(STORAGE_KEYS.dataUploads, []);
  const [auditLog, setAuditLog] = useLocalStorage<AuditLogEntry[]>(STORAGE_KEYS.auditLog, []);
  const [predictions, setPredictions] = useLocalStorage<PredictionResult[]>(STORAGE_KEYS.predictions, []);
  
  // Initialize with mock data on first load
  useEffect(() => {
    if (!initialized) {
      setProjects(mockProjects);
      setExperiments(mockExperiments);
      setBatches(mockBatches);
      setDataUploads(mockDataUploads);
      setAuditLog(mockAuditLog);
      setPredictions(mockPredictions);
      setInitialized(true);
    }
  }, [initialized, setInitialized, setProjects, setExperiments, setBatches, setDataUploads, setAuditLog, setPredictions]);

  const resetData = () => {
    setProjects(mockProjects);
    setExperiments(mockExperiments);
    setBatches(mockBatches);
    setDataUploads(mockDataUploads);
    setAuditLog(mockAuditLog);
    setPredictions(mockPredictions);
  };

  // Project operations
  const addProject = (project: Project) => {
    setProjects(prev => [...prev, project]);
    addAuditEntry({
      userId: mockUser.id,
      userName: mockUser.name,
      action: 'Created project',
      entityType: 'project',
      entityId: project.id,
      details: `New project "${project.name}" created.`,
    });
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Experiment operations
  const addExperiment = (experiment: Experiment) => {
    setExperiments(prev => [...prev, experiment]);
    setProjects(prev => prev.map(p => 
      p.id === experiment.projectId 
        ? { ...p, experimentCount: p.experimentCount + 1, updatedAt: new Date().toISOString() } 
        : p
    ));
    addAuditEntry({
      userId: mockUser.id,
      userName: mockUser.name,
      action: 'Created experiment',
      entityType: 'experiment',
      entityId: experiment.id,
      details: `New experiment "${experiment.name}" created.`,
    });
  };

  const updateExperiment = (id: string, updates: Partial<Experiment>) => {
    setExperiments(prev => prev.map(e => e.id === id ? { ...e, ...updates, updatedAt: new Date().toISOString() } : e));
  };

  const deleteExperiment = (id: string) => {
    const experiment = experiments.find(e => e.id === id);
    if (experiment) {
      setExperiments(prev => prev.filter(e => e.id !== id));
      setProjects(prev => prev.map(p => 
        p.id === experiment.projectId 
          ? { ...p, experimentCount: Math.max(0, p.experimentCount - 1), updatedAt: new Date().toISOString() } 
          : p
      ));
    }
  };

  const getExperimentsByProject = (projectId: string) => {
    return experiments.filter(e => e.projectId === projectId);
  };

  // Batch operations
  const addBatch = (batch: Batch) => {
    setBatches(prev => [...prev, batch]);
    setExperiments(prev => prev.map(e => 
      e.id === batch.experimentId 
        ? { ...e, batchCount: e.batchCount + 1, updatedAt: new Date().toISOString() } 
        : e
    ));
    addAuditEntry({
      userId: mockUser.id,
      userName: mockUser.name,
      action: 'Created batch',
      entityType: 'batch',
      entityId: batch.id,
      details: `New batch "${batch.batchNumber}" created.`,
    });
  };

  const updateBatch = (id: string, updates: Partial<Batch>) => {
    setBatches(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const deleteBatch = (id: string) => {
    const batch = batches.find(b => b.id === id);
    if (batch) {
      setBatches(prev => prev.filter(b => b.id !== id));
      setExperiments(prev => prev.map(e => 
        e.id === batch.experimentId 
          ? { ...e, batchCount: Math.max(0, e.batchCount - 1), updatedAt: new Date().toISOString() } 
          : e
      ));
    }
  };

  const getBatchesByExperiment = (experimentId: string) => {
    return batches.filter(b => b.experimentId === experimentId);
  };

  // Data upload operations
  const addDataUpload = (upload: DataUpload) => {
    setDataUploads(prev => [...prev, upload]);
  };

  const linkUploadToBatch = (uploadId: string, batchId: string) => {
    setDataUploads(prev => prev.map(u => 
      u.id === uploadId ? { ...u, batchId, status: 'linked' as const } : u
    ));
    addAuditEntry({
      userId: mockUser.id,
      userName: mockUser.name,
      action: 'Linked instrument data',
      entityType: 'batch',
      entityId: batchId,
      details: `Instrument data linked to batch.`,
    });
  };

  // Audit log operations
  const addAuditEntry = (entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => {
    const newEntry: AuditLogEntry = {
      ...entry,
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setAuditLog(prev => [newEntry, ...prev]);
  };

  // Prediction operations
  const addPrediction = (prediction: PredictionResult) => {
    setPredictions(prev => [prediction, ...prev]);
    addAuditEntry({
      userId: mockUser.id,
      userName: mockUser.name,
      action: 'Created prediction',
      entityType: 'prediction',
      entityId: prediction.id,
      details: 'AI prediction generated for formulation parameters.',
    });
  };

  const value: DataContextType = {
    user: mockUser,
    projects,
    addProject,
    updateProject,
    deleteProject,
    experiments,
    addExperiment,
    updateExperiment,
    deleteExperiment,
    getExperimentsByProject,
    batches,
    addBatch,
    updateBatch,
    deleteBatch,
    getBatchesByExperiment,
    instruments: mockInstruments,
    dataUploads,
    addDataUpload,
    linkUploadToBatch,
    auditLog,
    addAuditEntry,
    predictions,
    addPrediction,
    resetData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
