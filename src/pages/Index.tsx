
import { IncidentProvider } from '@/context/IncidentContext';
import { Sidebar } from '@/components/Dashboard/Sidebar';
import { Header } from '@/components/Dashboard/Header';
import { IncidentList } from '@/components/Dashboard/IncidentList';
import { IncidentDetail } from '@/components/Dashboard/IncidentDetail';
import { useIncidents } from '@/context/IncidentContext';

function DashboardContent() {
  const { selectedIncident } = useIncidents();
  
  return (
    <div className="flex flex-1 overflow-hidden p-3 gap-3">
      <div className={`${selectedIncident ? 'w-5/12' : 'w-full'} transition-all duration-300 ease-in-out`}>
        <IncidentList />
      </div>
      
      {selectedIncident && (
        <div className="w-7/12 animate-fade-in">
          <IncidentDetail />
        </div>
      )}
    </div>
  );
}

const Index = () => {
  return (
    <IncidentProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <DashboardContent />
        </div>
      </div>
    </IncidentProvider>
  );
};

export default Index;
