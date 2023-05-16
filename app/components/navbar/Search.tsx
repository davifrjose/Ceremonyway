'use client';
import useCities from '@/app/hooks/useCities';
import useSearchModal from '@/app/hooks/useSearchModal';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import  { BiSearch } from 'react-icons/bi' 
import { differenceInDays } from 'date-fns';
const Search = ()=> {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCities();

  const  locationValue = params?.get('locationValue'); 
  const  startDate = params?.get('startDate');
  const  endDate = params?.get('endDate');
  const  guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return 'Em qualquer lugar';
  }, [locationValue, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Dias`;
    }

    return 'Qualquer semana'
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Convidados`;
    }

    return 'Adicionar convidados';
  }, [guestCount]);

  return(
   <div
    onClick={searchModal.onOpen}
    className="
      border-[1px]
      w-full
      md:w-auto
      py-2
      rounded-full
      shadow-sm
      hover:shadow-md
      transition
      cursor-pointer
    "
   >
    <div
    className="
      flex
      flex-row
      items-center
      justify-between

    "
    >
      <div
      className="
        text-sm
        font-semibold
        px-6
      
      "
      
      >
        {locationLabel}

      </div>
      <div
        className="
          hidden
          text-sm
          font-semibold
          px-6
          sm:block
          border-x-[1px]
          flex-1
          text-center
      
      "
      >
        {durationLabel}

      </div>
      <div
        className="
           text-sm
           pl-6
           pr-2
           text-gray-600
           flex
           flex-row
           items-center
           gap-3
        "
      >
        <div className="hidden sm:block">{guestLabel}</div>
        <div className="
              p-2
              bg-purple-600
              rounded-full
              text-white
        
        ">
          <BiSearch size={18} />
        </div>

      </div>

    </div>

   </div>
  );
}

export default Search;