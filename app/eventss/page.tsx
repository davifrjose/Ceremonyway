import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
//import getReservations from "@/app/actions/getReservations";

import EventsClient from "./EventsClient";
import useSimulationListingsModal from "../hooks/useSimulationListings";

const EventsPage = async () => {
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
   // const reservations = await getReservations({ userId: currentUser.id });
  

  // if (reservations.length === 0) {
  //   return (
  //     <ClientOnly>
  //       <EmptyState
  //         title="Nenhuma evento encontrado"
  //         subtitle="Parece que você não selecionou nenhuma opção."
  //       />
  //     </ClientOnly>
  //   );
  // }

  return (
    <ClientOnly>
      <EventsClient
    
        reservations={[]}
        currentUser={currentUser}
      />
    </ClientOnly>
  );


}

export default EventsPage