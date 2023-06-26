import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getSimulations from "../actions/getSimulations";

import SimulationsClient from "./SimulationsClient";
import getAllSimulationListings from "../actions/getSimulationListings";

const SimulationsPage = async () =>{
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    return (
      <ClientOnly> 
        <EmptyState
          title="Não autorizado"
          subtitle="Por favor faça login"
        />
      </ClientOnly>
    )
  }
  const simulations = await getSimulations({ authorId: currentUser.id });
  const simulationListing = await getAllSimulationListings();
  
  
  if (simulations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="Nenhuma simulação encontrada"
          subtitle="Parece que você não tem nehuma simulação feita."
        />
      </ClientOnly>
    );
  }

  return (
    
    <ClientOnly>
      <SimulationsClient 
      simulations={simulations}
      currentUser={currentUser}
      simulationListing={simulationListing}
      
      />
    </ClientOnly>
  );




}

export default SimulationsPage;