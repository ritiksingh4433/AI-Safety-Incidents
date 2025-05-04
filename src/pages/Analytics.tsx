
import React from 'react';
import { IncidentProvider } from '@/context/IncidentContext';
import { Sidebar } from '@/components/Dashboard/Sidebar';
import { Header } from '@/components/Dashboard/Header';
import { BarChart, PieChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function IncidentStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="glass-card hover-scale">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">42</div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </CardContent>
      </Card>
      <Card className="glass-card hover-scale">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Open Incidents</CardTitle>
          <PieChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">18</div>
          <p className="text-xs text-muted-foreground">-5% from last month</p>
        </CardContent>
      </Card>
      <Card className="glass-card hover-scale">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Resolution Time</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">3.2h</div>
          <p className="text-xs text-muted-foreground">Avg. time to resolution</p>
        </CardContent>
      </Card>
    </div>
  );
}

function AnalyticsContent() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-card/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <IncidentStats />
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 glass-card">
              <CardHeader>
                <CardTitle>Incident Trends</CardTitle>
                <CardDescription>Frequency of incidents over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] flex items-center justify-center bg-accent/20 rounded-md">
                  <p className="text-sm text-muted-foreground">Time-series chart would display here</p>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3 glass-card">
              <CardHeader>
                <CardTitle>Incident by Category</CardTitle>
                <CardDescription>Breakdown by type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-accent/20 rounded-md">
                  <p className="text-sm text-muted-foreground">Pie chart would display here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const Analytics = () => {
  return (
    <IncidentProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <div className="flex-1 overflow-auto">
            <AnalyticsContent />
          </div>
        </div>
      </div>
    </IncidentProvider>
  );
};

export default Analytics;
