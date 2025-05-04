
import { IncidentProvider } from '@/context/IncidentContext';
import { Sidebar } from '@/components/Dashboard/Sidebar';
import { Header } from '@/components/Dashboard/Header';
import { IncidentList } from '@/components/Dashboard/IncidentList';
import { IncidentDetail } from '@/components/Dashboard/IncidentDetail';
import { useIncidents } from '@/context/IncidentContext';

function DashboardContent() {
  const { selectedIncident } = useIncidents();
  
  return (
    <div className="flex flex-1 overflow-hidden">
      <div className={`${selectedIncident ? 'w-1/2 md:w-2/5' : 'w-full'} transition-all duration-300`}>
        <IncidentList />
      </div>
      
      {selectedIncident && (
        <div className="w-1/2 md:w-3/5">
          <IncidentDetail />
        </div>
      )}
    </div>
  );
}

const Index = () => {
  return (
    <IncidentProvider>
      <div className="flex h-screen overflow-hidden">
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
