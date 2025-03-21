import SideBar from '@/components/SideBar'
import React from 'react'

const layout = (
    {children}:Readonly<{children:React.ReactNode}>
) => {
  const loggedIn ={firstName:"Phiny",lastName:"Quadwo"}
  return (

    <main className='flex h-screen w-full font-inter'>
        <SideBar  user ={loggedIn}/>
        
            {children}
        
        
    </main>
  )
}

export default layout