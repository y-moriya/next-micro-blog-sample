import { Loop } from '.prisma/client'
import Link from 'next/link'
import { ReactElement } from 'react'

const LoopInfo = (props: { loop: Loop }): ReactElement => {
  return (
    <Link href={`/loop/${props.loop.id}`}>
      <div className="cursor-pointer min-w-0 p-1 bg-blue-300 rounded-lg shadow-xs">
        <div className="text-black">
          <h4 className="mb-2 font-semibold">Loop {props.loop.id}</h4>
        </div>
        <div className="bg-blue-100">
          <p>状態: {props.loop.status}</p>
          <p>参加人数: 14人</p>
          <p>更新: {props.loop.nextUpdateAt}</p>
          <p>編成:</p>
        </div>
      </div>
    </Link>
  )
}

export default LoopInfo
