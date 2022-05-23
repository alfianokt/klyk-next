import Head from "next/head";
import Image from "next/image";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import heroImage from '../public/hero-image.jpg'

export default function Home() {
  return (
    <>
      <Head>
        <title>Your points</title>
      </Head>

      {/* navbar */}
      <Navbar />
      {/* hero */}

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-7/12">
          <Image src={heroImage} alt="Hero image" />
        </div>
        <div className="w-full md:w-5/12 p-3 md:p-6 flex flex-col justify-center space-y-8 md:space-y-12">
          <div>
            <h1 className="font-semibold text-xl text-brand-black">Your coins</h1>
            <div className="flex justify-between">
              <h2 className="font-bold text-brand-purple text-3xl md:text-5xl">4500 coins</h2>

              {/* <button className="p-2 px-4 bg-brand-purple bg-opacity-10 text-brand-purple rounded-full font-semibold text-md">Use coins</button> */}
            </div>
          </div>

          <div>
            <p className="font-normal text-md text-brand-black">Invite friends and get 10 free coins!</p>
            <div className="mt-3 flex justify-between space-x-6 ">
              <input className="w-full rounded border-brand-grey" type="text" placeholder="Email" />
              <button className="p-2 px-4 bg-brand-purple text-white rounded-full font-semibold text-md">Submit</button>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <Footer />
    </>
  )
}
