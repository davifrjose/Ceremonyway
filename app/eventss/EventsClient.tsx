'use client';
import { useRouter } from "next/navigation"
import Container from "../components/Conatiner"
import Heading from "../components/Heading"
import ListingCard from "../components/listings/ListingCard"
import { SafeReservation, SafeUser, SafeListing } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../components/Button";
import { TbReportMoney } from "react-icons/tb";
import Modal from "../components/models/Modal";
import { format } from "date-fns";
import Image from "next/image";
import useRegisterModalStore from "../hooks/useRegisterModal";
import useLoginModalStore from "../hooks/useLoginModal";
import useRentModal from "../hooks/useRentModal";
import useSimulationModal from "../hooks/useSimulateModal";
import useSimulationListingsModal from "../hooks/useSimulationListings";


interface EventsClientProps {

  reservations: SafeReservation[];
  currentUser?: SafeUser | null;

}

const EventsClient: React.FC<EventsClientProps> = ({
  reservations,
  currentUser,

}) => {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState('');
  const registerModal = useRegisterModalStore();
  const loginModal = useLoginModalStore();
  const rentModal = useRentModal();
  const simulationModal = useSimulationModal();
  const [isOpen, setIsOpen] = useState(false);
  const [showModalCheckout, setShowModalCheckout] = useState(false)
  const simulationListing = useSimulationListingsModal();
  console.log(simulationListing.items, "dfdf")



  // open dialog box to save simulation information

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const onSimulate = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    simulationModal.onOpen();
  }, [currentUser, loginModal, simulationModal]);


  let listing: any[] = []
  reservations.forEach((reservation: any) =>

    listing.push(reservation.listing)
  )
  console.log(reservations)
  console.log(listing)


  const totalCheckout = () => {
    let total = 0;

    simulationListing.items.forEach((el) => {
      total += el.totalPrice;
    });
    return total
  }

  const getListingIds = () => {

    const listingIds: string[] = [];

    reservations.forEach((el) => {
      const listeningId: string = addListingIds(el.listingId);
      listingIds.push(listeningId)
    });
    return listingIds;
  }

  const addListingIds = (id: string) => {

    const listeningId: string = id;
    return listeningId;

  }
  console.log(getListingIds())

  const onCancel = useCallback((id: string) => {
    console.log(id, "78tuyghbhijmnokl,pç");
    simulationListing.remove(id);
    toast.success('Removido com sucesso');
    // router.refresh();
    
  }, [router]);

  const onCreate = () => {
    
    setShowModalCheckout(false);
    simulationModal.onOpen();
    simulationModal.addListeningId(getListingIds());
    
    
  }

  const reservationDate = (startDate: any, endDate: any) => {
    if (!startDate || !endDate) {
      return null;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }



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
  const bodyContent = (
    <div className="flex flex-col content-around gap-4">
      <div>
        {simulationListing.items.map((reservation, index) =>
          lisReservation(
            reservationDate(reservation.startDate, reservation.endDate),
            reservation.totalPrice,
            reservation.listing.title
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

  return (
    <Container>
      <Heading
        title="Eventos"
        subtitle="Onde você esteve e para onde está indo"
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
        {simulationListing.items.map((reservation) => (
          <ListingCard
            key={reservation.listing.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.listing.id}
            onAction={() =>onCancel(reservation.listing.id)}
            disabled={deletingId === reservation.listing.id}
            actionLabel="Remover"
            currentUser={currentUser}
          />
        ))}
      </div>
      <div
        className="
        fixed
        z-90 
        bottom-10 
        right-8
        
        hover:animate-bounce 
        duration-300
        drop-shadow-lg 
        flex 
        justify-center 
        items-center
      "
      >
        <Button label="Custo total" onClick={() => setShowModalCheckout(true)} />
      </div>
      <Modal
        actionLabel="Salvar simulação"
        isOpen={showModalCheckout}
        onClose={() => setShowModalCheckout(false)}
        title="Total"
        body={bodyContent}
        onSubmit={onCreate}
      />


    </Container>
  );

}

export default EventsClient