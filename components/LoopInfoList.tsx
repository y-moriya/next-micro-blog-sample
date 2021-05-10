import { Loop } from '@prisma/client'
import { ReactElement } from 'react'
import { useLoopsQuery } from '../hooks/useLoopsQuery'
import LoopInfo from './LoopInfo'

const LoopInfoList = (): ReactElement => {
  const { data, isLoading, isFetching, isPreviousData } = useLoopsQuery()
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

  if (data.loops.length === 0) return <span>no loops</span>

  return (
    <>
      <div className="mx-10 pt-15">
        <div className="grid gap-6 mb-8 md:grid-cols-2">
          {isFetching && isPreviousData
            ? loadingObj
            : data.loops.map((loop: Loop) => (
                <LoopInfo key={loop.id} loop={loop} />
              ))}
        </div>
      </div>
    </>
  )
}

export default LoopInfoList
