import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useData } from '@/contexts/DataContext';
import { Plus, FlaskConical, Beaker, ChevronRight } from 'lucide-react';
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
        <Button onClick={() => selectedExperimentId ? setShowNewBatch(true) : setShowNewExperiment(true)}>
          <Plus className="w-4 h-4 mr-2" />
          {selectedExperimentId ? 'New Batch' : 'New Experiment'}
        </Button>
      }
    >
      <div className="flex gap-6 h-[calc(100vh-10rem)]">
        {/* Left Panel - Projects */}
        <div className="w-72 flex-shrink-0">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FlaskConical className="w-4 h-4" />
                Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
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
        <div className="w-80 flex-shrink-0">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Beaker className="w-4 h-4" />
                  Experiments
                </CardTitle>
                {selectedProjectId && (
                  <Button size="sm" variant="ghost" onClick={() => setShowNewExperiment(true)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                )}
              </div>
              {selectedProject && (
                <CardDescription className="truncate">{selectedProject.name}</CardDescription>
              )}
            </CardHeader>
            <CardContent className="p-0">
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
                <div className="p-4 text-center text-muted-foreground text-sm">
                  Select a project to view experiments
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Batches & Details */}
        <div className="flex-1 min-w-0">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">
                    {selectedBatch ? `Batch: ${selectedBatch.batchNumber}` : 'Batches'}
                  </CardTitle>
                  {selectedExperiment && !selectedBatch && (
                    <CardDescription className="truncate">{selectedExperiment.name}</CardDescription>
                  )}
                </div>
                {selectedExperimentId && !selectedBatchId && (
                  <Button size="sm" variant="ghost" onClick={() => setShowNewBatch(true)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                )}
                {selectedBatchId && (
                  <Button size="sm" variant="ghost" onClick={() => setSelectedBatchId(null)}>
                    Back to list
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="overflow-auto h-[calc(100%-4rem)]">
              {selectedBatchId && selectedBatch ? (
                <BatchDetail batch={selectedBatch} />
              ) : selectedExperimentId ? (
                <BatchList 
                  batches={experimentBatches}
                  selectedId={selectedBatchId}
                  onSelect={setSelectedBatchId}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                  Select an experiment to view batches
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
