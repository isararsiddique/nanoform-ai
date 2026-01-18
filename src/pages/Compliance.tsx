import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useData } from '@/contexts/DataContext';
import { mockModelCards } from '@/data/mockData';
import { Shield, FileText, Cpu, Globe, Download, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

export default function Compliance() {
  const { auditLog } = useData();

  const dataResidency = 'KSA';
  const pendingApprovals = 3;
  const electronicSignatures = 12;

  return (
    <AppLayout 
      title="Compliance & Audit" 
      subtitle="Data sovereignty, audit trails, and model governance"
      actions={
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Audit Report
        </Button>
      }
    >
      {/* Compliance Status Banner */}
      <Card className="mb-6 border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                <Globe className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Data Residency</p>
                <p className="text-xl font-bold">{dataResidency}</p>
                <p className="text-xs text-success">Compliant</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Approvals</p>
                <p className="text-xl font-bold">{pendingApprovals}</p>
                <p className="text-xs text-warning">Requires attention</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-info/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">E-Signatures</p>
                <p className="text-xl font-bold">{electronicSignatures}</p>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">AI Models</p>
                <p className="text-xl font-bold">{mockModelCards.filter(m => m.validationStatus === 'validated').length}/{mockModelCards.length}</p>
                <p className="text-xs text-muted-foreground">Validated</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="audit" className="space-y-6">
        <TabsList>
          <TabsTrigger value="audit" className="gap-2">
            <Shield className="w-4 h-4" />
            Audit Trail
          </TabsTrigger>
          <TabsTrigger value="models" className="gap-2">
            <Cpu className="w-4 h-4" />
            Model Cards
          </TabsTrigger>
        </TabsList>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Audit Trail</CardTitle>
              <CardDescription>
                Complete log of all actions performed in the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Entity</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLog.slice(0, 15).map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="whitespace-nowrap">
                        {new Date(entry.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-medium">{entry.userName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {entry.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="capitalize">{entry.entityType}</TableCell>
                      <TableCell className="max-w-xs truncate text-muted-foreground">
                        {entry.details}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockModelCards.map((model) => (
              <Card key={model.id} className={cn(
                'border-l-4',
                model.validationStatus === 'validated' && 'border-l-success',
                model.validationStatus === 'pending' && 'border-l-warning',
                model.validationStatus === 'deprecated' && 'border-l-muted-foreground'
              )}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{model.name}</CardTitle>
                      <CardDescription className="text-xs">
                        Version {model.version}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className={cn(
                      'text-xs',
                      model.validationStatus === 'validated' && 'bg-success/10 text-success border-success/20',
                      model.validationStatus === 'pending' && 'bg-warning/10 text-warning border-warning/20',
                      model.validationStatus === 'deprecated' && 'bg-muted text-muted-foreground'
                    )}>
                      {model.validationStatus === 'validated' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {model.validationStatus === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                      {model.validationStatus === 'deprecated' && <AlertCircle className="w-3 h-3 mr-1" />}
                      {model.validationStatus}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {model.description}
                  </p>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Accuracy</p>
                      <p className="font-medium">{model.accuracy.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Trained</p>
                      <p className="font-medium">{new Date(model.trainedOn).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Updated</p>
                      <p className="font-medium">{new Date(model.lastUpdated).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
