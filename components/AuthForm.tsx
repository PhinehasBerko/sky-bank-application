'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import { ProfileForm } from './CustomForm'
const AuthForm = ({type}:{type:string}) => {
    const [user, setUser] = useState(null)
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
                <diV className="flex flex-col gap-4">
                    {/* PlainLink    */}
                </diV>
            ):(
               <>
                    <ProfileForm/>
               </> 
            )
        }
    </section>
  )
}

export default AuthForm