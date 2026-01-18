import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useData } from '@/contexts/DataContext';
import { Activity, Upload, Link2, Wifi, WifiOff, AlertTriangle, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function Instruments() {
  const { instruments, dataUploads, batches } = useData();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <Wifi className="w-4 h-4 text-success" />;
      case 'offline':
        return <WifiOff className="w-4 h-4 text-muted-foreground" />;
      case 'maintenance':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-success/10 text-success border-success/20';
      case 'offline':
        return 'bg-muted text-muted-foreground';
      case 'maintenance':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return '';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'dls':
        return 'Dynamic Light Scattering';
      case 'hplc':
        return 'High-Performance Liquid Chromatography';
      case 'tem':
        return 'Transmission Electron Microscopy';
      case 'mass-spec':
        return 'Mass Spectrometry';
      case 'uv-vis':
        return 'UV-Vis Spectroscopy';
      default:
        return type;
    }
  };

  return (
    <AppLayout 
      title="Instrument Data" 
      subtitle="Connected instruments and data uploads"
      actions={
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Import Data
        </Button>
      }
    >
      <Tabs defaultValue="status" className="space-y-6">
        <TabsList>
          <TabsTrigger value="status" className="gap-2">
            <Activity className="w-4 h-4" />
            Instrument Status
          </TabsTrigger>
          <TabsTrigger value="uploads" className="gap-2">
            <FileText className="w-4 h-4" />
            Data Uploads
          </TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {instruments.map((instrument) => (
              <Card key={instrument.id} className={cn(
                'border-l-4',
                instrument.status === 'online' && 'border-l-success',
                instrument.status === 'offline' && 'border-l-muted-foreground',
                instrument.status === 'maintenance' && 'border-l-warning'
              )}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{instrument.name}</CardTitle>
                      <CardDescription className="text-xs mt-1">
                        {getTypeLabel(instrument.type)}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className={cn('text-xs', getStatusColor(instrument.status))}>
                      {getStatusIcon(instrument.status)}
                      <span className="ml-1 capitalize">{instrument.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location</span>
                      <span>{instrument.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Sync</span>
                      <span>{new Date(instrument.lastSync).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Connection Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Connection Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-success/10">
                  <p className="text-3xl font-bold text-success">
                    {instruments.filter(i => i.status === 'online').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Online</p>
                </div>
                <div className="p-4 rounded-lg bg-warning/10">
                  <p className="text-3xl font-bold text-warning">
                    {instruments.filter(i => i.status === 'maintenance').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Maintenance</p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-3xl font-bold text-muted-foreground">
                    {instruments.filter(i => i.status === 'offline').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Offline</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="uploads" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Data Uploads</CardTitle>
              <CardDescription>
                Instrument data files ready for linking to batches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Instrument</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Linked Batch</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataUploads.map((upload) => {
                    const instrument = instruments.find(i => i.id === upload.instrumentId);
                    const batch = batches.find(b => b.id === upload.batchId);
                    
                    return (
                      <TableRow key={upload.id}>
                        <TableCell className="font-medium">{upload.fileName}</TableCell>
                        <TableCell>{upload.fileType}</TableCell>
                        <TableCell>{instrument?.name || 'Unknown'}</TableCell>
                        <TableCell>{new Date(upload.uploadedAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn(
                            'text-xs',
                            upload.status === 'linked' && 'bg-success/10 text-success border-success/20',
                            upload.status === 'processed' && 'bg-info/10 text-info border-info/20',
                            upload.status === 'pending' && 'bg-muted text-muted-foreground'
                          )}>
                            {upload.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {batch ? batch.batchNumber : '-'}
                        </TableCell>
                        <TableCell>
                          {upload.status !== 'linked' && (
                            <Button variant="ghost" size="sm">
                              <Link2 className="w-4 h-4 mr-1" />
                              Link
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
