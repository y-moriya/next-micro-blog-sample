import React from 'react'
import { render } from '../testUtils'
import { QueryClient, QueryClientProvider } from 'react-query'
import NewPostForm from '../../components/NewPostForm'

describe('New Post Form', () => {
  it('matches snapshot', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {},
        mutations: {},
      },
    })

    const { asFragment } = render(
      <QueryClientProvider client={queryClient}>
        <NewPostForm />
      </QueryClientProvider>,
      {}
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
