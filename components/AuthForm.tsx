'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {useRouter} from "next/navigation"
import { z } from "zod"
import CustomInput from './CustomInput'
import { Button } from './ui/button'
import { Form } from './ui/form'
import { Loader2 } from 'lucide-react'
import { authFormSchema } from '@/lib/utils'
import { signIn, signUp } from '@/lib/Actions/user.actions'

const AuthForm = ({type}:{type:string}) => {
    const [user, setUser] = useState("")
    const [isLoading,setIsLoading] = useState(false)

    const formSchema = authFormSchema(type);
    const router = useRouter()

    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email:"",
      password:""
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async(data: z.infer<typeof formSchema>) => {
    try {
      // Sign Up with Appwrite && create plaid token
      setIsLoading(true)
      if(type === "sign-up"){
        const newUser = await signUp(data);

        console.log("dummy",data)
        setUser(newUser);
        console.log("Sign Up",newUser)  
        console.log("Plaid Token",newUser.plaidToken)
      }

      if(type === "sign-in"){
        const response = await signIn({
          email: data.email,
          password: data.password
        });

        if(response) router.push("/")
      console.log("Sign In",data)
      }
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  
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
                        {type ==="sign-up" &&(
                          <>
                            <div className='flex gap-4'>
                              <CustomInput 
                              name ="firstName"
                              control={form.control}
                              label='First Name'
                              placeholder='Enter your first name'
                
                />
                              <CustomInput 
                              name ="lastName"
                              control={form.control}
                              label='Last Name'
                              placeholder='Enter your last name'
                              />
                            </div>

                            <CustomInput 
                            name ="address1"
                            control={form.control}
                            label='Address'
                            placeholder='Enter your address'
                            />
                            <CustomInput 
                            name ="city"
                            control={form.control}
                            label='City'
                            placeholder='Ex: Ghana'
                            />

                             
                            <div className='flex gap-4'>
                              <CustomInput 
                              name ="state"
                              control={form.control}
                              label='State'
                              placeholder='Ex: GH'
                              />
                              <CustomInput 
                              name ="postCode"
                              control={form.control}
                              label='Post code'
                              placeholder='Ex: 1200'
                              />

                            </div>

                            <div className='flex gap-4'>
                              <CustomInput 
                              name ="dob"
                              control={form.control}
                              label='Date of Birth'
                              placeholder='yyyy-mm-dd'
                              />
                              <CustomInput 
                              name ="ssn"
                              control={form.control}
                              label='SSN'
                              placeholder='Ex:3241'
                              
                              />
                            </div>
                          </>
                        )}
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

                        <div className='flex flex-col gap-4'>
                        <Button 
                          type="submit" 
                          disabled ={isLoading}
                          className="form-btn">
                            { isLoading 
                              ? <>
                                  <Loader2 
                                    size={30}
                                  className='animate-spin'
                                  />
                                  Loading ...
                                </> 
                              :type ==="sign-in"
                              ?"Sign In"
                              :"Sign Up"
                            }
                        </Button>
                        </div>
                    </form>

                  </Form>
                  <footer className='flex justify-center gap-1'>
                    <p className='text-14 font-normal text-gray-500'>
                      {
                        type ==="sign-in"
                          ?"Don't have an account?"
                          :"Already have an account?"
                      }
                    </p>
                    <Link
                      href={type ==="sign-up"?"/sign-in":"/sign-up"}
                      className='form-link'>
                      {
                        type ==="sign-in"? "Sign Up":"Sign In"
                      }   
                    </Link>
                  </footer>
               </> 
            )
        }
    </section>
  )
}

export default AuthForm