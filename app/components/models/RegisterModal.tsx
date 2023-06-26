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

import useRegisterModalStore from '@/app/hooks/useRegisterModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../input/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import { signIn } from 'next-auth/react'
import useLoginModal from '@/app/hooks/useLoginModal'

const RegisterModal = () => {
  const registerModal = useRegisterModalStore()
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false)

  const { 
    register, 
    handleSubmit, 
    formState:{
      errors,
    }
     } = useForm<FieldValues>({
      defaultValues :{
        nome : '',
        email : '',
        password : '',
      }
     })

     const onSubmit : SubmitHandler<FieldValues> = (data) => {
      setIsLoading(true)

      axios.post('/api/register', data)
      .then(() => {
        toast.success("Registrado com sucesso")
        registerModal.onClose();
        loginModal.onOpen()
      })
      .catch((error) => {
        toast.error('Algo deu errado')
      })
      .finally(() => {
       setIsLoading(false) 
      })

     }

     const onToggle = useCallback(() => {
      registerModal.onClose();
      loginModal.onOpen();
    }, [registerModal, loginModal])
     const bodyContent = ( 
      <div className='flex flex-col gap-4'>
        <Heading
          title='Bem-vindo ao Ceremonyway'
          subtitle='Crie uma conta!'
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
          id="name"
          label='Nome'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="password"
          label='Password'
          type="password"
          password
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
          onClick={() => signIn('google')}
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
              Já tem uma conta ?
            </div>
            <div
              onClick={onToggle}
              className='
                text-neutral-800
                cursor-pointer
                hover:underline
              '
            >
              Log in
            </div>
          
          </div>
        

        </div>
      </div>
     )
  return(
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Registre-se"
      actionLabel="Continuar"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal
