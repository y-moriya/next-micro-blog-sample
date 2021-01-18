import PostList from '../components/PostList'
import NewPostForm from '../components/NewPostForm'
import { useSession } from 'next-auth/client'

export const Home = (): JSX.Element => {
  const [session] = useSession()
  return (
    <>
      {!session && <>Please sign in.</>}
      {session && (
        <>
          <NewPostForm />
          <PostList />
        </>
      )}
    </>
  )
}

export default Home
