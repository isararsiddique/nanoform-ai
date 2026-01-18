import { Batch } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Clock, CheckCircle2, XCircle, Microscope, ChevronRight } from 'lucide-react';

interface BatchListProps {
  batches: Batch[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const statusConfig = {
  pending: { icon: Clock, color: 'text-muted-foreground', bg: 'bg-muted', label: 'Pending' },
  characterized: { icon: Microscope, color: 'text-info', bg: 'bg-info/10', label: 'Characterized' },
  approved: { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', label: 'Approved' },
  rejected: { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10', label: 'Rejected' },
};

export function BatchList({ batches, selectedId, onSelect }: BatchListProps) {
  if (batches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px]">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <Microscope className="w-8 h-8 text-muted-foreground/40" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">No Batches Yet</p>
        <p className="text-xs text-muted-foreground/70 mt-1">Create your first batch to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
      {batches.map((batch) => {
        const config = statusConfig[batch.status];
        const StatusIcon = config.icon;
        
        return (
          <Card
            key={batch.id}
            className={cn(
              'cursor-pointer transition-all duration-200 hover:shadow-md overflow-hidden group',
              selectedId === batch.id ? 'ring-2 ring-primary' : 'hover:border-primary/30'
            )}
            onClick={() => onSelect(batch.id)}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b bg-muted/30">
              <div className="flex items-center gap-2">
                <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center', config.bg)}>
                  <StatusIcon className={cn('w-3.5 h-3.5', config.color)} />
                </div>
                <div>
                  <p className="font-semibold text-sm">{batch.batchNumber}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {new Date(batch.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className={cn('text-[10px] font-medium h-5', config.bg, config.color)}>
                {config.label}
              </Badge>
            </div>

            {/* Content */}
            <div className="p-3">
              {batch.characterizationData ? (
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-muted/50 rounded-lg p-2 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Size</p>
                    <p className="text-base font-bold text-foreground">{batch.characterizationData.zAverage.toFixed(0)}<span className="text-xs font-normal ml-0.5">nm</span></p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-2 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">PDI</p>
                    <p className="text-base font-bold text-foreground">{batch.characterizationData.pdi.toFixed(3)}</p>
                  </div>
                  <div className="bg-success/5 rounded-lg p-2 text-center border border-success/10">
                    <p className="text-[10px] text-success uppercase tracking-wide">EE%</p>
                    <p className="text-base font-bold text-success">{batch.characterizationData.encapsulationEfficiency.toFixed(0)}%</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-2 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Zeta</p>
                    <p className="text-base font-bold text-foreground">{batch.characterizationData.zetaPotential.toFixed(1)}<span className="text-xs font-normal ml-0.5">mV</span></p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center py-6 bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <Clock className="w-6 h-6 text-muted-foreground/40 mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Awaiting data</p>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-end mt-3 pt-2 border-t">
                <span className="text-[11px] text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                  View details <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}