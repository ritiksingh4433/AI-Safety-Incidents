
export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

export type IncidentStatus = 'open' | 'investigating' | 'resolved' | 'closed';

export interface Incident {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  severity: SeverityLevel;
  status: IncidentStatus;
  aiSystem: string;
  category: string;
  impact: string;
  reportedBy: string;
  assignedTo?: string;
  actions?: string[];
  tags?: string[];
}
