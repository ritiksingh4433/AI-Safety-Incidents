
import { createContext, useState, useContext, ReactNode } from 'react';
import { Incident, SeverityLevel, IncidentStatus } from '../types/incident';
import { mockIncidents } from '../data/mockIncidents';
import { toast } from '@/components/ui/use-toast';

interface IncidentContextProps {
  incidents: Incident[];
  selectedIncidentId: string | null;
  setSelectedIncidentId: (id: string | null) => void;
  selectedIncident: Incident | null;
  filterText: string;
  setFilterText: (text: string) => void;
  filterSeverity: SeverityLevel | 'all';
  setFilterSeverity: (severity: SeverityLevel | 'all') => void;
  filterStatus: IncidentStatus | 'all';
  setFilterStatus: (status: IncidentStatus | 'all') => void;
  filteredIncidents: Incident[];
  addIncident: (incident: Omit<Incident, 'id'>) => void;
  updateIncident: (incident: Incident) => void;
}

const IncidentContext = createContext<IncidentContextProps | undefined>(undefined);

export function IncidentProvider({ children }: { children: ReactNode }) {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const [filterText, setFilterText] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<SeverityLevel | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<IncidentStatus | 'all'>('all');

  const selectedIncident = selectedIncidentId
    ? incidents.find((i) => i.id === selectedIncidentId) || null
    : null;

  const filteredIncidents = incidents.filter((incident) => {
    // Text filter
    const matchesText =
      filterText === '' ||
      incident.title.toLowerCase().includes(filterText.toLowerCase()) ||
      incident.description.toLowerCase().includes(filterText.toLowerCase()) ||
      incident.aiSystem.toLowerCase().includes(filterText.toLowerCase()) ||
      incident.category.toLowerCase().includes(filterText.toLowerCase());

    // Severity filter
    const matchesSeverity = filterSeverity === 'all' || incident.severity === filterSeverity;

    // Status filter
    const matchesStatus = filterStatus === 'all' || incident.status === filterStatus;

    return matchesText && matchesSeverity && matchesStatus;
  });

  const addIncident = (incidentData: Omit<Incident, 'id'>) => {
    const newId = (incidents.length + 1).toString();
    const newIncident: Incident = { ...incidentData, id: newId };
    
    setIncidents([newIncident, ...incidents]);
    toast({
      title: "Incident Added",
      description: `${newIncident.title} has been added to the system.`
    });
  };

  const updateIncident = (updatedIncident: Incident) => {
    setIncidents(incidents.map(incident => 
      incident.id === updatedIncident.id ? updatedIncident : incident
    ));
    toast({
      title: "Incident Updated",
      description: `${updatedIncident.title} has been updated.`
    });
  };

  return (
    <IncidentContext.Provider
      value={{
        incidents,
        selectedIncidentId,
        setSelectedIncidentId,
        selectedIncident,
        filterText,
        setFilterText,
        filterSeverity,
        setFilterSeverity,
        filterStatus,
        setFilterStatus,
        filteredIncidents,
        addIncident,
        updateIncident
      }}
    >
      {children}
    </IncidentContext.Provider>
  );
}

export const useIncidents = () => {
  const context = useContext(IncidentContext);
  if (context === undefined) {
    throw new Error('useIncidents must be used within an IncidentProvider');
  }
  return context;
};
