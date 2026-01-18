import { Project } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ProjectListProps {
  projects: Project[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const statusColors = {
  active: 'bg-success/10 text-success border-success/20',
  completed: 'bg-primary/10 text-primary border-primary/20',
  'on-hold': 'bg-warning/10 text-warning border-warning/20',
};

export function ProjectList({ projects, selectedId, onSelect }: ProjectListProps) {
  return (
    <div className="divide-y divide-border">
      {projects.map((project) => (
        <button
          key={project.id}
          onClick={() => onSelect(project.id)}
          className={cn(
            'w-full text-left p-4 hover:bg-muted/50 transition-colors',
            selectedId === project.id && 'bg-muted'
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="font-medium text-sm truncate">{project.name}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {project.experimentCount} experiments
              </p>
            </div>
            <Badge variant="outline" className={cn('text-[10px] flex-shrink-0', statusColors[project.status])}>
              {project.status}
            </Badge>
          </div>
        </button>
      ))}
    </div>
  );
}
