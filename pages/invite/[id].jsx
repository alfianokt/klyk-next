import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from 'react'
import Footer from "../../components/Footer";
import AlertModal from "../../components/modals/AlertModal";
import Navbar from "../../components/Navbar";
import heroImage from "../../public/hero-image.jpg"
import { connect, User } from "../../models";
import { $fetch } from "ohmyfetch";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  await connect();
  const data = await User.findOne({
    user_id: context.params.id,
  });

  if (!data) return { notFound: true }

  return {
    props: {
      balance: data.total_point,
      user_id: data.user_id,
    },
  }
}

export default function Home({ balance, user_id }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonAccent, setButtonAccent] = useState("primary");
  const [onButtonClick, setOnButtonClick] = useState(() => { });

  /**
   *
   * @param {Event} event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setIsOpen(true);
    setTitle("Please wait...");
    setButtonText("Loading");
    setButtonAccent("outline");
    setOnButtonClick(() => { });

    const form = new FormData(event.target);

    $fetch(`/api/${user_id}/invite`, {
      method: 'POST',
      parseResponse: JSON.parse,
      body: { email: form.get('email') }
    })
      .then((data) => {
        setIsOpen(true);
        setTitle(data.msg);
        setButtonText("Okay");
        setButtonAccent("primary");
        setOnButtonClick(() => {
          return () => {
            // router.push(data.data.referal_link);
            setIsOpen(false);
          }
        });
      })
      .catch((e) => {
        if (e.response.status != 422) throw e;

        // catch error
        setIsOpen(true);
        setTitle(e.response._data.msg);
        setButtonText("Okay");
        setButtonAccent("outline");
        setOnButtonClick(() => {
          return () => { setIsOpen(false) }
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <Head>
        <title>Your points</title>
      </Head>

      {/* navbar */}
      <Navbar />
      {/* hero */}

      <AlertModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        title={title}
        buttonText={buttonText}
        buttonAccent={buttonAccent}
        onButtonClick={onButtonClick}
      />

      <div className="flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-7/12 transform scale-105">
          <Image src={heroImage} alt="Hero image" />
        </div>
        <div className="w-full md:w-5/12 p-3 md:p-6 flex flex-col justify-center space-y-8 md:space-y-12">
          <div>
            <h1 className="font-semibold text-xl text-brand-black">Your coins</h1>
            <div className="flex justify-between">
              <h2 className="font-bold text-brand-purple text-3xl md:text-5xl">{balance} coins</h2>

              {/* <button className="p-2 px-4 bg-brand-purple bg-opacity-10 text-brand-purple rounded-full font-semibold text-md">Use coins</button> */}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="font-normal text-md text-brand-black">Invite friends and get 10 free coins!</label>
            <div className="mt-3 flex justify-between space-x-6">
              <input
                className="w-full rounded border-brand-grey focus:ring-brand-purple focus-visible:ring-brand-purple disabled:bg-gray-100"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                disabled={isLoading}
              />
              <button
                className="p-2 px-4 bg-brand-purple text-white rounded-full font-semibold text-md disabled:bg-opacity-75"
                type="submit"
                disabled={isLoading}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* footer */}
      <Footer />
    </>
  )
}
