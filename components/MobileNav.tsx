"use client"
import React from 'react'

import Link from 'next/link'
import Image from 'next/image'

import {
  Sheet,
  SheetClose,
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
          
            <Link href="/" className='flex cursor-pointer items-center gap-1 px-4'>

                <Image 
                src='./icons/logo.svg' 
                height={34}
                width={34}
                alt='SkyBank logo'
                className='size-[24px] max-xl:size-12'  />
                <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'> &nbsp;SkyBank</h1>
            </Link>
            <div className='mobilenav-sheet'>
              <SheetClose asChild>
                <nav className='flex h-full flex-col gap-6 pt-16 text-white'>
                  {sidebarLinks.map((linc)=>{ 
                const isActive  = pathname === linc.route || pathname.startsWith(`${linc.route}/`)

                return(
                  <SheetClose asChild key={linc.route}>

                    <Link 
                    key={linc.label} 
                    href={linc.route} 
                    className={cn("mobilenav-sheet_close",{
                        'bg-bankGradient': isActive
                    })}>
                        
                            <Image 
                                src={linc.imgURL} 
                                alt={linc.label}
                                width={20} 
                                height={20}  
                                className={cn({"brightness-[3] invert-0":isActive})} 
                            />
                        
                        <p className={cn('text-16 text-black-2 font-bold',{"!text-white":isActive})}>{linc.label}</p>
                    </Link>
                  </SheetClose>
            )})}
                </nav>
              </SheetClose>
            </div>
            
          
        </SheetContent>

      </Sheet>
    </section>
  )
}

export default MobileNav