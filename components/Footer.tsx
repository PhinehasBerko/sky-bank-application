import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { logoutAccount } from '@/lib/Actions/user.actions'
const Footer = ({user,type ="desktop"}:FooterProps) => {
    const router = useRouter()
    const handleLogOut = async() =>{
        const logOut = await logoutAccount();
        
        if(logOut) router.push("/sign-in")
    }
  return (
    <footer className='footer'>
        <div className={type === "mobile"?"footer_name-mobile":"footer_name"}>
        <p className='text-xl font-bold text-gray-700'>{user?.firstName[0]}</p>
        </div>
        <div className={type === "mobile"?"footer_email-mobile":"footer_email"}>
            <h1 className='text-14 truncate font-semibold text-gray-600'>{user?.firstName}</h1>
            <p className='text-14 truncate font-normal text-gray-400'>{user.email}</p>
        </div>
        <div className='footer_image' onClick={handleLogOut}>
            <Image 
                src="icons/logout.svg" 
                fill
                alt='logout logo'
            />
        </div>
    </footer>
  )
}

export default Footer