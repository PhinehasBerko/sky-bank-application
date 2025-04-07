"use client"
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Footer from './Footer'

const SideBar = ({user}:SiderbarProps) => {
    const pathname = usePathname()
    
  return (
    <section className='sidebar'>
        <nav className='flex flex-col h-screen gap-4'>
            <Link href="/" className='flex mb-12 cursor-pointer items-center gap-2'>

                <Image 
                src='./icons/logo.svg' 
                height={34}
                width={34}
                alt='SkyBank logo'
                className='size-[24px] max-xl:size-14'  />
                <h1 className='sidebar-logo'>SkyBank</h1>
            </Link>
            {sidebarLinks.map((linc)=>{ 
                const isActive  = pathname === linc.route || pathname.startsWith(`${linc.route}/`)

                return(
                    <Link 
                    key={linc.label} 
                    href={linc.route} 
                    className={cn("sidebar-link",{
                        'bg-bankGradient': isActive
                    })}>
                        <div className='relative size-6 '>
                            <Image 
                                src={linc.imgURL} 
                                alt={linc.label}
                                fill    
                                className={cn({"brightness-[3] invert-0":isActive})} 
                            />
                        </div>
                        <p className={cn('sidebar-label',{"!text-white":isActive})}>{linc.label}</p>
                    </Link>
            )})}
            USER
        </nav>
        <Footer user ={user}/>
    </section>
  )
}

export default SideBar