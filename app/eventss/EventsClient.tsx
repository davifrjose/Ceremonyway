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
  const [showModalCheckout, setShowModalCheckout] = useState(false)

  let listing: any[] =  []
  reservations.forEach((reservation: any) =>
 
   listing.push(reservation.listing)
) 
console.log(reservations)
console.log(listing)
  
  const totalCheckout= ()=>{
    let total = 0;
   
    reservations.forEach((el) => {
      total += el.totalPrice;
    });
    return total
  }


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
  
    const reservationDate =(startDate: any, endDate: any) => {
      if (!startDate || !endDate) {
        return null;
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      return `${format(start, "PP")} - ${format(end, "PP")}`;
    }
  

  const lisReservation = (data: any, price: any, title: any ) => (
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
         {reservations.map((reservation: any, index) =>
           lisReservation(
             reservationDate(reservation.startDate, reservation.endDate),
              reservation.totalPrice,
             listing[index].title
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
      "
      >
        <Button  label="Custo total" onClick={()=> setShowModalCheckout(true)} />
      </div>
      <Modal
        actionLabel="Finalize"
        isOpen={showModalCheckout}
        onClose={() => setShowModalCheckout(false)}
        title="Total"
        body={bodyContent}
        onSubmit={() => setShowModalCheckout(false)}
      />
    </Container>
  );
  
}

export default EventsClient