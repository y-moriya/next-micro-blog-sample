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
          <div className="group md:hidden">
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
            <ul className="group-hover:block absolute hidden right-0 whitespace-nowrap py-2 bg-white border rounded shadow-xl">
              <li>
                <Link href="/">
                  <a className="dropdown-button">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a className="dropdown-button">About</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a className="dropdown-button">Contact</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a className="dropdown-button">Settings</a>
                </Link>
              </li>
              {!loading && !session && (
                <li>
                  <button
                    className="dropdown-button"
                    onClick={() => signIn({ callbackUrl: callbackUrl })}
                  >
                    Sign in
                  </button>
                </li>
              )}
              {!loading && session && (
                <li>
                  <button className="dropdown-button" onClick={signOut}>
                    Sign out
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="flex-col md:flex-row hidden md:block -mx-2">
          <Link href="/">
            <a className="text-gray-800 py-2 px-2 md:mx-2">Home</a>
          </Link>
          <Link href="/">
            <a className="text-gray-800 py-2 px-2 md:mx-2">About</a>
          </Link>
          <Link href="/">
            <a className="text-gray-800 py-2 px-2 md:mx-2">Contact</a>
          </Link>
          {loading ? (
            <div className="inline-block md:mx-2">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : null}
          {!loading && !session && (
            <button onClick={() => signIn({ callbackUrl: callbackUrl })}>
              Sign in
            </button>
          )}
          {!loading && session && (
            <div className="inline md:mx-2">
              <div className="group inline-block relative">
                <img
                  src={session.user.image}
                  className="rounded-full w-5 h-5 mr-2"
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
