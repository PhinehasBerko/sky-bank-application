"use client"
import React from 'react'
import { 
  FormControl, 
  FormField, 
  FormLabel, 
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import {Control,FieldPath} from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema } from '@/lib/utils'
const formSchema = authFormSchema("sign-up");
interface CustomInputProps {
  control : Control<z.infer<typeof formSchema>>,
  name : FieldPath<z.infer<typeof formSchema>>
  placeholder: string,
  label: string,

}
const CustomInput = ({
  name,
  control,
  placeholder,
  label
}:CustomInputProps) => {
  
  return (
    <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <div className='form-item'>
              <FormLabel className='form-label'>
                {label}
              </FormLabel>
              <div className='flex w-full flex-col'>
                <FormControl>
                <Input 
                  placeholder={placeholder} 
                  {...field}
                  type={name ==="password"?"password":"text"}
                  className='input-class'  />
              </FormControl>
              </div>
              <FormMessage className='text-red-500/90' />
            </div>
            
          )}
        />
  )
}

export default CustomInput