import * as React from 'react'
import { usePostsQuery } from '../hooks/usePostsQuery'
import FormatDate from './FormatDate'

const PostList = () => {
  const { data: posts, isLoading } = usePostsQuery()

  if (isLoading) return <span>Now loading...</span>

  if (posts.length === 0) return <span>no posts</span>

  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>
          <span>{post.content}</span>
          {' '}
          <FormatDate date={post.createdAt} />
          {' '}
          <span>{post.User.name}</span>
        </li>
      ))}
    </ul>
  )
}

export default PostList
