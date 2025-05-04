
import { Incident } from '@/types/incident';
import { formattedDate } from '@/lib/utils';
import { useIncidents } from '@/context/IncidentContext';

interface IncidentCardProps {
  incident: Incident;
}

export function IncidentCard({ incident }: IncidentCardProps) {
  const { selectedIncidentId, setSelectedIncidentId } = useIncidents();
  const isSelected = selectedIncidentId === incident.id;
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-ai-low';
      case 'medium': return 'bg-ai-medium';
      case 'high': return 'bg-ai-high';
      case 'critical': return 'bg-ai-critical';
      default: return 'bg-muted';
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <span className="status-badge bg-primary/20 text-primary">Open</span>;
      case 'investigating':
        return <span className="status-badge bg-ai-medium/20 text-ai-medium">Investigating</span>;
      case 'resolved':
        return <span className="status-badge bg-ai-low/20 text-ai-low">Resolved</span>;
      case 'closed':
        return <span className="status-badge bg-muted/30 text-muted-foreground">Closed</span>;
      default:
        return null;
    }
  };
  
  const handleClick = () => {
    setSelectedIncidentId(isSelected ? null : incident.id);
  };

  return (
    <div 
      className={`p-4 border rounded-lg transition-all cursor-pointer ${
        isSelected 
          ? 'glass-card border-primary/50 shadow-md shadow-primary/5' 
          : 'hover:bg-card/70 border-transparent hover:border-border/50'
      }`}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-sm line-clamp-1">{incident.title}</h3>
        <div className={`pulse-dot ${getSeverityColor(incident.severity)}`}></div>
      </div>
      
      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{incident.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">{formattedDate(incident.timestamp)}</div>
        <div>{getStatusBadge(incident.status)}</div>
      </div>
      
      <div className="mt-3 flex items-center gap-2">
        <div className="text-xs bg-secondary/50 px-2 py-0.5 rounded-md">{incident.aiSystem}</div>
        <div className="text-xs bg-secondary/50 px-2 py-0.5 rounded-md">{incident.category}</div>
      </div>
    </div>
  );
}
