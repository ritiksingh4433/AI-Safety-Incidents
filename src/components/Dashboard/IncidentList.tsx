
import { useIncidents } from '@/context/IncidentContext';
import { IncidentCard } from './IncidentCard';
import { ChevronDown, Filter, AlertCircle } from 'lucide-react';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';

export function IncidentList() {
  const { filteredIncidents, filterSeverity, filterStatus } = useIncidents();
  
  const getActiveFilters = () => {
    const filters = [];
    if (filterSeverity !== 'all') filters.push(filterSeverity);
    if (filterStatus !== 'all') filters.push(filterStatus);
    return filters;
  };
  
  const activeFilters = getActiveFilters();

  return (
    <div className="h-full overflow-hidden flex flex-col glass-card">
      <div className="p-4 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="font-semibold text-primary/90">AI Safety Incidents</h2>
          {activeFilters.length > 0 && (
            <div className="ml-3 flex items-center">
              <Filter className="h-3.5 w-3.5 text-muted-foreground" />
              <Badge variant="outline" className="ml-2 bg-accent/30 hover:bg-accent/50 text-xs">
                {activeFilters.length} active
              </Badge>
            </div>
          )}
        </div>
        <div className="flex items-center text-muted-foreground text-sm cursor-pointer hover:text-foreground transition-colors duration-200">
          <span>Latest</span>
          <ChevronDown className="ml-1 h-4 w-4" />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          {filteredIncidents.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="bg-secondary/30 p-6 rounded-lg border border-border/40">
                <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground mb-2 opacity-70" />
                <p className="text-muted-foreground">No incidents match your filters</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Try adjusting your search criteria</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredIncidents.map(incident => (
                <IncidentCard key={incident.id} incident={incident} />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
