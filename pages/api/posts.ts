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
    const page = parseInt(req.query.page as string) || 0
    const pageSize = 3
    const allPosts = await prisma.post.findMany({})
    const postCount = allPosts.length
    const posts = await prisma.post.findMany({
      include: {
        User: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: page * pageSize,
      take: pageSize,
    })

    return res
      .status(200)
      .json({ posts, hasMore: postCount > (page + 1) * pageSize })
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
