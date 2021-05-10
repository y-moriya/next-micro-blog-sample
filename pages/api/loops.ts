import { PrismaClient } from '.prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handleLoops(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const loops = await prisma.loop.findMany({
      include: {
        CreatedUser: true,
      },
      orderBy: {
        id: 'desc',
      },
    })

    return res.status(200).json({
      loops,
    })
  }
}
