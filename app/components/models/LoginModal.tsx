'use client'

import axios from 'axios'
import { AiFillFacebook } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { useCallback, useState } from 'react'
import {
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form'
import { signIn } from 'next-auth/react';
import useRegisterModalStore from '@/app/hooks/useRegisterModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../input/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";

const LoginModal = () => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModalStore()
  const [isLoading, setIsLoading] = useState(false)

  const { 
    register, 
    handleSubmit, 
    formState:{
      errors,
    }
     } = useForm<FieldValues>({
      defaultValues :{
        email : '',
        password : '',
      }
     })

     const onSubmit : SubmitHandler<FieldValues> = (data) => {
      setIsLoading(true)

      signIn('credentials', { 
        ...data, 
        redirect: false,
      })
      .then((callback) => {
        setIsLoading(false);
  
        if (callback?.ok) {
          toast.success('Logado com sucesso');
          router.refresh();
          loginModal.onClose();
        }
        
        if (callback?.error) {
          toast.error(callback.error);
        }
      });

     }


     const onToggle = useCallback(() => {
      loginModal.onClose();
      registerModal.onOpen();
    }, [loginModal, registerModal])

     const bodyContent = ( 
      <div className='flex flex-col gap-4'>
        <Heading
          title='Bem-vindo de volta'
          subtitle='Faça login na sua conta!'
        />
        <Input
          id="email"
          label='Email'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        
        <Input
          id="password"
          label='Password'
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
     )

     const footerContent = (
      <div className='flex flex-col gap-4 mt-3'>
        <hr />
        <Button
          outline
          label='Continue com Google'
          icon={FcGoogle}
          onClick={() => signIn('google') }
        />
        <Button
          outline
          label='Continue com Facebook'
          icon={AiFillFacebook}
          onClick={() => signIn('facebook')}
        />
        <div
          className="
            text-neutral-500
            text-center
            mt-4
            font-light
          "
        >
          <div className='
          justify-center flex flex-row items-center gap-2'>
            <div>
            Primeira vez a usar o Ceremonyway ?
            </div>
            <div
              onClick={onToggle}
              className='
                text-neutral-800
                cursor-pointer
                hover:underline
              '
            >
              Crie uma conta
            </div>
          
          </div>
        

        </div>
      </div>
     )
  return(
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login "
      actionLabel="Continuar"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal
