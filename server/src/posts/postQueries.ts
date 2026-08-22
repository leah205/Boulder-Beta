import prisma from "@/db/prisma_client";
import { AppError } from "@/Errors";
import { decodeCursor, encodeCursor } from "./utils/cursor";
import { mostRecent, getPostPayload } from "./prismaBlocks";
import formatData from "./utils/formatData";
import postRepository from "./postRepository";

type HasIdAndUploadedAt = {
  uploadedAt: Date;
  id: number;
};

function getNextCursor(page: HasIdAndUploadedAt[], limit: number) {
  const lastPost = page.length && page[page.length - 1];
  if (!lastPost) {
    return null;
  }

  const hasMore = page.length && page.length == limit;
  const nextCursor = hasMore
    ? encodeCursor({
        createdAt: lastPost.uploadedAt.toISOString(),
        id: lastPost.id,
      })
    : null;
  return nextCursor;
}

const postQueries = {
  getFeedPage: async (userId: number, cursor: string | null, limit: number) => {
    let page;

    if (cursor) {
      const decoded = decodeCursor(cursor);

      if (!decoded || !decoded.id || !decoded.createdAt) {
        throw new AppError("invalid cursor", 400);
      }
      const { id, createdAt } = decoded;

      page = await postRepository.getNextFeedPage(limit, id, createdAt, userId);
    } else {
      page = await postRepository.getFirstFeedPage(limit, userId);
    }

    // const prevCursor = encodeCursor({
    //   createdAt: page[0].uploadedAt.toISOString(),
    //   id: page[0].id,
    // });

    const data = page.map((post) => {
      return formatData(post);
    });
    return {
      data,
      nextCursor: getNextCursor(page, limit),
    };
  },
  getFollowingPage: async (
    user_id: number,
    cursor: string | null,
    limit: number,
  ) => {
    let page;
    const followList = await postRepository.getFollowList(user_id);
    if (!followList) {
      throw new AppError("User not found", 404);
    }

    const followIds = followList?.following.map((user) => user.id);

    if (cursor) {
      const decoded = decodeCursor(cursor);
      if (!decoded || !decoded.id || !decoded.createdAt) {
        throw new AppError("invalid cursor", 400);
      }
      const { id, createdAt } = decoded;

      page = await postRepository.getNextFollowingPage(
        limit,
        id,
        createdAt,
        followIds,
        user_id
      );
    } else {
      page = await postRepository.getFirstFollowingPage(limit, followIds, user_id);
    }
    const data = page.map((post) => {
      return formatData(post);
    });
    return {
      data,
      nextCursor: getNextCursor(page, limit),
    };
  },

  getPost: async (post_id: number, userId: number) => {
    const post = await prisma.post.findUnique({
      where: {
        id: post_id,
      },
      ...getPostPayload(userId),
    });
    if (!post) {
      throw new AppError("Post not found", 404);
    }

    return formatData(post);
  },

  postVideo: async (attempt_id: number, date: Date | undefined = undefined) => {
    const attempt = await prisma.attempt.findUnique({
      where: {
        id: attempt_id,
      },
      include: {
        video: true,
      },
    });

    const video = await postRepository.postVideo(attempt_id, date);
    if (!attempt) {
      throw new AppError("attempt not found", 404);
    }

    if (!video.post) {
      throw new Error("something went wrong...");
    }

    return video.post;
  },

  deletePost: async (id: number, userId: number) => {
    const post = await prisma.post.findUnique({
      where: { id: id },
      ...getPostPayload(userId),
    });
    if (!post) {
      throw new AppError("Post not found", 404);
    }

    await prisma.post.delete({
      where: {
        id: id,
      },
      ...getPostPayload(userId),
    });

    return formatData(post);
  },

  getPosts: async (user_id: number) => {
    const user = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const posts = await prisma.post.findMany({
      where: {
        video: {
          attempt: {
            climb: {
              creatorId: user_id,
            },
          },
        },
      },
      ...getPostPayload(user_id),
    });

    const data_obj = posts.map((post) => {
      return formatData(post);
    });
    return data_obj;
  },
};

export default postQueries;
