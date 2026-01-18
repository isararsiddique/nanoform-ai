import { Batch } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BatchDetailProps {
  batch: Batch;
}

export function BatchDetail({ batch }: BatchDetailProps) {
  const { processParameters, characterizationData } = batch;

  return (
    <div className="space-y-6">
      {/* Process Parameters */}
      <div>
        <h3 className="font-semibold mb-4">Process Parameters</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Temperature</p>
              <p className="text-xl font-bold">{processParameters.temperature}°C</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Flow Rate</p>
              <p className="text-xl font-bold">{processParameters.totalFlowRate} mL/min</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">pH</p>
              <p className="text-xl font-bold">{processParameters.pH}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Aq:Org Ratio</p>
              <p className="text-xl font-bold">{processParameters.aqueousToOrganicRatio}:1</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lipid Composition */}
      <div>
        <h3 className="font-semibold mb-4">Lipid Composition</h3>
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Ionizable Lipid</p>
              <p className="text-xl font-bold">{processParameters.lipidComposition.ionizableLipid}%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">DSPC</p>
              <p className="text-xl font-bold">{processParameters.lipidComposition.dspc}%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Cholesterol</p>
              <p className="text-xl font-bold">{processParameters.lipidComposition.cholesterol}%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">PEG-Lipid</p>
              <p className="text-xl font-bold">{processParameters.lipidComposition.pegLipid}%</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      {/* Characterization Data */}
      {characterizationData ? (
        <>
          <div>
            <h3 className="font-semibold mb-4">Characterization Results</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">Z-Average</p>
                  <p className="text-2xl font-bold text-primary">{characterizationData.zAverage.toFixed(1)} nm</p>
                </CardContent>
              </Card>
              <Card className="border-accent/30 bg-accent/5">
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">PDI</p>
                  <p className="text-2xl font-bold text-accent">{characterizationData.pdi.toFixed(3)}</p>
                </CardContent>
              </Card>
              <Card className="border-success/30 bg-success/5">
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">Encapsulation</p>
                  <p className="text-2xl font-bold text-success">{characterizationData.encapsulationEfficiency.toFixed(1)}%</p>
                </CardContent>
              </Card>
              <Card className="border-info/30 bg-info/5">
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">Zeta Potential</p>
                  <p className="text-2xl font-bold text-info">{characterizationData.zetaPotential.toFixed(1)} mV</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Size Distribution Chart */}
          <div>
            <h3 className="font-semibold mb-4">Size Distribution</h3>
            <Card>
              <CardContent className="p-4">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={characterizationData.sizeDistribution}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis 
                        dataKey="size" 
                        label={{ value: 'Size (nm)', position: 'bottom', offset: -5 }}
                        className="text-xs"
                      />
                      <YAxis 
                        label={{ value: 'Intensity (%)', angle: -90, position: 'insideLeft' }}
                        className="text-xs"
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="intensity" 
                        stroke="hsl(var(--primary))" 
                        fill="hsl(var(--primary))" 
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>No characterization data available yet.</p>
          <p className="text-sm mt-1">Link DLS measurements from the Instruments module.</p>
        </div>
      )}
    </div>
  );
}
