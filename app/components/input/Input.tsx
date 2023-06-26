'use client'

import { useState } from "react";
import { Field, FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiEuro } from "react-icons/bi";
import { HiEye, HiEyeOff } from "react-icons/hi"

interface InputProps{
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  password?:boolean;
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}
const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text' || 'password',
  disabled,
  formatPrice,
  required,
  password,
  register,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

 const getInputType = () => {
    if (password) {
      return showPassword ? "text": "password"
    }
    


    return type;
  };


  return(
    <div className="w-full relative">
      {formatPrice && (
        <BiEuro 
          size={24}
          className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
        />
      )}
      <input 
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        typeof={getInputType()}
        className={
          `
            peer
            w-full
            p-4
            pt-6
            font-light
            bg-white
            border-2
            rounded-md
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            ${formatPrice ? 'pl-9': 'pl-4'}
            ${errors[id] ? 'border-purple-600': 'border-neutral-300'}
            ${errors[id]? 'focus:border-purple-600': 'focus:border-black'}
          `} 
          type={getInputType()}
      />
      { password && (
        <button
          type="button"
          onClick={handleTogglePassword}
          className={`
            absolute
            top-5
            right-4
            flex
            items-center
            justify-center
            h-8
            w-8
            rounded-md
            transition
            focus:outline-none
            ${showPassword ? 'text-blue-500' : 'text-neutral-500'}
          `}
        >
          {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
        </button>
      )}
      <label
        
        className={`
          absolute
          text-md
          duration-150
          transform
          -translate-y-3
          top-5
          z-10
          origin-[0]
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-show:scale-100
          peer-placeholder-show:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-purple-600' : 'text-zinc-400'}
          `}
        
      >{label}</label>
    </div>
  )
}

export default Input