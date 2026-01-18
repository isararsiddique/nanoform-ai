import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FlaskConical,
  Brain,
  Activity,
  Shield,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Lab Notebook', href: '/eln', icon: FlaskConical },
  { name: 'AI Optimizer', href: '/optimizer', icon: Brain },
  { name: 'Instruments', href: '/instruments', icon: Activity },
  { name: 'Compliance', href: '/compliance', icon: Shield },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        'flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-out',
        collapsed ? 'w-[72px]' : 'w-[260px]'
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-[72px] px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-scientific flex items-center justify-center shadow-lg">
            <FlaskConical className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-base font-bold text-sidebar-foreground tracking-tight">
                NanoMed
              </span>
              <span className="text-[11px] text-sidebar-foreground/50 font-medium uppercase tracking-wider">
                R&D Platform
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-5 px-3 space-y-1.5">
        <div className={cn("mb-4", !collapsed && "px-2")}>
          {!collapsed && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
              Main Menu
            </span>
          )}
        </div>
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-sidebar-primary/25'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* AI Badge */}
      {!collapsed && (
        <div className="mx-3 mb-4 p-3 rounded-xl bg-gradient-to-br from-sidebar-primary/20 to-sidebar-accent/10 border border-sidebar-primary/20">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-sidebar-primary" />
            <span className="text-xs font-semibold text-sidebar-foreground">AI-Powered</span>
          </div>
          <p className="text-[11px] text-sidebar-foreground/60 leading-relaxed">
            Optimize formulations with advanced ML models
          </p>
        </div>
      )}

      {/* Bottom section */}
      <div className="border-t border-sidebar-border p-3">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
              isActive
                ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-sidebar-primary/25'
                : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            )
          }
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </NavLink>
      </div>

      {/* Collapse button */}
      <div className="p-3 border-t border-sidebar-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full justify-center text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-xl"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 mr-2" />
              <span className="text-xs">Collapse</span>
            </>
          )}
        </Button>
      </div>

      {/* Copyright */}
      <div className="px-3 pb-4 pt-2 text-center">
        <p className="text-[10px] text-sidebar-foreground/40 font-medium">
          © 2024 Arshi Niyaz
        </p>
        <p className="text-[9px] text-sidebar-foreground/30">
          All Rights Reserved
        </p>
      </div>
    </div>
  );
}