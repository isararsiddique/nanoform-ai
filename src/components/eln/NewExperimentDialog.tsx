import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/hooks/use-toast';

interface NewExperimentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string | null;
}

export function NewExperimentDialog({ open, onOpenChange, projectId }: NewExperimentDialogProps) {
  const { addExperiment, projects } = useData();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [hypothesis, setHypothesis] = useState('');

  const project = projects.find(p => p.id === projectId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !name || !hypothesis) return;

    addExperiment({
      id: `exp-${Date.now()}`,
      projectId,
      name,
      hypothesis,
      status: 'planning',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      batchCount: 0,
    });

    toast({
      title: 'Experiment created',
      description: `"${name}" has been added to ${project?.name}.`,
    });

    setName('');
    setHypothesis('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Experiment</DialogTitle>
          <DialogDescription>
            Create a new experiment in {project?.name || 'the selected project'}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Experiment Name</Label>
              <Input
                id="name"
                placeholder="e.g., PEG-Lipid Optimization Study"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hypothesis">Hypothesis</Label>
              <Textarea
                id="hypothesis"
                placeholder="Describe the scientific hypothesis you're testing..."
                value={hypothesis}
                onChange={(e) => setHypothesis(e.target.value)}
                rows={4}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!projectId}>
              Create Experiment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
