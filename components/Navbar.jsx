import { useState } from 'react'
import Image from 'next/image'
import logoImg from '../public/logo.png'
import profileImg from '../public/profile.png'
import CaretDown from './icons/CaretDown'
import MenuIcon from './icons/MenuIcon'
import CrossIcon from './icons/CrossIcon'
import clsx from 'clsx'

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const navigationClass = clsx({
    'md:flex flex-col md:flex-row items-center md:space-x-6': true,
    'hidden': !showNavbar,
    'flex': showNavbar,
  })

  return (
    <div className="bg-white border border-b border-brand-dark">
      <div className="mx-auto p-3 max-w-screen-xl block md:flex items-center justify-between">
        {/* logo */}
        <div className='flex items-center justify-between'>
          <div>
            <Image src={logoImg} alt="Website logo" />
          </div>
          <div className='block md:hidden'>
            <button onClick={() => setShowNavbar(!showNavbar)}>
              {showNavbar ? <CrossIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* navigation links */}
        <div className={navigationClass}>
          <a href="#" className='font-semibold text-md'>Discover</a>
          <a href="#" className='font-semibold text-md'>About</a>
          <a href="#" className='font-semibold text-md'>Safety</a>

          {/* -- divider -- */}

          {/* user nav */}
          {/* <div className='mt-3 md:mt-0 flex flex-col md:flex-row items-center md:space-x-4'>
            <div className='flex items-center'>
              <a href="#" className='flex items-center'>
                <Image src={profileImg} alt="Profile image" w="40px" h="40px" />
                <CaretDown />
              </a>
            </div>
            <div className='flex flex-col md:flex-row md:space-x-3 items-center justify-center'>
              <a href="#" className='mt-3 md:mt-0 p-2 px-4 border border-2 border-brand-purple border-opacity-30 text-brand-purple rounded-full font-semibold text-md'>My events</a>
              <a className='mt-3 md:mt-0 p-2 px-4 bg-brand-purple text-white rounded-full font-semibold text-md' href="#">Create event</a>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}