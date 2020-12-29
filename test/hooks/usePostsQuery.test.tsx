import { renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { usePostsQuery } from '../../hooks/usePostsQuery'
import fetchMock from 'fetch-mock'
import { Post } from '@prisma/client'

describe('usePostsQuery', () => {
  it('should return data', async () => {
    const date = new Date('2020-12-31')
    fetchMock.mock('/api/posts', [
      {
        id: 1,
        content: 'mocked content',
        createdAt: date,
        userId: 1,
      },
    ])

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {},
        mutations: {},
      },
    })

    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    const { result, waitForNextUpdate } = renderHook(() => usePostsQuery(), {
      wrapper,
    })

    expect(result.current.isLoading).toBe(true)

    await waitForNextUpdate()

    const posts: Post[] = [
      {
        id: 1,
        content: 'mocked content',
        createdAt: date,
        userId: 1,
      },
    ]
    expect(JSON.stringify(result.current.data)).toEqual(JSON.stringify(posts))
    expect(result.current.isLoading).toBe(false)
  })
})
