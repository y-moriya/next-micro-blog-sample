import { Provider } from 'next-auth/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Header from '../components/Header'
import '../styles/global.css'

const queryClient = new QueryClient()
const Layout = ({ children }) => (
  <div className="w-full">
    <Header />
    {children}
  </div>
)

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </Layout>
      </Provider>
    </QueryClientProvider>
  )
}
