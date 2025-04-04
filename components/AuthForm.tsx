'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { z } from "zod"
import CustomInput from './CustomInput'
import { Button } from './ui/button'
import { authFormSchema } from '@/lib/utils'
import { Form } from './ui/form'

const AuthForm = ({type}:{type:string}) => {
    const [user, setUser] = useState(null)

    // 1. Define your form.
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      username: "",
      email:"",
      password:""
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof authFormSchema>) {

    alert(values.email)
    alert(values.password)
    alert(values.username)
    console.log(values)
  }
  return (
    <section className='auth-form'>
        <header className="flex flex-col gap-5 md:gap-8">
            <Link href='/' className='cursor-pointer flex gap-1 items-center'>
                <Image
                    src='/icons/logo.svg'
                    height={34}
                    width={34}
                    alt='logo' />
                    <p className="text-26 text-black-1 font-bold font-imb-plex-serif">&nbsp;SkyBank</p>
            </Link>
            <div className="flex flex-col gap-1 md:gap-3">
                    <h1> 
                        {user 
                            ?"Link Account"
                            : type ==="sign-in"
                            ?"SignIn"
                            :"SignUp"
                        }
                        <p className="text-16 font-normal text-gray-600">
                            {
                                user 
                                ?"Link your Account to get started"
                                :"Please Add your details"
                            }
                        </p>
                    </h1>
            </div>
        </header>
        {
            user ? (
                <div className="flex flex-col gap-4">
                    {/* PlainLink    */}
                </div>
            ):(
               <>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                      className='space-y-8'>
                        <CustomInput 
                          name ="username"
                          control={form.control}
                          label='Username'
                          placeholder='Enter your username'
                          />
                        <CustomInput 
                          name ="email"
                          control={form.control}
                          label='Email'
                          placeholder='abc@gmail.com'
                          />
                        <CustomInput 
                          name ="password"
                          control={form.control}
                          label='Password'
                          placeholder='password123'
                          />
                        <Button 
                          type="submit" 
                          className="p-2 border-1 bg-black/50 text-white hover:bg-gray-500/25 rounded-lg">
                            Submit
                        </Button>
                    </form>

                  </Form>
               </> 
            )
        }
    </section>
  )
}

export default AuthForm