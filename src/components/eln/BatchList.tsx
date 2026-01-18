import { Batch } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, CheckCircle2, XCircle, Microscope, ArrowRight, TrendingUp } from 'lucide-react';

interface BatchListProps {
  batches: Batch[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const statusConfig = {
  pending: { icon: Clock, color: 'text-muted-foreground', bg: 'bg-muted', border: 'border-muted', label: 'Pending' },
  characterized: { icon: Microscope, color: 'text-info', bg: 'bg-info/10', border: 'border-info/30', label: 'Characterized' },
  approved: { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', border: 'border-success/30', label: 'Approved' },
  rejected: { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/30', label: 'Rejected' },
};

export function BatchList({ batches, selectedId, onSelect }: BatchListProps) {
  if (batches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
          <Microscope className="w-8 h-8 text-muted-foreground/50" />
        </div>
        <p className="text-sm text-muted-foreground mb-1">No batches yet</p>
        <p className="text-xs text-muted-foreground/70">Create your first batch to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {batches.map((batch) => {
        const config = statusConfig[batch.status];
        const StatusIcon = config.icon;
        const isSelected = selectedId === batch.id;
        
        return (
          <Card
            key={batch.id}
            className={cn(
              'cursor-pointer transition-all duration-200 group card-hover border-0 shadow-premium overflow-hidden',
              isSelected ? 'ring-2 ring-primary shadow-primary/10' : 'hover:shadow-premium-lg'
            )}
            onClick={() => onSelect(batch.id)}
          >
            <CardContent className="p-0">
              {/* Header */}
              <div className={cn('px-4 py-3 border-b flex items-center justify-between', config.bg)}>
                <div className="flex items-center gap-3">
                  <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', config.bg, 'border', config.border)}>
                    <StatusIcon className={cn('w-4 h-4', config.color)} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{batch.batchNumber}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {new Date(batch.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className={cn('text-[10px] font-medium', config.bg, config.color)}>
                  {config.label}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-4">
                {batch.characterizationData ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-muted/40 rounded-lg p-2.5">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Particle Size</p>
                        <p className="text-lg font-bold text-foreground">{batch.characterizationData.zAverage.toFixed(1)}<span className="text-xs font-normal text-muted-foreground ml-0.5">nm</span></p>
                      </div>
                      <div className="bg-muted/40 rounded-lg p-2.5">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">PDI</p>
                        <p className="text-lg font-bold text-foreground">{batch.characterizationData.pdi.toFixed(3)}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-success/5 rounded-lg p-2.5 border border-success/10">
                        <p className="text-[10px] text-success uppercase tracking-wider mb-0.5">Encapsulation</p>
                        <div className="flex items-center gap-1">
                          <p className="text-lg font-bold text-success">{batch.characterizationData.encapsulationEfficiency.toFixed(1)}%</p>
                          <TrendingUp className="w-3 h-3 text-success" />
                        </div>
                      </div>
                      <div className="bg-muted/40 rounded-lg p-2.5">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Zeta Potential</p>
                        <p className="text-lg font-bold text-foreground">{batch.characterizationData.zetaPotential.toFixed(1)}<span className="text-xs font-normal text-muted-foreground ml-0.5">mV</span></p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-6">
                    <div className="text-center">
                      <Clock className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Awaiting characterization</p>
                    </div>
                  </div>
                )}

                {/* View Details Link */}
                <div className="flex items-center justify-end mt-3 pt-3 border-t border-border/50">
                  <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                    View details <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}