import { Project } from '@/types';
import { cn } from '@/lib/utils';
import { FlaskConical, ChevronRight } from 'lucide-react';

interface ProjectListProps {
  projects: Project[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const statusColors = {
  active: 'bg-success',
  completed: 'bg-primary',
  'on-hold': 'bg-warning',
};

export function ProjectList({ projects, selectedId, onSelect }: ProjectListProps) {
  return (
    <div className="p-2">
      {projects.map((project) => {
        const isSelected = selectedId === project.id;
        
        return (
          <button
            key={project.id}
            onClick={() => onSelect(project.id)}
            className={cn(
              'w-full text-left p-3 rounded-xl transition-all duration-150 group mb-1',
              isSelected 
                ? 'bg-primary text-primary-foreground shadow-md' 
                : 'hover:bg-muted/80'
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0',
                isSelected ? 'bg-white/20' : 'bg-muted'
              )}>
                <FlaskConical className={cn('w-4 h-4', isSelected ? 'text-primary-foreground' : 'text-muted-foreground')} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn(
                  'font-medium text-sm truncate',
                  isSelected ? 'text-primary-foreground' : 'text-foreground'
                )}>
                  {project.name}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className={cn('w-2 h-2 rounded-full', statusColors[project.status])} />
                  <span className={cn(
                    'text-[11px] capitalize',
                    isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'
                  )}>
                    {project.status}
                  </span>
                  <span className={cn('text-[11px]', isSelected ? 'text-primary-foreground/60' : 'text-muted-foreground/60')}>•</span>
                  <span className={cn('text-[11px]', isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
                    {project.experimentCount} exp
                  </span>
                </div>
              </div>
              <ChevronRight className={cn(
                'w-4 h-4 flex-shrink-0 transition-transform',
                isSelected ? 'text-primary-foreground' : 'text-muted-foreground/40 group-hover:translate-x-0.5'
              )} />
            </div>
          </button>
        );
      })}
    </div>
  );
}