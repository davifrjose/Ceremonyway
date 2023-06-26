'use client'
import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../input/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CitySelect, { CitySelectValue } from "../input/CitySelect";
import Map from "../Map";
import dynamic from "next/dynamic";
import Counter from "../input/Counter";
import ImageUpload from "../input/ImageUpload";
import Input from "../input/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal()

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    }
  });

  const location = watch('location');
  const category = watch('category');
  const guestCount = watch('guestCount');
  const imageSrc = watch('imageSrc');
  

  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false
  }), [location]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onBack = () => {
    setStep((value) => value - 1)
  }

  const onNext = () => {
    setStep((value) => value + 1)
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    setIsLoading(true);
    axios.post('/api/listings', data)
    .then(() => {
      toast.success('Lista criada com sucesso!');
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY)
      rentModal.onClose();
    })
    .catch(() => {
      toast.error('Algo deu errado.');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Criar evento'
    }
    return 'Próximo'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Voltar'
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Qual destas opções melhor descreve o seu evento?"
        subtitle="Escolha uma categoria"
      />
      <div
        className="
        grid 
        grid-cols-1 
        md:grid-cols-2 
        gap-3
        max-h-[50vh]
        overflow-y-auto
      "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) =>
                setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Onde está localizado o seu espaço?"
          subtitle="Ajude os hóspedes a encontrar você!"
        />
        <CitySelect
          onChange={(value) => setValue('location', value)}
        />
        <Map
          center={location ? [location?.latitude, location?.longitude] : [41.1621, -8.6220]}
        />
      </div>
    );
  }

  if(step === STEPS.INFO) {
    bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
          title="Compartilhe algumas noções básicas sobre seu lugar"
          subtitle="Que amenite você tem?"
        />
        <Counter
        value={guestCount}
        title="Convidados"
        subtitle="Quantos convidados estarão presentes?"
        onChange={(value) => setCustomValue('guestCount', value)}
        />
        
    </div>
    )
  }
  if(step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Adicione uma foto do seu lugar"
          subtitle="Mostre aos convidados como é o seu lugar!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue('imageSrc', value)}
          value={imageSrc}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Como você descreveria seu lugar?"
          subtitle="Seja curto e objectivo!"
        />
        <Input
          id="title"
          label="Título"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Descrição"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Agora, defina seu preço"
          subtitle="Quanto você cobra?"
        />
        <Input
          id="price"
          label="Preço"
          formatPrice 
          type="number" 
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }
      
  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Ceremonyway o seu evento"
      body={bodyContent}
    />
  );
}

export default RentModal