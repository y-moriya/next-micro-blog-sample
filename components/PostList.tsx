import { Post } from '@prisma/client'
import * as React from 'react'
import { usePostsQuery } from '../hooks/usePostsQuery'
import PostCmp from './PostCmp'

const PostList = () => {
  const [page, setPage] = React.useState(0)
  const { data, isLoading, isPreviousData } = usePostsQuery(page)

  if (isLoading) return <span>Now loading...</span>

  if (data.posts.length === 0) return <span>no posts</span>

  return (
    <>
      <span>Current Page: {page + 1}</span>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>{' '}
      <button
        onClick={() => {
          setPage((old) => (data?.hasMore ? old + 1 : old))
        }}
        disabled={isPreviousData || !data?.hasMore}
      >
        Next Page
      </button>
      {data.posts.map((post: any) => (
        <PostCmp key={post.id} post={post as Post} user={post.User} />
      ))}
    </>
  )
}

export default PostList
