import React from 'react'
import { usePostsQuery } from '../../hooks/usePostsQuery'
import PostList from '../../components/PostList'
import { render } from '@testing-library/react'
import { Post } from '@prisma/client'

jest.mock('../../hooks/usePostsQuery')

describe('PostList', () => {
  it('should return loading when is loading', async () => {
    const value = { data: [], isLoading: true }
    ;(usePostsQuery as jest.Mock).mockReturnValueOnce(value)

    const result = render(<PostList />)

    expect(result.container.textContent).toEqual('Now loading...')
  })

  it('should return empty when no posts exist', async () => {
    const value = { data: [], isLoading: false }
    ;(usePostsQuery as jest.Mock).mockReturnValueOnce(value)

    const result = render(<PostList />)

    expect(result.container.textContent).toEqual('no posts')
  })

  it('should return posts', async () => {
    const posts: Post[] = [
      {
        id: 1,
        content: 'mocked content',
        createdAt: new Date(),
        userId: 1,
      },
    ]
    const value = { data: posts, isLoading: false }
    ;(usePostsQuery as jest.Mock).mockReturnValueOnce(value)

    const result = render(<PostList />)

    expect(result.container.textContent).toEqual('mocked content')
  })
})
