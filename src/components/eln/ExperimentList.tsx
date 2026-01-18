import { Experiment } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Beaker, Clock, CheckCircle2, AlertCircle, PauseCircle, FileQuestion } from 'lucide-react';

interface ExperimentListProps {
  experiments: Experiment[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const statusConfig = {
  planning: { icon: Clock, color: 'text-muted-foreground', bg: 'bg-muted', label: 'Planning' },
  'in-progress': { icon: Beaker, color: 'text-info', bg: 'bg-info/10', label: 'In Progress' },
  completed: { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', label: 'Completed' },
  failed: { icon: AlertCircle, color: 'text-destructive', bg: 'bg-destructive/10', label: 'Failed' },
  'on-hold': { icon: PauseCircle, color: 'text-warning', bg: 'bg-warning/10', label: 'On Hold' },
};

export function ExperimentList({ experiments, selectedId, onSelect }: ExperimentListProps) {
  if (experiments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center mb-3">
          <FileQuestion className="w-6 h-6 text-muted-foreground/50" />
        </div>
        <p className="text-sm text-muted-foreground">No experiments yet</p>
        <p className="text-xs text-muted-foreground/70 mt-1">Click + to create one</p>
      </div>
    );
  }

  return (
    <div className="py-2">
      {experiments.map((experiment) => {
        const config = statusConfig[experiment.status];
        const StatusIcon = config.icon;
        const isSelected = selectedId === experiment.id;
        
        return (
          <button
            key={experiment.id}
            onClick={() => onSelect(experiment.id)}
            className={cn(
              'w-full text-left px-4 py-3 transition-all duration-200 group relative',
              isSelected 
                ? 'bg-accent/10 border-l-2 border-l-accent' 
                : 'hover:bg-muted/60 border-l-2 border-l-transparent'
            )}
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-all',
                isSelected ? 'bg-accent shadow-lg' : config.bg
              )}>
                <StatusIcon className={cn('w-4 h-4', isSelected ? 'text-white' : config.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn(
                  'font-medium text-sm truncate transition-colors leading-tight',
                  isSelected ? 'text-accent' : 'text-foreground'
                )}>
                  {experiment.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                  {experiment.hypothesis}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <Badge variant="secondary" className={cn('text-[10px] h-5 px-1.5 rounded-md', config.bg, config.color)}>
                    {config.label}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">{experiment.batchCount} batches</span>
                </div>
              </div>
              <ChevronRight className={cn(
                'w-4 h-4 transition-all flex-shrink-0 mt-1',
                isSelected ? 'text-accent opacity-100' : 'text-muted-foreground/30 group-hover:opacity-100 opacity-0'
              )} />
            </div>
          </button>
        );
      })}
    </div>
  );
}