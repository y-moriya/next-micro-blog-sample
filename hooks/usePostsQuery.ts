import { Post } from '@prisma/client'
import { useQuery } from 'react-query'

export const usePostsQuery = () => {
  const { data: posts, isLoading } = useQuery<Post[]>('posts', async () => {
    const res = await fetch('/api/posts')

    return res.json()
  })

  return { data: posts, isLoading }
}
