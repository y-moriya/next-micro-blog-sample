import { Post } from '@prisma/client'
import * as React from 'react'
import { usePostsQuery } from '../hooks/usePostsQuery'
import PostCmp from './PostCmp'

const PostList = () => {
  const { data: posts, isLoading } = usePostsQuery()

  if (isLoading) return <span>Now loading...</span>

  if (posts.length === 0) return <span>no posts</span>

  return (
    <>
      {posts.map((post: any) => (
        <PostCmp key={post.id} post={post as Post} user={post.User} />
      ))}
    </>
  )
}

export default PostList
