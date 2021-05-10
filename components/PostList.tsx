import { Post } from '@prisma/client'
import * as React from 'react'
import { ReactElement } from 'react'
import { usePostsQuery } from '../hooks/usePostsQuery'
import PostCmp from './PostCmp'

const PostList = (): ReactElement => {
  const [page, setPage] = React.useState(0)
  const { data, isLoading, isFetching, isPreviousData } = usePostsQuery(page)
  const loadingObj = (
    <div className="bg-white max-w-lg mx-auto my-1">
      <div className="flex pt-4 px-4 justify-center">
        <div className="inline-block md:mx-2">
          <img
            src="/loading.svg"
            alt="Loading..."
            className="animate-spin h-12 w-12 text-gray-800"
          />
        </div>
      </div>
    </div>
  )

  if (isLoading) return loadingObj

  if (data.posts.length === 0) return <span>no posts</span>

  const paginationObj = (
    <div className="flex mx-auto items-center justify-center mt-8 mb-4 max-w-lg">
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
        className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
      >
        ＜
      </button>
      {[...Array(data?.pageNumbers)].map((_, i) => (
        <button
          key={i}
          onClick={() => {
            setPage(i)
          }}
          disabled={page === i}
          className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => {
          setPage((old) => (data?.hasMore ? old + 1 : old))
        }}
        disabled={isPreviousData || !data?.hasMore}
        className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
      >
        ＞
      </button>
    </div>
  )

  return (
    <>
      {paginationObj}
      {isFetching && isPreviousData
        ? loadingObj
        : data.posts.map((post: any) => (
            <PostCmp key={post.id} post={post as Post} user={post.User} />
          ))}
      {paginationObj}
    </>
  )
}

export default PostList
