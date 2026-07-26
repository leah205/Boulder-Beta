import prisma from "@/db/prisma_client";
import { postPayload } from "./prismaBlocks";

const postRepository = {
  getNextFeedPage: async (
    limit: number,
    cursorId: number,
    cursorCreatedAt: Date,
  ) => {
    const posts = await prisma.post.findMany({
      select: {
        uploadedAt: true,
        id: true,
      },
    });
    console.log(posts);
    console.log(cursorId);
    console.log(cursorCreatedAt);
    const nextPage = await prisma.post.findMany({
      where: {
        uploadedAt: {
          lt: cursorCreatedAt,
        },
        id: {
          lt: cursorId,
        },
      },
      take: limit,
      ...postPayload,
      orderBy: [
        {
          uploadedAt: "desc",
        },
        { id: "asc" },
      ],
    });
    return nextPage;
  },

  getFirstFeedPage: async (limit: number) => {
    const firstPage = await prisma.post.findMany({
      ...postPayload,
      take: limit,
      orderBy: [
        {
          uploadedAt: "desc",
        },
        { id: "asc" },
      ],
    });
    console.log(firstPage);
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
      ...postPayload,
      orderBy: [
        {
          uploadedAt: "desc",
        },
        { id: "asc" },
      ],
    });
    return nextPage;
  },

  getFirstFollowingPage: async (limit: number, followIds: number[]) => {
    const firstPage = await prisma.post.findMany({
      ...postPayload,
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
};

export default postRepository;
