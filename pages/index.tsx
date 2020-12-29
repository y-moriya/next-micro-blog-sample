import { signIn, signOut, useSession } from 'next-auth/client'
import PostList from '../components/PostList'
import NewPostForm from '../components/NewPostForm'

export const Home = (): JSX.Element => {
  const [session, loading] = useSession()
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
          <NewPostForm />
          <PostList />
        </>
      )}
    </>
  )
}

export default Home
