import { signIn, signOut, useSession } from "next-auth/client";
export const Home = (): JSX.Element => {
  const [session, loading] = useSession();
  return (
    <>
      {loading ? <>Now loading...</> : null}
      {!session && (
        <>
          サインインしてください。 <br />
          <button onClick={() => signIn('google')}>Sign in</button>
        </>
      )}
      {session && (
        <>
          サインイン完了。 email: {session.user.email} <br />
          <button onClick={signOut}>Sign out</button>
        </>
      )}
    </>
  )
}

export default Home