import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useData } from '@/contexts/DataContext';
import { User, Globe, Bell, Database, RefreshCw } from 'lucide-react';

export default function Settings() {
  const { user, resetData } = useData();

  return (
    <AppLayout title="Settings" subtitle="Platform configuration and preferences">
      <div className="max-w-4xl space-y-6">
        {/* User Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5" />
              User Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Name</Label>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Email</Label>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Role</Label>
                <Badge variant="outline" className="capitalize">{user.role}</Badge>
              </div>
              <div>
                <Label className="text-muted-foreground">Organization</Label>
                <p className="font-medium">{user.organization}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Sovereignty */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Data Sovereignty
            </CardTitle>
            <CardDescription>
              Configure data residency and compliance settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Current Data Residency</Label>
                <p className="text-sm text-muted-foreground">All data is stored in this region</p>
              </div>
              <Badge className="bg-success/10 text-success border-success/20">
                Kingdom of Saudi Arabia (KSA)
              </Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Enforce Regional Processing</Label>
                <p className="text-sm text-muted-foreground">AI models run within the specified region</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Cross-Border Transfer Notifications</Label>
                <p className="text-sm text-muted-foreground">Alert when data might leave the region</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Experiment Status Updates</Label>
                <p className="text-sm text-muted-foreground">Get notified when experiments change status</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Instrument Data Uploads</Label>
                <p className="text-sm text-muted-foreground">Notify when new data is available</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Approval Requests</Label>
                <p className="text-sm text-muted-foreground">Alert for pending batch approvals</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Demo Data */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Database className="w-5 h-5" />
              Demo Data
            </CardTitle>
            <CardDescription>
              Manage the sample data used in this prototype
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label>Reset All Data</Label>
                <p className="text-sm text-muted-foreground">Restore all projects, experiments, and batches to initial state</p>
              </div>
              <Button variant="outline" onClick={resetData}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
