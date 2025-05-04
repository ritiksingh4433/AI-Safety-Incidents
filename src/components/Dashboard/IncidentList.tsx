
import { useIncidents } from '@/context/IncidentContext';
import { IncidentCard } from './IncidentCard';
import { ChevronDown } from 'lucide-react';

export function IncidentList() {
  const { filteredIncidents } = useIncidents();

  return (
    <div className="h-full overflow-hidden flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold">AI Safety Incidents</h2>
        <div className="flex items-center text-muted-foreground text-sm">
          <span>Latest</span>
          <ChevronDown className="ml-1 h-4 w-4" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {filteredIncidents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No incidents match your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {filteredIncidents.map(incident => (
              <IncidentCard key={incident.id} incident={incident} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
