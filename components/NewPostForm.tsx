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
    <form
      onSubmit={savePost}
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <label
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        内容
        <input
          style={{
            width: '500px',
          }}
          type="text"
          id="content"
          value={form.content}
          onChange={(e) => update({ ...form, content: e.target.value })}
        />
      </label>
      <button
        style={{
          width: '100px',
          marginTop: '16px',
        }}
      >
        Post
      </button>
    </form>
  )
}

export default NewPostForm
