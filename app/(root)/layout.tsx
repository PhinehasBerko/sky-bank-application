import MobileNav from '@/components/MobileNav'
import SideBar from '@/components/SideBar'
import { getLoggedInUser } from '@/lib/Actions/user.actions'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

const layout = async(
    {children}:Readonly<{children:React.ReactNode}>
) => {
  const loggedIn = await getLoggedInUser()
  if(!loggedIn) redirect("/sign-in")
  return (

    <main className='flex h-screen w-full font-inter'>
        <SideBar  user ={loggedIn}/>
        
        <div className='flex flex-col size-full w-full'>
          <div className='root-layout'>
            {/* mobile view logo */}
            <Image 
            src='/icons/logo.svg' 
            alt='SkyBank Logo' 
            height={34}
            width={34}
            />
            <div>              
              <MobileNav  user ={loggedIn}/>
            </div>

          </div>
        {children}
        </div>
               
    </main>
  )
}

export default layout