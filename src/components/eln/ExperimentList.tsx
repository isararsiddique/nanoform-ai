import { Experiment } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ExperimentListProps {
  experiments: Experiment[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const statusColors = {
  planning: 'bg-muted text-muted-foreground border-muted',
  'in-progress': 'bg-info/10 text-info border-info/20',
  completed: 'bg-success/10 text-success border-success/20',
  failed: 'bg-destructive/10 text-destructive border-destructive/20',
  'on-hold': 'bg-warning/10 text-warning border-warning/20',
};

export function ExperimentList({ experiments, selectedId, onSelect }: ExperimentListProps) {
  if (experiments.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground text-sm">
        No experiments yet
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {experiments.map((experiment) => (
        <button
          key={experiment.id}
          onClick={() => onSelect(experiment.id)}
          className={cn(
            'w-full text-left p-4 hover:bg-muted/50 transition-colors',
            selectedId === experiment.id && 'bg-muted'
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="font-medium text-sm truncate">{experiment.name}</p>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {experiment.hypothesis}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {experiment.batchCount} batches
              </p>
            </div>
            <Badge variant="outline" className={cn('text-[10px] flex-shrink-0', statusColors[experiment.status])}>
              {experiment.status}
            </Badge>
          </div>
        </button>
      ))}
    </div>
  );
}
