import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'

const Header = () => {
  const callbackUrl = process.env.baseUrl + '/'
  const [session, loading] = useSession()
  return (
    <nav className="bg-white shadow-lg">
      <div className="md:flex items-center justify-between py-2 px-8 md:px-12">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800 md:text-3xl">
            <Link href="/">
              <a>Next Micro Blog Sample</a>
            </Link>
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="block text-gray-800 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
            >
              <img
                src="/hamburger.svg"
                alt="Menu"
                className="h-6 w-6 fill-current"
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:block -mx-2">
          <Link href="/">
            <a className="text-gray-800 py-2 px-2 md:mx-2">Home</a>
          </Link>
          <Link href="/">
            <a className="text-gray-800 py-2 px-2 md:mx-2">About</a>
          </Link>
          <Link href="/">
            <a className="text-gray-800 py-2 px-2 md:mx-2">Contact</a>
          </Link>
          {loading ? <>Now loading...</> : null}
          {!session && (
            <button
              onClick={() => signIn('google', { callbackUrl: callbackUrl })}
            >
              Sign in
            </button>
          )}
          {session && (
            <div className="inline py-2 px-2 md:mx-2">
              <div className="group inline-block relative">
                <img
                  src={session.user.image}
                  className="rounded-full w-8 h-8 mr-2"
                />
                <ul className="group-hover:block absolute hidden right-0 whitespace-nowrap py-2 bg-white border rounded shadow-xl">
                  <li>
                    <Link href="/">
                      <a className="dropdown-button">Settings</a>
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-button" onClick={signOut}>
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header
