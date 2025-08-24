'use client'
import Link from 'next/link'
import React from 'react'
import Image from "next/image";
import phoneLogo from '../../Images/7879976.jpg'

export default function WebLogoPage() {
  return (
    <div className='flex items-center gap-3'>
      <div>
        <Link href='/'><Image className='size-14 rounded-2xl' src={phoneLogo} alt="Phone Logo" /></Link>
      </div>
      <Link href='/'><div className='text-2xl hidden lg:block text-primary font-extrabold'>MyPhoneStore</div></Link>
    </div>
  )
}
