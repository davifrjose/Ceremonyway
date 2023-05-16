'use client'
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "./Modal";
import qs from 'query-string';

import useSearchModal from "@/app/hooks/useSearchModal";
import { useCallback, useMemo, useState } from "react";
import { formatISO } from 'date-fns';

import { Range } from 'react-date-range';
import dynamic from "next/dynamic";
import CitySelect, { CitySelectValue } from "../input/CitySelect";
import Heading from "../Heading";
import Counter from "../input/Counter";
import Calendar from "../input/Calendar";




const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();

  enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
  }
  

  const [step, setStep] = useState(STEPS.LOCATION);
  const [location, setLocation] = useState<CitySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const Map = useMemo(() => dynamic(() => import('../Map'), { 
    ssr: false 
  }), [location]);

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery,
    }, { skipNull: true });

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, 
  [
    step, 
    searchModal, 
    location, 
    router, 
    guestCount, 
    dateRange,
    onNext,
    params
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Procurar'
    }

    return 'Próximo'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }

    return 'Voltar'
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Aonde quer seu evento?"
        subtitle="Encontre o lugar perfeito!"
      />
      <CitySelect 
        value={location} 
        onChange={(value) => 
          setLocation(value as CitySelectValue)} 
      />
      <hr />
      <Map
          center={location ? [Number(location?.latitude), Number(location?.longitude)] : [41.1621, -8.6220]}
        />
    </div>
  )

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Quando você planeja reservar?"
          subtitle="Certifique-se de que todos estão livres!"
        />
        <Calendar
          onChange={(value) => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Mais Informações"
          subtitle="Encontre o seu evento perfeito!"
        />
        <Counter 
          onChange={(value) => setGuestCount(value)}
          value={guestCount}
          title="Convidados" 
          subtitle="Quantos convidados estão vindo?"
        />
       
      </div>
    )
  }


  return(
    <Modal
      isOpen={searchModal.isOpen}
      title="Filtros"
      actionLabel="Procurar"
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={searchModal.onClose}
      body={bodyContent}
       />
  )
}

export default SearchModal