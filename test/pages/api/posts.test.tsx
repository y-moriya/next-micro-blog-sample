import { createMocks, Session } from 'node-mocks-http'
import client from 'next-auth/client'
import handlePosts from '../../../pages/api/posts'

jest.mock('next-auth/client')

const mockCreateResource = jest.fn()

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    resource: {
      create: (data: any) => mockCreateResource(data),
    },
    post: {
      findMany: jest.fn(() => [
        {
          id: 1,
          content: 'mocked content',
          createdAt: new Date(),
          userId: 1,
        },
      ]),
      create: jest.fn(() => [
        {
          id: 2,
          content: 'mocked content 2',
          createdAt: new Date(),
          userId: 1,
        },
      ]),
    },
  })),
}))

beforeEach(() => {
  mockCreateResource.mockClear()
})

describe('/api/posts', () => {
  it('should return 401 if it has no session', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })
    ;(client.getSession as jest.Mock).mockReturnValueOnce(null)

    await handlePosts(req, res)
    expect(res._getStatusCode()).toBe(401)
  })

  it('should return 200', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })
    const mockSession: Session = {
      user: { id: 1 },
    }

    ;(client.getSession as jest.Mock).mockReturnValueOnce(mockSession)

    await handlePosts(req, res)
    expect(res._getStatusCode()).toBe(200)
  })
})
