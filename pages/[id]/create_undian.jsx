import Head from "next/head";
import Image from "next/image";
import { models } from "mongoose";
import { useState } from 'react'
import Footer from "../../components/Footer";
import AlertModal from "../../components/modals/AlertModal";
import Navbar from "../../components/Navbar";
import heroImage from "../../public/hero-image.jpg"
import { connect, User } from "../../models";
import { $fetch } from "ohmyfetch";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Link from "next/link";

export async function getServerSideProps(context) {
  await connect();
  const { id: user_id } = context.params;
  const data = await User.findOne({
    user_id,
  });

  if (!data) return { notFound: true }

  const data_events = await models.Event.find({
    userId: data._id,
  });

  const participant_count = [];

  for (const index in data_events) {
    const participant = await models.Participant
      .find({
        eventId: data_events[index]._id,
      })
      .count();

    participant_count.push(participant);
  }

  return {
    props: {
      events: JSON.stringify(data_events),
      user_id,
      participant_count,
    },
  }
}

export default function Home({ events, user_id, participant_count }) {
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

    $fetch(`/api/${user_id}/event`, {
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
          return () => {
            setIsOpen(false);
            router.push(`/${user_id}/create_undian`);
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
        <title>Create Event</title>
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

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-7/12">
          <Image src={heroImage} alt="Hero image" />
        </div>
        <div className="w-full md:w-5/12 p-3 md:p-6 flex flex-col justify-center">
          <div>
            <h1 className="font-semibold text-3xl text-brand-black">Create Event</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-3">
              <label htmlFor="name" className="font-normal text-md text-brand-black">Event name</label>
              <input
                className="w-full rounded border-brand-grey focus:ring-brand-purple focus-visible:ring-brand-purple disabled:bg-gray-100"
                type="text"
                id="name"
                name="name"
                placeholder="Event name"
                disabled={isLoading}
              />
            </div>

            <div className="mt-3 grid md:grid-cols-2 md:space-x-3 space-y-3 md:space-y-0">
              <div>
                <label htmlFor="start_date" className="font-normal text-md text-brand-black">Start Date</label>
                <input
                  className="w-full rounded border-brand-grey focus:ring-brand-purple focus-visible:ring-brand-purple disabled:bg-gray-100"
                  type="date"
                  id="start_date"
                  name="start_date"
                  placeholder="Event name"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="end_date" className="font-normal text-md text-brand-black">End Date</label>
                <input
                  className="w-full rounded border-brand-grey focus:ring-brand-purple focus-visible:ring-brand-purple disabled:bg-gray-100"
                  type="date"
                  id="end_date"
                  name="end_date"
                  placeholder="Event name"
                  disabled={isLoading}
                />
              </div>
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

          <div className="mt-5">
            <h1 className="font-semibold text-3xl text-brand-black">Your Event</h1>

            <div className="mt-5">
              {JSON.parse(events).map((el, index) => (
                <div className="mb-3" key={index}>
                  <Link href={`/form/${el.event_id}`}>
                    <div className="p-3 border w-full">
                      <h1 className="text-xl font-semibold flex flex-col md:flex-row justify-between">
                        <span>
                          {el.event_name}
                        </span>
                        <span className="text-brand-purple">{participant_count[index]} Participants</span>
                      </h1>

                      <div className="mt-3 flex flex-col-reverse md:flex-row justify-between">
                        <div className="flex space-x-3">
                          <Link href={`/form/${el.event_id}`}>
                            <a className="p-2 px-4 bg-brand-purple bg-opacity-10 text-brand-purple rounded-full font-semibold text-md">
                              Form
                            </a>
                          </Link>

                          <Link href={`/event/${el.event_id}/spin`}>
                            <a className="p-2 px-4 bg-brand-purple bg-opacity-10 text-brand-purple rounded-full font-semibold text-md">
                              Spin
                            </a>
                          </Link>
                        </div>

                        <p className="mt-0 md:mt-3 mb-3 text-sm font-medium">
                          {dayjs(el.start_date).format("YYYY/MM/DD")} sampai {dayjs(el.end_date).format("YYYY/MM/DD")}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div >

      {/* footer */}
      < Footer />
    </>
  )
}
