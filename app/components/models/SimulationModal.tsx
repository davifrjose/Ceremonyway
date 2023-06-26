'use client'

import useSimulateModal from "@/app/hooks/useSimulateModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../input/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useSimulationListingsModal from "@/app/hooks/useSimulationListings";

enum STEPS {
  DESCRIPTION = 0,
}

  const SimulationModal = () => {
    const router = useRouter();
    const simulateModal = useSimulateModal();

    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.DESCRIPTION);
    const simulationListing = useSimulationListingsModal();

    const {
      register,
      handleSubmit,
      formState: {
        errors,
      },
      reset,
    } = useForm<FieldValues>({
      defaultValues: {
        title: '',
        description: '',
      }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      console.log("ItemSelecionadoz",{...data,  items : simulationListing.items});
      setIsLoading(true);
      
      axios.post('/api/simulations', {...data, items : simulationListing.items })
    .then(() => {
      toast.success('Simulação criada com sucesso!');
      router.refresh();
      reset();
      simulateModal.onClose();
      router.push('/simulations');
    })
    .catch(() => {
      toast.error('Algo deu errado.');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }
  const actionLabel = useMemo(() => {
    if (step === STEPS.DESCRIPTION) {
      return 'Criar simulação'
    }
    return 'Próximo'
  }, [step]);

  
    const bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Como você descreveria sua simulação?"
          subtitle="Seja curto e objetivo!"
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
  

  return (
    <Modal
      isOpen={simulateModal.isOpen}
      onClose={simulateModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      title="Ceremonyway o seu evento"
      body={bodyContent}
    />
  );      
    }

  export default SimulationModal;