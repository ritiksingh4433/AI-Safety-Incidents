
import { Incident } from '@/types/incident';
import { formattedDate } from '@/lib/utils';
import { useIncidents } from '@/context/IncidentContext';
import { Badge } from '@/components/ui/badge';

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
        return <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">Open</Badge>;
      case 'investigating':
        return <Badge variant="outline" className="bg-ai-medium/10 text-ai-medium border-ai-medium/30">Investigating</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-ai-low/10 text-ai-low border-ai-low/30">Resolved</Badge>;
      case 'closed':
        return <Badge variant="outline" className="bg-muted/20 text-muted-foreground border-muted/30">Closed</Badge>;
      default:
        return null;
    }
  };
  
  const handleClick = () => {
    setSelectedIncidentId(isSelected ? null : incident.id);
  };

  return (
    <div 
      className={`p-4 rounded-lg transition-all cursor-pointer hover-scale card-glow smooth-transition ${
        isSelected 
          ? 'glass-card border-primary/50 shadow-md shadow-primary/10' 
          : 'bg-card/70 border border-border/30 hover:border-border/60'
      }`}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-medium text-sm line-clamp-1">{incident.title}</h3>
        <div className={`pulse-dot ${getSeverityColor(incident.severity)}`}></div>
      </div>
      
      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{incident.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground/80">{formattedDate(incident.timestamp)}</div>
        <div>{getStatusBadge(incident.status)}</div>
      </div>
      
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="bg-secondary/30 hover:bg-secondary/40">{incident.aiSystem}</Badge>
        <Badge variant="secondary" className="bg-secondary/30 hover:bg-secondary/40">{incident.category}</Badge>
      </div>
    </div>
  );
}
