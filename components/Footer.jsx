import Image from 'next/image'
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
            <Image src={logoImg} alt="Website logo" />
          </div>
          <div className='grid grid-cols-2'>
            <a href="#" className='font-medium'>Discover</a>
            <a href="#" className='font-medium'>Privacy Policy</a>
            <a href="#" className='font-medium'>About</a>
            <a href="#" className='font-medium'>Terms & Conditions</a>
            <a href="#" className='font-medium'>Safety</a>
            <a href="#" className='font-medium'>Training Course</a>
          </div>
        </div>

        <div className='mt-6 flex flex-col-reverse md:flex-row justify-between'>
          <div>
            <p className='text-brand-grey font-normal text-base'>© 2020 Klyk Communications, LTD. All rights reserved.</p>
          </div>
          <div className='flex items-center space-x-4'>
            <div className='mb-4 md:mb-0'>
              <p>Follow and like us:</p>
            </div>
            <div className='flex space-x-4'>
              <a href="#"><FacebookIcon /></a>
              <a href="#"><TwitterIcon /></a>
              <a href="#"><InstagramIcon /></a>
              <a href="#"><LinkedinIcon /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}