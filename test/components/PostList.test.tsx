import React from 'react'
import { usePostsQuery } from '../../hooks/usePostsQuery'
import PostList from '../../components/PostList'
import { render } from '@testing-library/react'

jest.mock('../../hooks/usePostsQuery')

describe('PostList', () => {
  it('should return loading when isLoading = true', async () => {
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
    const date = new Date('2020-12-31')
    const posts = [
      {
        id: 1,
        content: 'mocked content',
        createdAt: date,
        userId: 1,
        User: {
          id: 1,
          name: "Yu MORIYA",
          email: "euro21st@gmail.com",
          emailVerified: date,
          image: "c",
          createdAt: date,
          updatedAt: date
        }
      },
    ]
    const value = { data: posts, isLoading: false }
    ;(usePostsQuery as jest.Mock).mockReturnValueOnce(value)

    const result = render(<PostList />)

    expect(result.container.textContent).toEqual(`mocked content 2020/12/31 09:00:00 Yu MORIYA`)
  })
})
