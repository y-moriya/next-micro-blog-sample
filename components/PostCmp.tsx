import { Post, User } from '@prisma/client'
import { ReactElement } from 'react'
import FormatDate from './FormatDate'

const PostCmp = ({ post, user }: { post: Post; user: User }): ReactElement => {
  return (
    <div className="font-sans">
      <div className="bg-white max-w-lg mx-auto my-1 border border-grey-light">
        <div className="flex pt-4 px-4">
          <div className="w-16 mr-2">
            <img className="p-2 rounded-full" src={user.image} alt="icon" />
          </div>
          <div className="px-2 pt-2 flex-grow">
            <header>
              <span className="font-medium">{user.name}</span>{' '}
              <FormatDate date={post.createdAt} />
            </header>
            <article className="py-4 text-grey-darkest">{post.content}</article>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCmp
