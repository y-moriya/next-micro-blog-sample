import { useQuery } from 'react-query'

export const usePostsQuery = (page: number) => {
  const fetchPosts = (page = 0) => fetch('/api/posts?page=' + page)
  const { data, isLoading, isFetching, isPreviousData } = useQuery(
    ['posts', page],
    async () => {
      const res = await fetchPosts(page)

      return res.json()
    },
    { refetchInterval: 1000, keepPreviousData: true }
  )

  return { data, isLoading, isFetching, isPreviousData }
}
