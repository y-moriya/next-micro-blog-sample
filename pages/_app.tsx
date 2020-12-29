import { Provider } from 'next-auth/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </Provider>
    </QueryClientProvider>
  )
}
