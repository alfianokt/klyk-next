import Head from "next/head";
import Image from "next/image";
import { models } from "mongoose";
import { useEffect, useState } from 'react'
import Footer from "../../components/Footer";
import AlertModal from "../../components/modals/AlertModal";
import Navbar from "../../components/Navbar";
import heroImage from "../../public/hero-image.jpg"
import { connect } from "../../models";
import { $fetch } from "ohmyfetch";
import { useRouter } from "next/router";
import dayjs from "dayjs";

export async function getServerSideProps(context) {
  await connect();
  const { event_id } = context.params;
  const data = await models.Event.findOne({
    event_id: event_id,
  });

  if (!data) return { notFound: true }

  return {
    props: {
      event_name: data.event_name,
      end_date: dayjs(data.end_date).format("YYYY-MM-DD"),
      event_id,
      isFormOpen: dayjs().unix() > dayjs(data.end_date, "DD/MM/YYYY").unix()
    },
  }
}

export default function Event({ event_name, event_id, end_date, isFormOpen }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(isFormOpen);
  const [isOpen, setIsOpen] = useState(isFormOpen);
  const [title, setTitle] = useState(isFormOpen ? "The event has ended" : "");
  const [buttonText, setButtonText] = useState(isFormOpen ? "Okay" : "");
  const [buttonAccent, setButtonAccent] = useState(isFormOpen ? "outline" : "primary");
  const [onButtonClick, setOnButtonClick] = useState(isFormOpen ? (
    () => {
      return () => {
        router.push('/');
      }
    }
  ) : (() => { }));

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

    $fetch(`/api/event/${event_id}/participant`, {
      method: 'POST',
      parseResponse: JSON.parse,
      body: Object.fromEntries(form),
    })
      .then((data) => {
        setIsOpen(true);
        setTitle(data.msg);
        setButtonText("Okay");
        setButtonAccent("primary");
        setOnButtonClick(() => {
          return () => { setIsOpen(false) }
        });

        event.target.reset();
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

  useEffect(() => {
    // if (dayjs().unix() > dayjs(end_date, "DD/MM/YYYY").unix()) {
    //   if (!isOpen) {
    //     setIsLoading(true);
    //     setIsOpen(true);
    //     setTitle("The event has ended");
    //     setButtonText("Okay");
    //     setButtonAccent("outline");
    //     setOnButtonClick(() => {
    //       return () => {
    //         router.push('/');
    //       }
    //     });
    //   }
    // }
  });

  return (
    <>
      <Head>
        <title>Join Event - {event_name}</title>
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
        <div className="w-full md:w-5/12 p-3 md:p-6 flex flex-col justify-center">
          <div>
            <h1 className="font-semibold text-3xl text-brand-black">Join Event - {event_name}</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-3">
              <label htmlFor="name" className="font-normal text-md text-brand-black">Your name</label>
              <input
                className="w-full rounded border-brand-grey focus:ring-brand-purple focus-visible:ring-brand-purple disabled:bg-gray-100"
                type="text"
                id="name"
                name="name"
                placeholder="Event name"
                disabled={isLoading}
              />
            </div>

            <div className="mt-3">
              <label htmlFor="address" className="font-normal text-md text-brand-black">Your address</label>
              <input
                className="w-full rounded border-brand-grey focus:ring-brand-purple focus-visible:ring-brand-purple disabled:bg-gray-100"
                type="text"
                id="address"
                name="address"
                placeholder="Event name"
                disabled={isLoading}
              />
            </div>

            <div className="mt-3">
              <label htmlFor="email" className="font-normal text-md text-brand-black">Your email address</label>
              <input
                className="w-full rounded border-brand-grey focus:ring-brand-purple focus-visible:ring-brand-purple disabled:bg-gray-100"
                type="email"
                id="email"
                name="email"
                placeholder="Event name"
                disabled={isLoading}
              />
            </div>

            <div className="mt-3">
              <label htmlFor="phone" className="font-normal text-md text-brand-black">Your phone number</label>
              <input
                className="w-full rounded border-brand-grey focus:ring-brand-purple focus-visible:ring-brand-purple disabled:bg-gray-100"
                type="text"
                id="phone"
                name="phone"
                placeholder="Event name"
                disabled={isLoading}
              />
            </div>

            <div className="mt-3 flex justify-end">
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