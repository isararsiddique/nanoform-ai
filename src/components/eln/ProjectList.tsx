import { Project } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, FlaskConical } from 'lucide-react';

interface ProjectListProps {
  projects: Project[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const statusConfig = {
  active: { bg: 'bg-success', dot: 'bg-success', text: 'text-success' },
  completed: { bg: 'bg-primary', dot: 'bg-primary', text: 'text-primary' },
  'on-hold': { bg: 'bg-warning', dot: 'bg-warning', text: 'text-warning' },
};

export function ProjectList({ projects, selectedId, onSelect }: ProjectListProps) {
  return (
    <div className="py-2">
      {projects.map((project, index) => {
        const config = statusConfig[project.status];
        const isSelected = selectedId === project.id;
        
        return (
          <button
            key={project.id}
            onClick={() => onSelect(project.id)}
            className={cn(
              'w-full text-left px-4 py-3 transition-all duration-200 group relative',
              isSelected 
                ? 'bg-primary/10 border-l-2 border-l-primary' 
                : 'hover:bg-muted/60 border-l-2 border-l-transparent'
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all',
                isSelected ? 'gradient-premium shadow-lg' : 'bg-muted group-hover:bg-primary/10'
              )}>
                <FlaskConical className={cn('w-4 h-4', isSelected ? 'text-white' : 'text-muted-foreground group-hover:text-primary')} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn(
                  'font-medium text-sm truncate transition-colors',
                  isSelected ? 'text-primary' : 'text-foreground'
                )}>
                  {project.name}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={cn('w-1.5 h-1.5 rounded-full', config.dot)} />
                  <span className="text-xs text-muted-foreground capitalize">{project.status}</span>
                  <span className="text-xs text-muted-foreground/50">•</span>
                  <span className="text-xs text-muted-foreground">{project.experimentCount} exp</span>
                </div>
              </div>
              <ChevronRight className={cn(
                'w-4 h-4 transition-all flex-shrink-0',
                isSelected ? 'text-primary opacity-100' : 'text-muted-foreground/30 group-hover:opacity-100 opacity-0'
              )} />
            </div>
          </button>
        );
      })}
    </div>
  );
}