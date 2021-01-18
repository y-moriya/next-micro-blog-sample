import * as React from 'react'
import { useMutation, useQueryClient } from 'react-query'

const NewPostForm = () => {
  const queryClient = useQueryClient()

  const [form, update] = React.useState({
    content: '',
  })

  const { mutate } = useMutation(
    () => {
      return fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(form),
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts')
      },
    }
  )

  const savePost = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    update({ content: '' })

    mutate()
  }

  return (
    <div className="flex mx-auto items-center justify-center shadow-lg mt-8 mb-4 max-w-lg">
      <form
        onSubmit={savePost}
        className="w-full max-w-xl bg-white rounded-lg px-4 pt-2"
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
            Add a new Comment
          </h2>
          <div className="w-full md-w-full px-3 mb-2 mt-2">
            <textarea
              id="content"
              value={form.content}
              onChange={(e) => update({ ...form, content: e.target.value })}
              className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
              name="body"
              placeholder="Type Your Comment"
              required
            ></textarea>
          </div>
          <div className="w-full md-w-full flex items-start md:w-full px-3">
            <div className="mr-auto"></div>
            <div className="-mr-1">
              <button className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100">
                Post
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default NewPostForm
