import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { Plus, Beaker, Layers, ChevronRight, FolderOpen, ArrowLeft, ChevronLeft } from 'lucide-react';
import { ProjectList } from '@/components/eln/ProjectList';
import { ExperimentList } from '@/components/eln/ExperimentList';
import { BatchList } from '@/components/eln/BatchList';
import { BatchDetail } from '@/components/eln/BatchDetail';
import { NewExperimentDialog } from '@/components/eln/NewExperimentDialog';
import { NewBatchDialog } from '@/components/eln/NewBatchDialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Project, Experiment } from '@/types';
import { cn } from '@/lib/utils';

export default function ELN() {
  const { projects, experiments, batches } = useData();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedExperimentId, setSelectedExperimentId] = useState<string | null>(null);
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);
  const [showNewExperiment, setShowNewExperiment] = useState(false);
  const [showNewBatch, setShowNewBatch] = useState(false);

  const selectedProject = projects.find((p: Project) => p.id === selectedProjectId);
  const selectedExperiment = experiments.find((e: Experiment) => e.id === selectedExperimentId);
  const selectedBatch = batches.find((b) => b.id === selectedBatchId);

  const projectExperiments = selectedProjectId 
    ? experiments.filter((e: Experiment) => e.projectId === selectedProjectId)
    : [];

  const experimentBatches = selectedExperimentId
    ? batches.filter((b) => b.experimentId === selectedExperimentId)
    : [];

  // Navigation handlers
  const handleProjectSelect = (id: string) => {
    setSelectedProjectId(id);
    setSelectedExperimentId(null);
    setSelectedBatchId(null);
  };

  const handleExperimentSelect = (id: string) => {
    setSelectedExperimentId(id);
    setSelectedBatchId(null);
  };

  const handleBackToProjects = () => {
    setSelectedProjectId(null);
    setSelectedExperimentId(null);
    setSelectedBatchId(null);
  };

  const handleBackToExperiments = () => {
    setSelectedExperimentId(null);
    setSelectedBatchId(null);
  };

  const handleBackToBatches = () => {
    setSelectedBatchId(null);
  };

  return (
    <AppLayout 
      title="Electronic Lab Notebook" 
      subtitle="Manage projects, experiments, and batches"
      actions={
        <Button 
          onClick={() => selectedExperimentId ? setShowNewBatch(true) : setShowNewExperiment(true)} 
          className="rounded-xl"
          disabled={!selectedProjectId && !selectedExperimentId}
        >
          <Plus className="w-4 h-4 mr-2" />
          {selectedExperimentId ? 'New Batch' : 'New Experiment'}
        </Button>
      }
    >
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-sm mb-6 bg-muted/30 rounded-xl px-4 py-2.5 w-fit">
        <button 
          onClick={handleBackToProjects}
          className="flex items-center gap-1.5 hover:text-primary transition-colors"
        >
          <FolderOpen className="w-4 h-4 text-primary" />
          <span className="font-medium text-foreground">Projects</span>
        </button>
        {selectedProject && (
          <>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <button 
              onClick={handleBackToExperiments}
              className="text-muted-foreground hover:text-primary transition-colors max-w-[150px] truncate"
            >
              {selectedProject.name}
            </button>
          </>
        )}
        {selectedExperiment && (
          <>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <button 
              onClick={handleBackToBatches}
              className="text-muted-foreground hover:text-primary transition-colors max-w-[150px] truncate"
            >
              {selectedExperiment.name}
            </button>
          </>
        )}
        {selectedBatch && (
          <>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium text-primary">{selectedBatch.batchNumber}</span>
          </>
        )}
      </nav>

      <div className="flex gap-4 h-[calc(100vh-14rem)]">
        {/* Projects Panel - Collapsible */}
        <Card className={cn(
          "flex-shrink-0 bg-card border shadow-sm rounded-2xl overflow-hidden flex flex-col transition-all duration-300",
          selectedExperimentId ? "w-16" : selectedProjectId ? "w-20" : "w-[280px]"
        )}>
          <CardHeader className={cn(
            "p-3 border-b bg-muted/20 flex-shrink-0",
            (selectedProjectId || selectedExperimentId) && "px-2"
          )}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-premium flex items-center justify-center shadow-sm flex-shrink-0">
                  <FolderOpen className="w-4 h-4 text-white" />
                </div>
                {!selectedProjectId && !selectedExperimentId && (
                  <div>
                    <CardTitle className="text-sm font-semibold">Projects</CardTitle>
                    <p className="text-[11px] text-muted-foreground">{projects.length} total</p>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <ScrollArea className="flex-1">
            {selectedProjectId || selectedExperimentId ? (
              // Collapsed view - show icons only
              <div className="p-2 space-y-1">
                {projects.map((project: Project) => (
                  <button
                    key={project.id}
                    onClick={() => handleProjectSelect(project.id)}
                    className={cn(
                      "w-full p-2 rounded-lg transition-all flex items-center justify-center",
                      selectedProjectId === project.id 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-muted"
                    )}
                    title={project.name}
                  >
                    <span className="text-xs font-bold">
                      {project.name.substring(0, 2).toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <ProjectList 
                projects={projects}
                selectedId={selectedProjectId}
                onSelect={handleProjectSelect}
              />
            )}
          </ScrollArea>
        </Card>

        {/* Experiments Panel - Shows when project selected */}
        {selectedProjectId && (
          <Card className={cn(
            "flex-shrink-0 bg-card border shadow-sm rounded-2xl overflow-hidden flex flex-col transition-all duration-300",
            selectedExperimentId ? "w-20" : "w-[320px]"
          )}>
            <CardHeader className={cn(
              "p-3 border-b bg-muted/20 flex-shrink-0",
              selectedExperimentId && "px-2"
            )}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {!selectedExperimentId && (
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={handleBackToProjects}
                      className="h-8 w-8 rounded-lg"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                  )}
                  <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-sm flex-shrink-0">
                    <Beaker className="w-4 h-4 text-white" />
                  </div>
                  {!selectedExperimentId && (
                    <div>
                      <CardTitle className="text-sm font-semibold">Experiments</CardTitle>
                      <p className="text-[11px] text-muted-foreground">
                        {projectExperiments.length} in {selectedProject?.name?.substring(0, 15)}...
                      </p>
                    </div>
                  )}
                </div>
                {!selectedExperimentId && (
                  <Button 
                    size="icon" 
                    variant="outline" 
                    onClick={() => setShowNewExperiment(true)} 
                    className="h-8 w-8 rounded-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <ScrollArea className="flex-1">
              {selectedExperimentId ? (
                // Collapsed view - show icons only
                <div className="p-2 space-y-1">
                  {projectExperiments.map((experiment: Experiment) => (
                    <button
                      key={experiment.id}
                      onClick={() => handleExperimentSelect(experiment.id)}
                      className={cn(
                        "w-full p-2 rounded-lg transition-all flex items-center justify-center",
                        selectedExperimentId === experiment.id 
                          ? "bg-accent text-accent-foreground" 
                          : "hover:bg-muted"
                      )}
                      title={experiment.name}
                    >
                      <span className="text-xs font-bold">
                        {experiment.name.substring(0, 2).toUpperCase()}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <ExperimentList 
                  experiments={projectExperiments}
                  selectedId={selectedExperimentId}
                  onSelect={handleExperimentSelect}
                />
              )}
            </ScrollArea>
          </Card>
        )}

        {/* Batches/Main Content Panel */}
        <Card className="flex-1 min-w-0 bg-card border shadow-sm rounded-2xl overflow-hidden flex flex-col">
          <CardHeader className="p-4 border-b bg-muted/20 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {selectedExperimentId && (
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={selectedBatchId ? handleBackToBatches : handleBackToExperiments}
                    className="h-8 w-8 rounded-lg"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                )}
                <div className="w-8 h-8 rounded-lg bg-success flex items-center justify-center shadow-sm">
                  <Layers className="w-4 h-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">
                    {selectedBatch 
                      ? selectedBatch.batchNumber 
                      : selectedExperiment 
                        ? `Batches - ${selectedExperiment.name.substring(0, 25)}${selectedExperiment.name.length > 25 ? '...' : ''}`
                        : selectedProject
                          ? 'Select an Experiment'
                          : 'Select a Project to Start'
                    }
                  </CardTitle>
                  <p className="text-[11px] text-muted-foreground">
                    {selectedBatch 
                      ? 'Batch Details & Characterization' 
                      : selectedExperiment 
                        ? `${experimentBatches.length} batches in this experiment` 
                        : selectedProject
                          ? `${projectExperiments.length} experiments available`
                          : `${projects.length} projects available`
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedBatchId && (
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={handleBackToBatches} 
                    className="h-8 rounded-lg text-xs gap-1"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    Back to List
                  </Button>
                )}
                {selectedExperimentId && !selectedBatchId && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setShowNewBatch(true)} 
                    className="h-8 rounded-lg text-xs gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    New Batch
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <ScrollArea className="flex-1">
            <div className="p-4">
              {selectedBatchId && selectedBatch ? (
                <BatchDetail batch={selectedBatch} />
              ) : selectedExperimentId ? (
                <BatchList 
                  batches={experimentBatches}
                  selectedId={selectedBatchId}
                  onSelect={setSelectedBatchId}
                />
              ) : selectedProjectId ? (
                // Show experiment cards when project is selected but no experiment
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Beaker className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {selectedProject?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {selectedProject?.description}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Select an experiment from the panel on the left, or create a new one.
                    </p>
                  </div>
                  
                  {/* Quick experiment overview */}
                  {projectExperiments.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                      {projectExperiments.map((exp: Experiment) => (
                        <Card 
                          key={exp.id}
                          className="cursor-pointer hover:border-accent/50 transition-colors"
                          onClick={() => handleExperimentSelect(exp.id)}
                        >
                          <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-sm line-clamp-1">{exp.name}</h4>
                              <span className={cn(
                                "text-[10px] px-2 py-0.5 rounded-full",
                                exp.status === 'completed' && "bg-success/10 text-success",
                                exp.status === 'in-progress' && "bg-info/10 text-info",
                                exp.status === 'planning' && "bg-muted text-muted-foreground",
                                exp.status === 'on-hold' && "bg-warning/10 text-warning",
                                exp.status === 'failed' && "bg-destructive/10 text-destructive"
                              )}>
                                {exp.status}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                              {exp.hypothesis}
                            </p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{exp.batchCount} batches</span>
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // Welcome screen when nothing selected
                <div className="flex flex-col items-center justify-center h-[400px]">
                  <div className="w-20 h-20 rounded-2xl gradient-premium flex items-center justify-center mb-6 shadow-lg">
                    <FolderOpen className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Welcome to ELN</h3>
                  <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
                    Select a project from the left panel to view experiments and batches.
                    Track your nanomedicine formulation research with structured data management.
                  </p>
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{projects.length}</div>
                      <div className="text-xs text-muted-foreground">Projects</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent">{experiments.length}</div>
                      <div className="text-xs text-muted-foreground">Experiments</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-success">{batches.length}</div>
                      <div className="text-xs text-muted-foreground">Batches</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
