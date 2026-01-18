import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';
import { FlaskConical, Beaker, Activity, Brain, Plus, ArrowRight, TrendingUp, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { projects, experiments, batches, instruments, auditLog } = useData();

  const activeExperiments = experiments.filter(e => e.status === 'in-progress').length;
  const pendingBatches = batches.filter(b => b.status === 'pending').length;
  const onlineInstruments = instruments.filter(i => i.status === 'online').length;

  const stats = [
    { 
      label: 'Active Projects', 
      value: projects.filter(p => p.status === 'active').length, 
      icon: FlaskConical, 
      trend: '+2 this week',
      gradient: 'from-primary/10 via-primary/5 to-transparent',
      iconBg: 'bg-primary',
    },
    { 
      label: 'In-Progress Experiments', 
      value: activeExperiments, 
      icon: Beaker, 
      trend: '+5 this month',
      gradient: 'from-accent/10 via-accent/5 to-transparent',
      iconBg: 'bg-accent',
    },
    { 
      label: 'Pending Batches', 
      value: pendingBatches, 
      icon: Activity, 
      trend: '3 ready to process',
      gradient: 'from-warning/10 via-warning/5 to-transparent',
      iconBg: 'bg-warning',
    },
    { 
      label: 'Online Instruments', 
      value: `${onlineInstruments}/${instruments.length}`, 
      icon: Zap, 
      trend: 'All systems normal',
      gradient: 'from-success/10 via-success/5 to-transparent',
      iconBg: 'bg-success',
    },
  ];

  return (
    <AppLayout title="Dashboard" subtitle="NanoSovereign R&D Platform Overview">
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <Card key={stat.label} className={`relative overflow-hidden border-0 shadow-premium card-hover bg-gradient-to-br ${stat.gradient}`}>
              <div className="absolute inset-0 bg-card/80" />
              <CardContent className="relative p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="stat-number text-foreground">{stat.value}</p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <TrendingUp className="w-3.5 h-3.5 text-success" />
                      <span>{stat.trend}</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.iconBg} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <Card className="group border-primary/20 shadow-premium card-hover bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-xl gradient-premium flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform flex-shrink-0">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">New Experiment</h3>
                  <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">Start a new formulation study</p>
                </div>
                <Button asChild className="rounded-xl shadow-lg w-full sm:w-auto flex-shrink-0">
                  <Link to="/eln">Create</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="group border-accent/20 shadow-premium card-hover bg-gradient-to-br from-accent/5 to-transparent">
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform flex-shrink-0">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">AI Prediction</h3>
                  <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">Predict particle properties</p>
                </div>
                <Button asChild variant="secondary" className="rounded-xl w-full sm:w-auto flex-shrink-0">
                  <Link to="/optimizer">Predict</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="group border-success/20 shadow-premium card-hover bg-gradient-to-br from-success/5 to-transparent md:col-span-2 xl:col-span-1">
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform flex-shrink-0">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">Import Data</h3>
                  <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">Upload instrument results</p>
                </div>
                <Button asChild variant="secondary" className="rounded-xl w-full sm:w-auto flex-shrink-0">
                  <Link to="/instruments">Import</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Projects */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <Card className="shadow-premium border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="section-title">Active Projects</CardTitle>
                <CardDescription className="mt-1">Your current research initiatives</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild className="rounded-xl text-muted-foreground hover:text-foreground">
                <Link to="/eln">View all <ArrowRight className="w-4 h-4 ml-1.5" /></Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {projects.filter(p => p.status === 'active').slice(0, 3).map((project, idx) => (
                <div key={project.id} className="group flex items-center justify-between p-4 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl gradient-premium flex items-center justify-center text-white font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{project.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{project.experimentCount} experiments</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="rounded-lg font-medium">
                    {project.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-premium border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="section-title">Recent Activity</CardTitle>
                <CardDescription className="mt-1">Latest actions in the platform</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild className="rounded-xl text-muted-foreground hover:text-foreground">
                <Link to="/compliance">View all <ArrowRight className="w-4 h-4 ml-1.5" /></Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {auditLog.slice(0, 4).map((entry, idx) => (
                <div key={entry.id} className="flex items-start gap-4 p-4 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors">
                  <div className="w-2.5 h-2.5 rounded-full gradient-premium mt-1.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{entry.action}</p>
                    <p className="text-xs text-muted-foreground mt-1 truncate">{entry.details}</p>
                    <p className="text-xs text-muted-foreground/70 mt-1.5">
                      {new Date(entry.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Footer Copyright */}
        <div className="pt-6 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 <span className="font-semibold">Arshi Niyaz</span>. All Rights Reserved.
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            NanoSovereign - Advanced Nanomedicine Research & Development
          </p>
        </div>
      </div>
    </AppLayout>
  );
}