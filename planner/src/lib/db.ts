// Cloudflare Workers環境用のPrismaクライアント設定
// 一時的にPrismaを無効化してモックデータを使用

// モックPrismaクライアント
const mockPrisma = {
  user: {
    create: async (data: any) => ({
      id: 1,
      ...data.data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    findUnique: async (query: any) => ({
      id: query.where.id,
      email: "test@example.com",
      name: "Test User",
      createdAt: new Date(),
      updatedAt: new Date(),
      posts: [],
      messages: [],
    }),
    findMany: async () => [
      {
        id: 1,
        email: "test@example.com",
        name: "Test User",
        createdAt: new Date(),
        updatedAt: new Date(),
        posts: [],
        messages: [],
      },
    ],
    update: async (query: any) => ({
      id: query.where.id,
      ...query.data,
      updatedAt: new Date(),
    }),
    delete: async (query: any) => ({ id: query.where.id, deleted: true }),
  },
  post: {
    create: async (data: any) => ({
      id: 1,
      ...data.data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    findUnique: async (query: any) => ({
      id: query.where.id,
      title: "Test Post",
      content: "Test content",
      published: true,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: null,
    }),
    findMany: async () => [
      {
        id: 1,
        title: "Test Post",
        content: "Test content",
        published: true,
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        author: null,
      },
    ],
    update: async (query: any) => ({
      id: query.where.id,
      ...query.data,
      updatedAt: new Date(),
    }),
    delete: async (query: any) => ({ id: query.where.id, deleted: true }),
  },
  message: {
    create: async (data: any) => ({
      id: 1,
      ...data.data,
      userId: data.data.userId || null, // nullを許可
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    findUnique: async (query: any) => ({
      id: query.where.id,
      content: "Test message",
      role: "user",
      sessionId: "test-session",
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: null,
    }),
    findMany: async (query?: any) => {
      const messages = [
        {
          id: 1,
          content: "Hello",
          role: "user",
          sessionId: query?.where?.sessionId || "test-session",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          user: null,
        },
        {
          id: 2,
          content: "Hi there!",
          role: "assistant",
          sessionId: query?.where?.sessionId || "test-session",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          user: null,
        },
      ];
      return query?.where?.sessionId
        ? messages.filter((m) => m.sessionId === query.where.sessionId)
        : messages;
    },
    update: async (query: any) => ({
      id: query.where.id,
      ...query.data,
      updatedAt: new Date(),
    }),
    delete: async (query: any) => ({ id: query.where.id, deleted: true }),
  },
};

export { mockPrisma as prisma };
export default mockPrisma;
