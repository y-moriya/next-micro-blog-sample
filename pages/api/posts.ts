import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/client'

const prisma = new PrismaClient()

type Data = {
  content: string
}

export default async function handlePosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) return res.status(401).end('Please log in to view')

  const userId = session.user.id

  if (req.method === 'GET') {
    const posts = await prisma.post.findMany({
      include: {
        User: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return res.status(200).json(posts)
  }

  if (req.method === 'POST') {
    const { content } = JSON.parse(req.body) as Data

    const createdPost = await prisma.post.create({
      data: {
        content,
        User: {
          connect: {
            id: userId,
          },
        },
      },
    })

    res.status(201).json(createdPost)
  }
}
