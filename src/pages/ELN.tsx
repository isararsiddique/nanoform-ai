import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { Plus, FlaskConical, Beaker, Layers, ChevronRight, FolderOpen } from 'lucide-react';
import { ProjectList } from '@/components/eln/ProjectList';
import { ExperimentList } from '@/components/eln/ExperimentList';
import { BatchList } from '@/components/eln/BatchList';
import { BatchDetail } from '@/components/eln/BatchDetail';
import { NewExperimentDialog } from '@/components/eln/NewExperimentDialog';
import { NewBatchDialog } from '@/components/eln/NewBatchDialog';

export default function ELN() {
  const { projects, experiments, batches } = useData();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedExperimentId, setSelectedExperimentId] = useState<string | null>(null);
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);
  const [showNewExperiment, setShowNewExperiment] = useState(false);
  const [showNewBatch, setShowNewBatch] = useState(false);

  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const selectedExperiment = experiments.find(e => e.id === selectedExperimentId);
  const selectedBatch = batches.find(b => b.id === selectedBatchId);

  const projectExperiments = selectedProjectId 
    ? experiments.filter(e => e.projectId === selectedProjectId)
    : [];

  const experimentBatches = selectedExperimentId
    ? batches.filter(b => b.experimentId === selectedExperimentId)
    : [];

  return (
    <AppLayout 
      title="Electronic Lab Notebook" 
      subtitle="Manage projects, experiments, and batches"
      actions={
        <Button onClick={() => selectedExperimentId ? setShowNewBatch(true) : setShowNewExperiment(true)} className="rounded-xl shadow-lg">
          <Plus className="w-4 h-4 mr-2" />
          {selectedExperimentId ? 'New Batch' : 'New Experiment'}
        </Button>
      }
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <span className="font-medium text-foreground">Projects</span>
        {selectedProject && (
          <>
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium text-foreground">{selectedProject.name}</span>
          </>
        )}
        {selectedExperiment && (
          <>
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium text-foreground">{selectedExperiment.name}</span>
          </>
        )}
        {selectedBatch && (
          <>
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium text-primary">{selectedBatch.batchNumber}</span>
          </>
        )}
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
        {/* Left Panel - Projects */}
        <div className="col-span-12 lg:col-span-3">
          <Card className="h-full shadow-premium border-0 overflow-hidden">
            <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-transparent border-b">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg gradient-premium flex items-center justify-center">
                  <FolderOpen className="w-4 h-4 text-white" />
                </div>
                Projects
              </CardTitle>
              <CardDescription className="text-xs">{projects.length} total</CardDescription>
            </CardHeader>
            <CardContent className="p-0 overflow-auto h-[calc(100%-5rem)]">
              <ProjectList 
                projects={projects}
                selectedId={selectedProjectId}
                onSelect={(id) => {
                  setSelectedProjectId(id);
                  setSelectedExperimentId(null);
                  setSelectedBatchId(null);
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Middle Panel - Experiments */}
        <div className="col-span-12 lg:col-span-3">
          <Card className="h-full shadow-premium border-0 overflow-hidden">
            <CardHeader className="pb-3 bg-gradient-to-r from-accent/5 to-transparent border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
                    <Beaker className="w-4 h-4 text-white" />
                  </div>
                  Experiments
                </CardTitle>
                {selectedProjectId && (
                  <Button size="icon" variant="ghost" onClick={() => setShowNewExperiment(true)} className="h-7 w-7 rounded-lg hover:bg-accent/10">
                    <Plus className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <CardDescription className="text-xs">
                {selectedProject ? `${projectExperiments.length} experiments` : 'Select a project'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 overflow-auto h-[calc(100%-5rem)]">
              {selectedProjectId ? (
                <ExperimentList 
                  experiments={projectExperiments}
                  selectedId={selectedExperimentId}
                  onSelect={(id) => {
                    setSelectedExperimentId(id);
                    setSelectedBatchId(null);
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center mb-3">
                    <Beaker className="w-6 h-6 text-muted-foreground/50" />
                  </div>
                  <p className="text-sm text-muted-foreground">Select a project to view experiments</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Batches & Details */}
        <div className="col-span-12 lg:col-span-6">
          <Card className="h-full shadow-premium border-0 overflow-hidden">
            <CardHeader className="pb-3 bg-gradient-to-r from-success/5 to-transparent border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-success flex items-center justify-center">
                    <Layers className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-semibold">
                      {selectedBatch ? `Batch: ${selectedBatch.batchNumber}` : 'Batches'}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {selectedExperiment && !selectedBatch 
                        ? `${experimentBatches.length} batches` 
                        : selectedBatch 
                          ? 'Detailed view' 
                          : 'Select an experiment'}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedExperimentId && !selectedBatchId && (
                    <Button size="sm" variant="outline" onClick={() => setShowNewBatch(true)} className="h-8 rounded-lg text-xs">
                      <Plus className="w-3 h-3 mr-1" />
                      Add Batch
                    </Button>
                  )}
                  {selectedBatchId && (
                    <Button size="sm" variant="ghost" onClick={() => setSelectedBatchId(null)} className="h-8 rounded-lg text-xs">
                      ← Back to list
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="overflow-auto h-[calc(100%-5rem)] p-4">
              {selectedBatchId && selectedBatch ? (
                <BatchDetail batch={selectedBatch} />
              ) : selectedExperimentId ? (
                <BatchList 
                  batches={experimentBatches}
                  selectedId={selectedBatchId}
                  onSelect={setSelectedBatchId}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
                    <Layers className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">No experiment selected</p>
                  <p className="text-xs text-muted-foreground/70">Select an experiment to view and manage batches</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <NewExperimentDialog 
        open={showNewExperiment}
        onOpenChange={setShowNewExperiment}
        projectId={selectedProjectId}
      />

      <NewBatchDialog
        open={showNewBatch}
        onOpenChange={setShowNewBatch}
        experimentId={selectedExperimentId}
      />
    </AppLayout>
  );
}