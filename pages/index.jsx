import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { connect, User } from "../models";

export async function getServerSideProps(context) {
  await connect();
  const data = await User.findOne();

  if (!data) return { notFound: true }

  return {
    props: { user_id: data.user_id },
  }
}

export default function Home({ user_id }) {
  return (
    <>
      <Head>
        <title>Your points</title>
      </Head>

      {/* navbar */}
      <Navbar />
      {/* hero */}

      <div className="min-h-[70vh] flex items-center justify-center">
        <ul className="flex space-x-3">
          <li>
            <Link href={"/invite/" + user_id}>
              <a className="p-2 px-4 bg-brand-purple bg-opacity-10 text-brand-purple rounded-full font-semibold text-md">Invite</a>
            </Link>
          </li>
          <li>
            <Link href={"/spin"}>
              <a className="p-2 px-4 bg-brand-purple bg-opacity-10 text-brand-purple rounded-full font-semibold text-md">Spin</a>
            </Link>
          </li>
        </ul>
      </div>

      {/* footer */}
      <Footer />
    </>
  )
}
