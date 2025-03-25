import MobileNav from '@/components/MobileNav'
import SideBar from '@/components/SideBar'
import Image from 'next/image'
import React from 'react'

const layout = (
    {children}:Readonly<{children:React.ReactNode}>
) => {
  const loggedIn ={firstName:"Phiny",lastName:"Quadwo"}
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