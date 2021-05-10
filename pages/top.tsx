import { useSession } from 'next-auth/client'
import LoopInfoList from '../components/LoopInfoList'

export const Top = (): JSX.Element => {
  const [session] = useSession()
  return (
    <>
      {!session && <>Please sign in.</>}
      {session && (
        <>
          <div className="my-10">
            <LoopInfoList />
          </div>
        </>
      )}
    </>
  )
}

export default Top
