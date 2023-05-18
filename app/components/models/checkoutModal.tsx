'use client';
import Modal from "./Modal";
import useCheckoutModal from "@/app/hooks/useCheckOut";
import { SafeReservation  } from "@/app/types";


interface EventsClientProps {
  reservations: SafeReservation[],

}

const CheckOutModal : React.FC<EventsClientProps> = ({
  reservations,
 
}) => {


  const rentCheOutModal =  useCheckoutModal()
  let total =  0
  reservations.forEach(el => {total += el.totalPrice})

  console.log(reservations)
  const bodyContent = ( 
    <div className='flex flex-col gap-4'>
    <p>{total} euros</p>
    </div>
   )
  return (
    <Modal
      actionLabel="Finalize"
      isOpen={rentCheOutModal.isOpen}
      onClose={rentCheOutModal.onClose}
      title="Total"
      body={bodyContent}
      onSubmit={rentCheOutModal.onClose}
    />
  );
}

export default CheckOutModal