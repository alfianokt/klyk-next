import Head from "next/head";
import { useRouter } from "next/router"

export default function CreateUndian() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Create Undian {id}</title>
      </Head>

      <h1>Register page : {id}</h1>
    </>
  )
}