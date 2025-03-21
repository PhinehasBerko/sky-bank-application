import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SideBar = ({user}:SiderbarProps) => {
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

        </nav>
    </section>
  )
}

export default SideBar