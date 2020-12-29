import * as React from 'react'
import { usePostsQuery } from '../hooks/usePostsQuery'

const PostList = () => {
  const { data: posts, isLoading } = usePostsQuery()

  if (isLoading) return <span>Now loading...</span>

  if (posts.length === 0) return <span>no posts</span>

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <span>{post.content}</span>
        </li>
      ))}
    </ul>
  )
}

export default PostList
