import prisma from "@/db/prisma_client";
import { getPostPayload } from "./prismaBlocks";

const postRepository = {
  getNextFeedPage: async (
    limit: number,
    cursorId: number,
    cursorCreatedAt: Date,
    userId: number,
  ) => {
    const nextPage = await prisma.post.findMany({
      where: {
        OR: [
          {
            uploadedAt: {
              lt: cursorCreatedAt,
            },
          },
          {
            uploadedAt: cursorCreatedAt,
            id: {
              lt: cursorId,
            },
          },
        ],
      },
      take: limit,
      ...getPostPayload(userId),
      orderBy: [
        {
          uploadedAt: "desc",
        },
        { id: "desc" },
      ],
    });
    return nextPage;
  },

  getFirstFeedPage: async (limit: number, userId: number) => {
    const firstPage = await prisma.post.findMany({
      ...getPostPayload(userId),
      take: limit,
      orderBy: [
        {
          uploadedAt: "desc",
        },
        { id: "asc" },
      ],
    });
    firstPage;
    return firstPage;
  },

  getFollowList: async (user_id: number) => {
    const followList = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
      select: {
        following: true,
      },
    });
    return followList;
  },

  getNextFollowingPage: async (
    limit: number,
    cursorId: number,
    cursorCreatedAt: Date,
    followIds: number[],
    userId: number
  ) => {
    const nextPage = await prisma.post.findMany({
      where: {
        uploadedAt: {
          gt: cursorCreatedAt,
        },
        id: {
          gt: cursorId,
        },
        video: {
          attempt: {
            climb: {
              creatorId: {
                in: followIds,
              },
            },
          },
        },
      },
      take: limit,
      ...getPostPayload(userId),
      orderBy: [
        {
          uploadedAt: "desc",
        },
        { id: "asc" },
      ],
    });
    return nextPage;
  },

  getFirstFollowingPage: async (limit: number, followIds: number[], userId: number) => {
    const firstPage = await prisma.post.findMany({
      ...getPostPayload(userId),
      take: limit,
      where: {
        video: {
          attempt: {
            climb: {
              creatorId: {
                in: followIds,
              },
            },
          },
        },
      },
      orderBy: [
        {
          uploadedAt: "desc",
        },
        { id: "asc" },
      ],
    });
    return firstPage;
  },

  postVideo: async (attempt_id: number, date: Date | undefined) => {
    const postCreateObj = date ? { uploadedAt: date } : null;

    const video = await prisma.video.update({
      data: {
        post: {
          create: postCreateObj || {},
        },
      },
      where: {
        attemptId: attempt_id,
      },
      include: {
        post: {},
      },
    });
    return video;
  },
};

export default postRepository;
