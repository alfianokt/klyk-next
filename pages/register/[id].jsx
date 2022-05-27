import { useRouter } from "next/router"

export default function Index() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <h1>Register page : {id}</h1>
    </>
  )
}