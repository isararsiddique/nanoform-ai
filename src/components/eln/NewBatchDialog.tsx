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
import { Slider } from '@/components/ui/slider';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/hooks/use-toast';

interface NewBatchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experimentId: string | null;
}

export function NewBatchDialog({ open, onOpenChange, experimentId }: NewBatchDialogProps) {
  const { addBatch, experiments } = useData();
  const { toast } = useToast();
  
  const [batchNumber, setBatchNumber] = useState('');
  const [ionizableLipid, setIonizableLipid] = useState(50);
  const [dspc, setDspc] = useState(10);
  const [cholesterol, setCholesterol] = useState(38.5);
  const [pegLipid, setPegLipid] = useState(1.5);
  const [flowRate, setFlowRate] = useState(3);
  const [temperature, setTemperature] = useState(25);
  const [pH, setpH] = useState(4.0);

  const experiment = experiments.find(e => e.id === experimentId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!experimentId || !batchNumber) return;

    addBatch({
      id: `batch-${Date.now()}`,
      experimentId,
      batchNumber,
      createdAt: new Date().toISOString(),
      processParameters: {
        lipidComposition: {
          ionizableLipid,
          dspc,
          cholesterol,
          pegLipid,
        },
        flowRate,
        totalFlowRate: flowRate * 4,
        aqueousToOrganicRatio: 3,
        temperature,
        pH,
        mixingSpeed: 1200,
      },
      status: 'pending',
    });

    toast({
      title: 'Batch created',
      description: `Batch "${batchNumber}" has been created.`,
    });

    // Reset form
    setBatchNumber('');
    setIonizableLipid(50);
    setDspc(10);
    setCholesterol(38.5);
    setPegLipid(1.5);
    setFlowRate(3);
    setTemperature(25);
    setpH(4.0);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>New Batch</DialogTitle>
          <DialogDescription>
            Create a new batch for {experiment?.name || 'the selected experiment'}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="batchNumber">Batch Number</Label>
              <Input
                id="batchNumber"
                placeholder="e.g., MC3-003-A"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                required
              />
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-sm">Lipid Composition</h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Ionizable Lipid</Label>
                    <span className="text-sm text-muted-foreground">{ionizableLipid}%</span>
                  </div>
                  <Slider
                    value={[ionizableLipid]}
                    onValueChange={([v]) => setIonizableLipid(v)}
                    min={30}
                    max={60}
                    step={0.5}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>DSPC</Label>
                    <span className="text-sm text-muted-foreground">{dspc}%</span>
                  </div>
                  <Slider
                    value={[dspc]}
                    onValueChange={([v]) => setDspc(v)}
                    min={5}
                    max={20}
                    step={0.5}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Cholesterol</Label>
                    <span className="text-sm text-muted-foreground">{cholesterol}%</span>
                  </div>
                  <Slider
                    value={[cholesterol]}
                    onValueChange={([v]) => setCholesterol(v)}
                    min={30}
                    max={50}
                    step={0.5}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>PEG-Lipid</Label>
                    <span className="text-sm text-muted-foreground">{pegLipid}%</span>
                  </div>
                  <Slider
                    value={[pegLipid]}
                    onValueChange={([v]) => setPegLipid(v)}
                    min={0.5}
                    max={3}
                    step={0.1}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-sm">Process Parameters</h4>
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Flow Rate (mL/min)</Label>
                    <span className="text-sm text-muted-foreground">{flowRate}</span>
                  </div>
                  <Slider
                    value={[flowRate]}
                    onValueChange={([v]) => setFlowRate(v)}
                    min={1}
                    max={6}
                    step={0.5}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Temperature (°C)</Label>
                    <span className="text-sm text-muted-foreground">{temperature}</span>
                  </div>
                  <Slider
                    value={[temperature]}
                    onValueChange={([v]) => setTemperature(v)}
                    min={4}
                    max={40}
                    step={1}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>pH</Label>
                    <span className="text-sm text-muted-foreground">{pH.toFixed(1)}</span>
                  </div>
                  <Slider
                    value={[pH]}
                    onValueChange={([v]) => setpH(v)}
                    min={3.5}
                    max={6}
                    step={0.1}
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!experimentId}>
              Create Batch
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
