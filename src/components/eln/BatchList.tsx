import { Batch } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface BatchListProps {
  batches: Batch[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const statusColors = {
  pending: 'bg-muted text-muted-foreground border-muted',
  characterized: 'bg-info/10 text-info border-info/20',
  approved: 'bg-success/10 text-success border-success/20',
  rejected: 'bg-destructive/10 text-destructive border-destructive/20',
};

export function BatchList({ batches, selectedId, onSelect }: BatchListProps) {
  if (batches.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        No batches yet. Create your first batch to get started.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {batches.map((batch) => (
        <Card
          key={batch.id}
          className={cn(
            'cursor-pointer hover:border-primary/50 transition-colors',
            selectedId === batch.id && 'border-primary'
          )}
          onClick={() => onSelect(batch.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-medium">{batch.batchNumber}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(batch.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Badge variant="outline" className={cn('text-[10px]', statusColors[batch.status])}>
                {batch.status}
              </Badge>
            </div>

            {batch.characterizationData ? (
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Size:</span>
                  <span className="ml-1 font-medium">{batch.characterizationData.zAverage.toFixed(1)} nm</span>
                </div>
                <div>
                  <span className="text-muted-foreground">PDI:</span>
                  <span className="ml-1 font-medium">{batch.characterizationData.pdi.toFixed(3)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">EE:</span>
                  <span className="ml-1 font-medium">{batch.characterizationData.encapsulationEfficiency.toFixed(1)}%</span>
                </div>
                <div>
                  <span className="text-muted-foreground">ζ:</span>
                  <span className="ml-1 font-medium">{batch.characterizationData.zetaPotential.toFixed(1)} mV</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">Awaiting characterization</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
