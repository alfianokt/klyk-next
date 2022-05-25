import Image from 'next/image'
import Link from 'next/link'
import logoImg from '../public/logo.png'
import FacebookIcon from './icons/FacebookIcon'
import InstagramIcon from './icons/InstagramIcon'
import LinkedinIcon from './icons/LinkedinIcon'
import TwitterIcon from './icons/TwitterIcon'

export default function Footer() {
  return (
    <div className="bg-brand-light">
      <div className="mx-auto p-3 py-6 max-w-screen-xl">
        <div className='flex flex-col md:flex-row justify-between'>
          <div>
            <Link href="/">
              <a><Image src={logoImg} alt="Website logo" /></a>
            </Link>
          </div>
          <div className='grid grid-cols-2'>
            <a href="#" className='font-medium'>Discover</a>
            <a href="https://ourklyk.com/privacy" className='font-medium'>Privacy Policy</a>
            <a href="https://ourklyk.com/about" className='font-medium'>About</a>
            <a href="https://ourklyk.com/terms" className='font-medium'>Terms & Conditions</a>
            <a href="https://ourklyk.com/safety" className='font-medium'>Safety</a>
            <a href="#" className='font-medium'>Training Course</a>
          </div>
        </div>

        <div className='mt-6 flex flex-col-reverse md:flex-row justify-between'>
          <div className='mt-3 md:mt-0'>
            <p className='text-brand-grey font-normal text-base'>© 2020 Klyk Communications, LTD. All rights reserved.</p>
          </div>
          <div className='flex items-center space-x-4'>
            <div className='flex justify-center'>
              <p>Follow and like us:</p>
            </div>
            <div className='flex space-x-4'>
              <a href="https://www.facebook.com/ourklyk/"><FacebookIcon /></a>
              <a href="https://twitter.com/ourklyk"><TwitterIcon /></a>
              <a href="https://www.instagram.com/ourklyk/"><InstagramIcon /></a>
              <a href="https://www.linkedin.com/company/ourklyk/"><LinkedinIcon /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}