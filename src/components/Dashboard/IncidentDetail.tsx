
import { useIncidents } from '@/context/IncidentContext';
import { formattedDate } from '@/lib/utils';
import { X, ClipboardEdit, CheckCircle, AlertCircle, Clock, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

export function IncidentDetail() {
  const { selectedIncident, setSelectedIncidentId } = useIncidents();
  
  if (!selectedIncident) return null;

  const getSeverityInfo = (severity: string) => {
    switch (severity) {
      case 'low':
        return { color: 'text-ai-low', bgColor: 'bg-ai-low/20', icon: CheckCircle };
      case 'medium':
        return { color: 'text-ai-medium', bgColor: 'bg-ai-medium/20', icon: Clock };
      case 'high':
        return { color: 'text-ai-high', bgColor: 'bg-ai-high/20', icon: AlertCircle };
      case 'critical':
        return { color: 'text-ai-critical', bgColor: 'bg-ai-critical/20', icon: AlertCircle };
      default:
        return { color: 'text-muted-foreground', bgColor: 'bg-muted/20', icon: AlertCircle };
    }
  };

  const severityInfo = getSeverityInfo(selectedIncident.severity);
  const SeverityIcon = severityInfo.icon;

  return (
    <div className="h-full flex flex-col border-l border-border animate-fade-in">
      <div className="p-4 border-b border-border flex items-center justify-between sticky top-0 bg-background z-10">
        <h2 className="font-semibold">Incident Details</h2>
        <Button variant="ghost" size="icon" onClick={() => setSelectedIncidentId(null)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-6 overflow-y-auto">
        <div className="flex justify-between items-start">
          <h1 className="text-xl font-medium">{selectedIncident.title}</h1>
          <Button variant="outline" size="sm">
            <ClipboardEdit className="h-4 w-4 mr-2" /> Edit
          </Button>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className={`p-3 rounded-lg ${severityInfo.bgColor}`}>
            <div className="text-xs text-muted-foreground mb-1">Severity</div>
            <div className={`flex items-center ${severityInfo.color} capitalize`}>
              <SeverityIcon className="h-4 w-4 mr-1.5" />
              {selectedIncident.severity}
            </div>
          </div>
          
          <div className="p-3 rounded-lg bg-secondary/20">
            <div className="text-xs text-muted-foreground mb-1">Status</div>
            <div className="capitalize">{selectedIncident.status}</div>
          </div>
          
          <div className="p-3 rounded-lg bg-secondary/20">
            <div className="text-xs text-muted-foreground mb-1">AI System</div>
            <div>{selectedIncident.aiSystem}</div>
          </div>
          
          <div className="p-3 rounded-lg bg-secondary/20">
            <div className="text-xs text-muted-foreground mb-1">Category</div>
            <div>{selectedIncident.category}</div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium mb-2">Description</h3>
          <p className="text-sm text-muted-foreground">{selectedIncident.description}</p>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium mb-2">Impact</h3>
          <p className="text-sm text-muted-foreground">{selectedIncident.impact}</p>
        </div>
        
        <Separator className="my-6" />
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Reported By</div>
            <div className="text-sm">{selectedIncident.reportedBy}</div>
          </div>
          
          <div>
            <div className="text-xs text-muted-foreground mb-1">Time Reported</div>
            <div className="text-sm">{formattedDate(selectedIncident.timestamp)}</div>
          </div>
          
          {selectedIncident.assignedTo && (
            <div>
              <div className="text-xs text-muted-foreground mb-1">Assigned To</div>
              <div className="flex items-center text-sm">
                <User className="h-3 w-3 mr-1 text-muted-foreground" />
                {selectedIncident.assignedTo}
              </div>
            </div>
          )}
        </div>
        
        {selectedIncident.tags && (
          <div className="mt-6">
            <div className="text-xs text-muted-foreground mb-2">Tags</div>
            <div className="flex flex-wrap gap-2">
              {selectedIncident.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-accent/50 text-xs rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {selectedIncident.actions && (
          <div className="mt-6">
            <h3 className="font-medium mb-2">Actions Taken</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              {selectedIncident.actions.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
