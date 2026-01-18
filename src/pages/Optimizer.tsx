import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useData } from '@/contexts/DataContext';
import { Brain, Sparkles, Target, History } from 'lucide-react';
import { ProcessParameters } from '@/types';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

export default function Optimizer() {
  const { predictions, addPrediction } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState<any>(null);

  // Input parameters
  const [ionizableLipid, setIonizableLipid] = useState(50);
  const [dspc, setDspc] = useState(10);
  const [cholesterol, setCholesterol] = useState(38.5);
  const [pegLipid, setPegLipid] = useState(1.5);
  const [flowRate, setFlowRate] = useState(3);
  const [temperature, setTemperature] = useState(25);
  const [pH, setpH] = useState(4.0);

  const runPrediction = () => {
    setIsLoading(true);
    
    // Simulate AI prediction with realistic mock results
    setTimeout(() => {
      const baseSize = 75 + (ionizableLipid - 50) * 0.8 - (pegLipid - 1.5) * 5 + (flowRate - 3) * -3;
      const basePDI = 0.12 - (flowRate - 3) * 0.01 + (pegLipid - 1.5) * 0.02;
      const baseEE = 92 + (cholesterol - 38.5) * 0.5 - (temperature - 25) * 0.2;
      const baseZeta = -3 + (pH - 4) * 0.5;

      const result = {
        id: `pred-${Date.now()}`,
        timestamp: new Date().toISOString(),
        inputParameters: {
          lipidComposition: { ionizableLipid, dspc, cholesterol, pegLipid },
          flowRate,
          totalFlowRate: flowRate * 4,
          aqueousToOrganicRatio: 3,
          temperature,
          pH,
          mixingSpeed: 1200,
        } as ProcessParameters,
        predictions: {
          zAverage: { value: Math.max(50, Math.min(150, baseSize + Math.random() * 10)), confidence: 0.88 + Math.random() * 0.1 },
          pdi: { value: Math.max(0.05, Math.min(0.3, basePDI + Math.random() * 0.02)), confidence: 0.85 + Math.random() * 0.1 },
          encapsulationEfficiency: { value: Math.max(75, Math.min(99, baseEE + Math.random() * 5)), confidence: 0.89 + Math.random() * 0.08 },
          zetaPotential: { value: Math.max(-10, Math.min(0, baseZeta + Math.random() * 2)), confidence: 0.82 + Math.random() * 0.1 },
        },
      };

      setPredictionResult(result);
      addPrediction(result);
      setIsLoading(false);
    }, 1500);
  };

  const predictionChartData = predictionResult ? [
    { name: 'Size (nm)', predicted: predictionResult.predictions.zAverage.value, optimal: 80, confidence: predictionResult.predictions.zAverage.confidence * 100 },
    { name: 'PDI ×100', predicted: predictionResult.predictions.pdi.value * 100, optimal: 10, confidence: predictionResult.predictions.pdi.confidence * 100 },
    { name: 'EE (%)', predicted: predictionResult.predictions.encapsulationEfficiency.value, optimal: 95, confidence: predictionResult.predictions.encapsulationEfficiency.confidence * 100 },
  ] : [];

  return (
    <AppLayout 
      title="AI Formulation Optimizer" 
      subtitle="Predict particle properties and optimize formulations"
    >
      <Tabs defaultValue="predict" className="space-y-6">
        <TabsList>
          <TabsTrigger value="predict" className="gap-2">
            <Sparkles className="w-4 h-4" />
            Predict
          </TabsTrigger>
          <TabsTrigger value="suggest" className="gap-2">
            <Target className="w-4 h-4" />
            Suggest
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <History className="w-4 h-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="predict" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Parameters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Input Parameters
                </CardTitle>
                <CardDescription>
                  Adjust formulation and process parameters to predict particle properties
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground">Lipid Composition</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <Label>Ionizable Lipid</Label>
                        <span className="font-medium">{ionizableLipid}%</span>
                      </div>
                      <Slider value={[ionizableLipid]} onValueChange={([v]) => setIonizableLipid(v)} min={30} max={60} step={0.5} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <Label>DSPC</Label>
                        <span className="font-medium">{dspc}%</span>
                      </div>
                      <Slider value={[dspc]} onValueChange={([v]) => setDspc(v)} min={5} max={20} step={0.5} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <Label>Cholesterol</Label>
                        <span className="font-medium">{cholesterol}%</span>
                      </div>
                      <Slider value={[cholesterol]} onValueChange={([v]) => setCholesterol(v)} min={30} max={50} step={0.5} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <Label>PEG-Lipid</Label>
                        <span className="font-medium">{pegLipid}%</span>
                      </div>
                      <Slider value={[pegLipid]} onValueChange={([v]) => setPegLipid(v)} min={0.5} max={3} step={0.1} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground">Process Parameters</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <Label>Flow Rate</Label>
                        <span className="font-medium">{flowRate} mL/min</span>
                      </div>
                      <Slider value={[flowRate]} onValueChange={([v]) => setFlowRate(v)} min={1} max={6} step={0.5} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <Label>Temp</Label>
                        <span className="font-medium">{temperature}°C</span>
                      </div>
                      <Slider value={[temperature]} onValueChange={([v]) => setTemperature(v)} min={4} max={40} step={1} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <Label>pH</Label>
                        <span className="font-medium">{pH.toFixed(1)}</span>
                      </div>
                      <Slider value={[pH]} onValueChange={([v]) => setpH(v)} min={3.5} max={6} step={0.1} />
                    </div>
                  </div>
                </div>

                <Button onClick={runPrediction} disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                      Running Prediction...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Predict Properties
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Prediction Results */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Predicted Properties</CardTitle>
                <CardDescription>
                  AI-predicted particle characteristics with confidence intervals
                </CardDescription>
              </CardHeader>
              <CardContent>
                {predictionResult ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="border-primary/30 bg-primary/5">
                        <CardContent className="p-4 text-center">
                          <p className="text-xs text-muted-foreground">Z-Average</p>
                          <p className="text-3xl font-bold text-primary">{predictionResult.predictions.zAverage.value.toFixed(1)}</p>
                          <p className="text-sm text-muted-foreground">nm</p>
                          <Badge variant="outline" className="mt-2 text-xs">
                            {(predictionResult.predictions.zAverage.confidence * 100).toFixed(0)}% confidence
                          </Badge>
                        </CardContent>
                      </Card>
                      <Card className="border-accent/30 bg-accent/5">
                        <CardContent className="p-4 text-center">
                          <p className="text-xs text-muted-foreground">PDI</p>
                          <p className="text-3xl font-bold text-accent">{predictionResult.predictions.pdi.value.toFixed(3)}</p>
                          <p className="text-sm text-muted-foreground">polydispersity</p>
                          <Badge variant="outline" className="mt-2 text-xs">
                            {(predictionResult.predictions.pdi.confidence * 100).toFixed(0)}% confidence
                          </Badge>
                        </CardContent>
                      </Card>
                      <Card className="border-success/30 bg-success/5">
                        <CardContent className="p-4 text-center">
                          <p className="text-xs text-muted-foreground">Encapsulation</p>
                          <p className="text-3xl font-bold text-success">{predictionResult.predictions.encapsulationEfficiency.value.toFixed(1)}</p>
                          <p className="text-sm text-muted-foreground">%</p>
                          <Badge variant="outline" className="mt-2 text-xs">
                            {(predictionResult.predictions.encapsulationEfficiency.confidence * 100).toFixed(0)}% confidence
                          </Badge>
                        </CardContent>
                      </Card>
                      <Card className="border-info/30 bg-info/5">
                        <CardContent className="p-4 text-center">
                          <p className="text-xs text-muted-foreground">Zeta Potential</p>
                          <p className="text-3xl font-bold text-info">{predictionResult.predictions.zetaPotential.value.toFixed(1)}</p>
                          <p className="text-sm text-muted-foreground">mV</p>
                          <Badge variant="outline" className="mt-2 text-xs">
                            {(predictionResult.predictions.zetaPotential.confidence * 100).toFixed(0)}% confidence
                          </Badge>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={predictionChartData}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                          <XAxis dataKey="name" className="text-xs" />
                          <YAxis className="text-xs" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Bar dataKey="predicted" fill="hsl(var(--primary))" name="Predicted" />
                          <Bar dataKey="optimal" fill="hsl(var(--muted))" name="Optimal Target" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                    <Brain className="w-12 h-12 mb-4 opacity-50" />
                    <p>Adjust parameters and click "Predict Properties"</p>
                    <p className="text-sm">to generate AI predictions</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="suggest">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Target Property Optimization
              </CardTitle>
              <CardDescription>
                Set your target particle properties and get recommended formulation parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Coming Soon</p>
                <p className="text-sm">Inverse optimization will suggest formulation parameters</p>
                <p className="text-sm">based on your target particle properties.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5 text-primary" />
                Prediction History
              </CardTitle>
              <CardDescription>
                Review past predictions and compare with actual results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No predictions yet. Run your first prediction above.</p>
                  </div>
                ) : (
                  predictions.slice(0, 10).map((pred) => (
                    <div key={pred.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium text-sm">
                          Size: {pred.predictions.zAverage.value.toFixed(1)}nm | 
                          PDI: {pred.predictions.pdi.value.toFixed(3)} | 
                          EE: {pred.predictions.encapsulationEfficiency.value.toFixed(1)}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(pred.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <Badge variant="outline">
                        Avg confidence: {((pred.predictions.zAverage.confidence + pred.predictions.pdi.confidence + pred.predictions.encapsulationEfficiency.confidence) / 3 * 100).toFixed(0)}%
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
