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
  planning: { icon: Clock, color: 'text-slate-500', label: 'Planning', dot: 'bg-slate-400' },
  'in-progress': { icon: Beaker, color: 'text-info', label: 'In Progress', dot: 'bg-info' },
  completed: { icon: CheckCircle2, color: 'text-success', label: 'Completed', dot: 'bg-success' },
  failed: { icon: AlertCircle, color: 'text-destructive', label: 'Failed', dot: 'bg-destructive' },
  'on-hold': { icon: PauseCircle, color: 'text-warning', label: 'On Hold', dot: 'bg-warning' },
};

export function ExperimentList({ experiments, selectedId, onSelect }: ExperimentListProps) {
  if (experiments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] p-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <FileQuestion className="w-7 h-7 text-muted-foreground/40" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">No Experiments</p>
        <p className="text-xs text-muted-foreground/70 mt-1">Click + to create one</p>
      </div>
    );
  }

  return (
    <div className="p-2">
      {experiments.map((experiment) => {
        const config = statusConfig[experiment.status];
        const isSelected = selectedId === experiment.id;
        
        return (
          <button
            key={experiment.id}
            onClick={() => onSelect(experiment.id)}
            className={cn(
              'w-full text-left p-3 rounded-xl transition-all duration-150 group mb-1',
              isSelected 
                ? 'bg-accent text-accent-foreground shadow-md' 
                : 'hover:bg-muted/80'
            )}
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5',
                isSelected ? 'bg-white/20' : 'bg-muted'
              )}>
                <config.icon className={cn('w-4 h-4', isSelected ? 'text-accent-foreground' : config.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn(
                  'font-medium text-sm truncate leading-tight',
                  isSelected ? 'text-accent-foreground' : 'text-foreground'
                )}>
                  {experiment.name}
                </p>
                <p className={cn(
                  'text-[11px] mt-1 line-clamp-2 leading-relaxed',
                  isSelected ? 'text-accent-foreground/70' : 'text-muted-foreground'
                )}>
                  {experiment.hypothesis}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <span className={cn('w-1.5 h-1.5 rounded-full', config.dot)} />
                    <span className={cn(
                      'text-[10px] font-medium',
                      isSelected ? 'text-accent-foreground/80' : config.color
                    )}>
                      {config.label}
                    </span>
                  </div>
                  <span className={cn('text-[10px]', isSelected ? 'text-accent-foreground/50' : 'text-muted-foreground/50')}>•</span>
                  <span className={cn('text-[10px]', isSelected ? 'text-accent-foreground/70' : 'text-muted-foreground')}>
                    {experiment.batchCount} batches
                  </span>
                </div>
              </div>
              <ChevronRight className={cn(
                'w-4 h-4 flex-shrink-0 mt-1 transition-transform',
                isSelected ? 'text-accent-foreground' : 'text-muted-foreground/40 group-hover:translate-x-0.5'
              )} />
            </div>
          </button>
        );
      })}
    </div>
  );
}