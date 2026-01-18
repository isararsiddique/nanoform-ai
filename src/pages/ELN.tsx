import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { Plus, FlaskConical, Beaker, Layers, ChevronRight, FolderOpen, ArrowLeft } from 'lucide-react';
import { ProjectList } from '@/components/eln/ProjectList';
import { ExperimentList } from '@/components/eln/ExperimentList';
import { BatchList } from '@/components/eln/BatchList';
import { BatchDetail } from '@/components/eln/BatchDetail';
import { NewExperimentDialog } from '@/components/eln/NewExperimentDialog';
import { NewBatchDialog } from '@/components/eln/NewBatchDialog';
import { ScrollArea } from '@/components/ui/scroll-area';

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
        <Button onClick={() => selectedExperimentId ? setShowNewBatch(true) : setShowNewExperiment(true)} className="rounded-xl">
          <Plus className="w-4 h-4 mr-2" />
          {selectedExperimentId ? 'New Batch' : 'New Experiment'}
        </Button>
      }
    >
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-sm mb-6 bg-muted/30 rounded-xl px-4 py-2.5 w-fit">
        <FolderOpen className="w-4 h-4 text-primary" />
        <span className="font-medium text-foreground">Projects</span>
        {selectedProject && (
          <>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground max-w-[150px] truncate">{selectedProject.name}</span>
          </>
        )}
        {selectedExperiment && (
          <>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground max-w-[150px] truncate">{selectedExperiment.name}</span>
          </>
        )}
        {selectedBatch && (
          <>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium text-primary">{selectedBatch.batchNumber}</span>
          </>
        )}
      </nav>

      <div className="flex gap-5 h-[calc(100vh-14rem)]">
        {/* Projects Panel */}
        <Card className="w-[280px] flex-shrink-0 bg-card border shadow-sm rounded-2xl overflow-hidden flex flex-col">
          <CardHeader className="p-4 border-b bg-muted/20 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg gradient-premium flex items-center justify-center shadow-sm">
                  <FolderOpen className="w-4 h-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">Projects</CardTitle>
                  <p className="text-[11px] text-muted-foreground">{projects.length} total</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <ScrollArea className="flex-1">
            <ProjectList 
              projects={projects}
              selectedId={selectedProjectId}
              onSelect={(id) => {
                setSelectedProjectId(id);
                setSelectedExperimentId(null);
                setSelectedBatchId(null);
              }}
            />
          </ScrollArea>
        </Card>

        {/* Experiments Panel */}
        <Card className="w-[300px] flex-shrink-0 bg-card border shadow-sm rounded-2xl overflow-hidden flex flex-col">
          <CardHeader className="p-4 border-b bg-muted/20 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-sm">
                  <Beaker className="w-4 h-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">Experiments</CardTitle>
                  <p className="text-[11px] text-muted-foreground">
                    {selectedProject ? `${projectExperiments.length} in project` : 'Select a project'}
                  </p>
                </div>
              </div>
              {selectedProjectId && (
                <Button size="icon" variant="outline" onClick={() => setShowNewExperiment(true)} className="h-8 w-8 rounded-lg">
                  <Plus className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <ScrollArea className="flex-1">
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
              <div className="flex flex-col items-center justify-center h-[300px] p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <Beaker className="w-7 h-7 text-muted-foreground/40" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">No Project Selected</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Choose a project from the list</p>
              </div>
            )}
          </ScrollArea>
        </Card>

        {/* Batches Panel */}
        <Card className="flex-1 min-w-0 bg-card border shadow-sm rounded-2xl overflow-hidden flex flex-col">
          <CardHeader className="p-4 border-b bg-muted/20 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-success flex items-center justify-center shadow-sm">
                  <Layers className="w-4 h-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">
                    {selectedBatch ? selectedBatch.batchNumber : 'Batches'}
                  </CardTitle>
                  <p className="text-[11px] text-muted-foreground">
                    {selectedBatch 
                      ? 'Batch Details' 
                      : selectedExperiment 
                        ? `${experimentBatches.length} batches` 
                        : 'Select an experiment'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedBatchId && (
                  <Button size="sm" variant="ghost" onClick={() => setSelectedBatchId(null)} className="h-8 rounded-lg text-xs gap-1">
                    <ArrowLeft className="w-3 h-3" />
                    Back
                  </Button>
                )}
                {selectedExperimentId && !selectedBatchId && (
                  <Button size="sm" variant="outline" onClick={() => setShowNewBatch(true)} className="h-8 rounded-lg text-xs gap-1">
                    <Plus className="w-3 h-3" />
                    New Batch
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <ScrollArea className="flex-1 p-4">
            {selectedBatchId && selectedBatch ? (
              <BatchDetail batch={selectedBatch} />
            ) : selectedExperimentId ? (
              <BatchList 
                batches={experimentBatches}
                selectedId={selectedBatchId}
                onSelect={setSelectedBatchId}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px]">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <Layers className="w-8 h-8 text-muted-foreground/40" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">No Experiment Selected</p>
                <p className="text-xs text-muted-foreground/70 mt-1 text-center max-w-[200px]">
                  Select an experiment to view and manage its batches
                </p>
              </div>
            )}
          </ScrollArea>
        </Card>
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