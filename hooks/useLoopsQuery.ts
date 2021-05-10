import { useQuery } from 'react-query'

export const useLoopsQuery = () => {
  const fetchLoops = () => fetch('/api/loops')
  const { data, isLoading, isFetching, isPreviousData } = useQuery(
    ['loops'],
    async () => {
      const res = await fetchLoops()

      return res.json()
    }
  )

  return { data, isLoading, isFetching, isPreviousData }
}
