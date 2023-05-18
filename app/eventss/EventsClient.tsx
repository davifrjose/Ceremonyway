'use client';
import { useRouter } from "next/navigation"
import Container from "../components/Conatiner"
import Heading from "../components/Heading"
import ListingCard from "../components/listings/ListingCard"
import { SafeReservation, SafeUser } from "../types"
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../components/Button";
import { TbReportMoney } from "react-icons/tb";
import useCheckoutModal from "../hooks/useCheckOut";

interface EventsClientProps {
  reservations: SafeReservation[],
  currentUser?: SafeUser | null,
}

const EventsClient: React.FC<EventsClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');
  const useCheckOutkModal = useCheckoutModal();
console.log(reservations)
  const onRent = useCallback(() => {
    useCheckOutkModal.onOpen()
  },[currentUser, useCheckOutkModal]);
  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
    .then(() => {
      toast.success('Reserva cancelada');
      router.refresh();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error)
    })
    .finally(() => {
      setDeletingId('');
    })
  }, [router]);

  



  return(
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
         {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancelar reserva"
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
      ">
      <Button
        icon={TbReportMoney}
        label="Custo total"
        onClick={onRent}
      /> 
      </div>
    </Container>
    
    
  )
  
}

export default EventsClient