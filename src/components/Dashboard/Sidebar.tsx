
import React from 'react';
import { useIncidents } from '@/context/IncidentContext';
import { Shield, AlertTriangle, CheckCircle, BarChart, Settings, Plus, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Separator } from '../ui/separator';

export function Sidebar() {
  const { filteredIncidents, filterStatus, setFilterStatus } = useIncidents();
  const isMobile = useIsMobile();
  
  if (isMobile) return null;
  
  const openCount = filteredIncidents.filter(i => i.status === 'open').length;
  const investigatingCount = filteredIncidents.filter(i => i.status === 'investigating').length;
  const resolvedCount = filteredIncidents.filter(i => i.status === 'resolved').length;
  const closedCount = filteredIncidents.filter(i => i.status === 'closed').length;
  
  const menuItems = [
    { label: 'All Incidents', value: 'all', icon: Shield, count: filteredIncidents.length },
    { label: 'Open', value: 'open', icon: AlertTriangle, count: openCount },
    { label: 'Investigating', value: 'investigating', icon: AlertTriangle, count: investigatingCount },
    { label: 'Resolved', value: 'resolved', icon: CheckCircle, count: resolvedCount },
    { label: 'Closed', value: 'closed', icon: CheckCircle, count: closedCount },
  ];

  return (
    <div className="w-60 min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col glass-card">
      <div className="p-4 border-b border-sidebar-border/50">
        <h1 className="text-xl font-semibold text-primary flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" /> HumanChain
        </h1>
        <p className="text-xs text-muted-foreground mt-1">AI Safety Dashboard</p>
      </div>
      
      <div className="flex-1 overflow-auto p-3">
        <div className="mb-6">
          <p className="text-xs uppercase text-muted-foreground font-semibold tracking-wider mb-2 px-3 flex items-center">
            <span>Status</span>
            <ChevronRight className="h-3 w-3 ml-1" />
          </p>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.value}
                className={`w-full flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  filterStatus === item.value
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                }`}
                onClick={() => setFilterStatus(item.value as any)}
              >
                <span className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </span>
                <span className={`text-xs rounded-full w-6 h-6 flex items-center justify-center ${
                  filterStatus === item.value 
                    ? 'bg-primary/20 text-primary-foreground/90 font-semibold'
                    : 'bg-secondary/40 text-secondary-foreground/80'
                }`}>
                  {item.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
        
        <Separator className="my-4 bg-sidebar-border/50" />
        
        <div>
          <p className="text-xs uppercase text-muted-foreground font-semibold tracking-wider mb-2 px-3 flex items-center">
            <span>Reports</span>
            <ChevronRight className="h-3 w-3 ml-1" />
          </p>
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors">
              <BarChart className="h-4 w-4" /> Analytics
            </button>
            <button className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors">
              <Settings className="h-4 w-4" /> Settings
            </button>
          </nav>
        </div>
      </div>
      
      <div className="p-3 border-t border-sidebar-border/50 mt-auto">
        <Button className="w-full bg-primary/80 hover:bg-primary" size="sm">
          <Plus className="h-4 w-4 mr-1.5" /> New Incident
        </Button>
      </div>
    </div>
  );
}
