import React from 'react'
import { render } from '../testUtils'
import { Home } from '../../pages/index'
import client from 'next-auth/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Session } from 'node-mocks-http'

jest.mock('next-auth/client')

beforeAll(() => {
  const mockSession: Session = {
    expires: '1',
    user: { email: 'euro21st@gmail.com', name: 'Yu MORIYA', image: 'c' },
  }

  ;(client.useSession as jest.Mock).mockReturnValueOnce([mockSession, false])
})

describe('Home page', () => {
  it('matches snapshot', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {},
        mutations: {},
      },
    })

    const { asFragment } = render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
      {}
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
