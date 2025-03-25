"use client"
import React from 'react'

import Link from 'next/link'
import Image from 'next/image'

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const MobileNav = ({user}:SiderbarProps) => {
  const pathname = usePathname()
  return (
    <section className='w-full'>
      <Sheet>
        <SheetTrigger>
          <Image 
          src="/icons/hamburger.svg"
          width={30}
          height={30}
          className='cursor-pointer '
          alt='Menu'/>
        </SheetTrigger>
        <SheetContent side='left' className='border-none bg-white'>
          
            <Link href="/" className='flex cursor-pointer items-center gap-1 px-12'>

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
          
        </SheetContent>

      </Sheet>
    </section>
  )
}

export default MobileNav