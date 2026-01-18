import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { FlaskConical, Beaker, Activity, Brain, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { projects, experiments, batches, instruments, auditLog } = useData();

  const activeExperiments = experiments.filter(e => e.status === 'in-progress').length;
  const pendingBatches = batches.filter(b => b.status === 'pending').length;
  const onlineInstruments = instruments.filter(i => i.status === 'online').length;

  const stats = [
    { label: 'Active Projects', value: projects.filter(p => p.status === 'active').length, icon: FlaskConical, color: 'text-primary' },
    { label: 'In-Progress Experiments', value: activeExperiments, icon: Beaker, color: 'text-accent' },
    { label: 'Pending Batches', value: pendingBatches, icon: Activity, color: 'text-warning' },
    { label: 'Online Instruments', value: `${onlineInstruments}/${instruments.length}`, icon: Activity, color: 'text-success' },
  ];

  return (
    <AppLayout title="Dashboard" subtitle="Nanomedicine R&D Platform Overview">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-10 h-10 ${stat.color} opacity-80`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                  <Plus className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">New Experiment</h3>
                  <p className="text-sm text-muted-foreground">Start a new formulation study</p>
                </div>
                <Button asChild size="sm">
                  <Link to="/eln">Create</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
                  <Brain className="w-6 h-6 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">AI Prediction</h3>
                  <p className="text-sm text-muted-foreground">Predict particle properties</p>
                </div>
                <Button asChild size="sm" variant="secondary">
                  <Link to="/optimizer">Predict</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-success flex items-center justify-center">
                  <Activity className="w-6 h-6 text-success-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Import Data</h3>
                  <p className="text-sm text-muted-foreground">Upload instrument results</p>
                </div>
                <Button asChild size="sm" variant="secondary">
                  <Link to="/instruments">Import</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Active Projects</CardTitle>
                <CardDescription>Your current research initiatives</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/eln">View all <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {projects.filter(p => p.status === 'active').slice(0, 3).map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-sm">{project.name}</p>
                    <p className="text-xs text-muted-foreground">{project.experimentCount} experiments</p>
                  </div>
                  <Badge variant="outline">{project.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>Latest actions in the platform</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/compliance">View all <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {auditLog.slice(0, 4).map((entry) => (
                <div key={entry.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{entry.action}</p>
                    <p className="text-xs text-muted-foreground truncate">{entry.details}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(entry.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
