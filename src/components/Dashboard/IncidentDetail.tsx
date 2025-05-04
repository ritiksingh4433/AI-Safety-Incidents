
import { useIncidents } from '@/context/IncidentContext';
import { formattedDate } from '@/lib/utils';
import { X, ClipboardEdit, CheckCircle, AlertCircle, Clock, User, Calendar, Tag } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';

export function IncidentDetail() {
  const { selectedIncident, setSelectedIncidentId } = useIncidents();
  
  if (!selectedIncident) return null;

  const getSeverityInfo = (severity: string) => {
    switch (severity) {
      case 'low':
        return { color: 'text-ai-low', bgColor: 'bg-ai-low/10', icon: CheckCircle };
      case 'medium':
        return { color: 'text-ai-medium', bgColor: 'bg-ai-medium/10', icon: Clock };
      case 'high':
        return { color: 'text-ai-high', bgColor: 'bg-ai-high/10', icon: AlertCircle };
      case 'critical':
        return { color: 'text-ai-critical', bgColor: 'bg-ai-critical/10', icon: AlertCircle };
      default:
        return { color: 'text-muted-foreground', bgColor: 'bg-muted/20', icon: AlertCircle };
    }
  };

  const severityInfo = getSeverityInfo(selectedIncident.severity);
  const SeverityIcon = severityInfo.icon;

  return (
    <div className="h-full flex flex-col border-l border-border/50 animate-fade-in glass-card">
      <div className="p-4 border-b border-border/50 flex items-center justify-between sticky top-0 bg-card/95 backdrop-blur-sm z-10">
        <h2 className="font-semibold text-lg">Incident Details</h2>
        <Button variant="ghost" size="icon" onClick={() => setSelectedIncidentId(null)} className="hover:bg-secondary/50">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-xl font-medium">{selectedIncident.title}</h1>
            <Button variant="outline" size="sm" className="hover:bg-secondary/50">
              <ClipboardEdit className="h-4 w-4 mr-2" /> Edit
            </Button>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Card className={`border-none shadow-none ${severityInfo.bgColor}`}>
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground mb-1">Severity</div>
                <div className={`flex items-center ${severityInfo.color} capitalize font-medium`}>
                  <SeverityIcon className="h-4 w-4 mr-1.5" />
                  {selectedIncident.severity}
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none bg-secondary/20 shadow-none">
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground mb-1">Status</div>
                <div className="capitalize font-medium">{selectedIncident.status}</div>
              </CardContent>
            </Card>
            
            <Card className="border-none bg-secondary/20 shadow-none">
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground mb-1">AI System</div>
                <div className="font-medium">{selectedIncident.aiSystem}</div>
              </CardContent>
            </Card>
            
            <Card className="border-none bg-secondary/20 shadow-none">
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground mb-1">Category</div>
                <div className="font-medium">{selectedIncident.category}</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium text-primary/90 mb-2">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{selectedIncident.description}</p>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium text-primary/90 mb-2">Impact</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{selectedIncident.impact}</p>
          </div>
          
          <Separator className="my-6 bg-border/50" />
          
          <div className="grid grid-cols-2 gap-y-5">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground mb-1">Reported By</div>
                <div className="text-sm font-medium">{selectedIncident.reportedBy}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground mb-1">Time Reported</div>
                <div className="text-sm font-medium">{formattedDate(selectedIncident.timestamp)}</div>
              </div>
            </div>
            
            {selectedIncident.assignedTo && (
              <div className="flex items-center col-span-2">
                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Assigned To</div>
                  <div className="text-sm font-medium">{selectedIncident.assignedTo}</div>
                </div>
              </div>
            )}
          </div>
          
          {selectedIncident.tags && (
            <div className="mt-6">
              <div className="flex items-center mb-3">
                <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                <div className="text-sm font-medium">Tags</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedIncident.tags.map((tag) => (
                  <Badge key={tag} className="bg-accent/50 hover:bg-accent/70 text-xs rounded-md">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {selectedIncident.actions && (
            <div className="mt-6">
              <h3 className="font-medium text-primary/90 mb-2">Actions Taken</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {selectedIncident.actions.map((action, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
