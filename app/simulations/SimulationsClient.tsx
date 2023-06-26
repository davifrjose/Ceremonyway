'use client';
import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeSimulation, SafeSimulationListing, SafeUser } from "@/app/types"
  ;
import Heading from "@/app/components/Heading";

import ListingCard from "@/app/components/listings/ListingCard";
import Container from "../components/Conatiner";
import SimulationCard from "../components/SimulationCard";
import Modal from "../components/models/Modal";
import useSimulationListingsModal from "../hooks/useSimulationListings";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Listing } from "@prisma/client";



interface ReservationsClientProps {
  simulations: SafeSimulation[],
  currentUser?: SafeUser | null,
  simulationListing?: SafeSimulationListing[]
}

const SimulationsClient: React.FC<ReservationsClientProps> = ({
  simulations,
  currentUser,
  simulationListing
}) => {
  const router = useRouter();

  const [selectedSimulation, setSelectedSimulation] = useState(null);

  const [showModalTotal, setShowTotal] = useState(false)

  const [deletingId, setDeletingId] = useState('');




  /*const totalListeingQty = (id: string) => {
    const simulationId = getSimulationListingById(id); 
    simulationId.reduce(
      (accumulator: any, listing: { listeingQty: any; })=> accumulator + listing.listeingQty,
      0
    )
  }*/



  const onCancel = useCallback((id: string) => {
    console.log("Im deleting this id", id);
    setDeletingId(id);

    axios.delete(`/api/simulations/${id}`)
      .then(() => {
        toast.success('Simulação eliminada');
        router.refresh();
      })
      .catch((e) => {
        toast.error('Algo deu errado.')
        console.log(e)
      })
      .finally(() => {
        setDeletingId('');
      })
  }, [router]);


  const lisReservation = (data: any, price: any, title: any) => (
    <div className="flex row justify-between">
      <div>
        <p>{title}</p>
        <p>{data}</p>
      </div>
      <div>
        <p>{price} euros</p>
      </div>
    </div>
  );
  

  const reservationDate = (startDate: any, endDate: any) => {
    if (!startDate || !endDate) {
      return null;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }

  const totalCheckout = () => {
    let total = 0;

    simulationListing?.filter((simulation) =>
      (simulation as any).simulationId === (selectedSimulation as any)?.id

    ).forEach((el) => {
      total += el.listeingQty;
    });
    return total;
  }

  const bodyContent = (

    <div className="flex flex-col content-around gap-4">
      <div>

        {

          simulationListing
            ?.filter((simulation) =>
              (simulation as any).simulationId === (selectedSimulation as any)?.id)
            .map((simulation, index) =>
              lisReservation(
                reservationDate(simulation.startDate, simulation.endDate),
                simulation.listeingQty,
                simulation.listing.title,
              )
            )}
      </div>
      <div className="flex row justify-between">
        <div>
          <h1>Total</h1>
        </div>
        <div>
          <p>{totalCheckout()} euros</p>
        </div>
      </div>
    </div>
  );

  const handdleOpenModal = useCallback((simulation: any) => {
    setShowTotal(true);
    console.log("Clicking here", simulation);
    setSelectedSimulation(simulation);
    console.log("Selected simultation", selectedSimulation);
  }, []);

  const handdleCloseModal = () => {
    setShowTotal(false);
    setSelectedSimulation(null);
  }
  const getTotalListeingQty = (simulationId: string): number => {
    const simulationListings = simulationListing?.filter(
      (listing) => listing.simulationId === simulationId
    );

    let totalQty = 0;
    simulationListings?.forEach((listing) => {
      totalQty += listing.listeingQty;
    });

    return totalQty;
  };


  return (
    <Container>
      <Heading
        title="Simulações"
        subtitle="As suas simulações"
      />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {simulations.map((simulation) => (
          <SimulationCard
            currentuser={currentUser}
            key={simulation.id}
            onClick={() => handdleOpenModal(simulation)}
            data={simulation}
            simulation={simulation}
            actionId={simulation.id}
            onAction={onCancel}
            disabled={deletingId === simulation.id}
            total={getTotalListeingQty(simulation.id)}
            actionLabel="Eliminar simulação"
          />
        ))}
      </div>

      <Modal
        actionLabel="Voltar"
        isOpen={showModalTotal}
        onClose={() => handdleCloseModal()}
        title="Total"
        body={bodyContent}
        onSubmit={() => handdleCloseModal()}

      />
    </Container>
  );
}

export default SimulationsClient;