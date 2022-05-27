import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { connect, User } from "../models";

export async function getServerSideProps(context) {
  await connect();
  const data = await User.findOne({}, null, {
    sort: {
      createdAt: -1,
    }
  });

  if (!data) return { notFound: true }

  return {
    props: {
      user_name: data.name,
      user_id: data.user_id,
    },
  }
}

export default function Home({ user_name, user_id }) {
  return (
    <>
      <Head>
        <title>Hello</title>
      </Head>

      {/* navbar */}
      <Navbar />
      {/* hero */}

      <div className="min-h-[70vh] flex items-center justify-center">
        <ul className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-3 items-center">
          <li>
            <Link href={"/invite/" + user_id}>
              <a className="p-2 px-4 bg-brand-purple bg-opacity-10 text-brand-purple rounded-full font-semibold text-md">Invite from {user_name} account</a>
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
