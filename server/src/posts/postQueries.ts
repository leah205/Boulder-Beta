import prisma from "@/db/prisma_client";
import { AppError } from "@/Errors";
import { decodeCursor, encodeCursor } from "./utils/cursor";
import { mostRecent, postPayload } from "./prismaBlocks";
import formatData from "./utils/formatData";
import postRepository from "./postRepository";

const postQueries = {
  getFeedPage: async (cursor: string | null, cursorType: string | null) => {
    const limit = 3;
    let page;
    if (cursor) {
      const { id, createdAt } = decodeCursor(cursor);
      page = await postRepository.getNextFeedPage(limit, id, createdAt);
    } else {
      page = await postRepository.getFirstFeedPage(limit);
    }

    const lastPost = page[page.length - 1];
    const hasMore = page.length == limit;
    const nextCursor = hasMore
      ? encodeCursor({
          createdAt: lastPost.uploadedAt.toISOString(),
          id: lastPost.id,
        })
      : null;
    // const prevCursor = encodeCursor({
    //   createdAt: page[0].uploadedAt.toISOString(),
    //   id: page[0].id,
    // });
    const data = page.map((post) => {
      return formatData(post);
    });
    return {
      data,
      nextCursor,
    };
  },
  getFollowingPage: async (user_id: number, cursor: string | null) => {
    const limit = 3;
    let page;
    const followList = await postRepository.getFollowList(user_id);
    if (!followList) {
      throw new AppError("User not found", 404);
    }

    const followIds = followList?.following.map((user) => user.id);

    if (cursor) {
      const { id, createdAt } = decodeCursor(cursor);
      page = await postRepository.getNextFollowingPage(
        limit,
        id,
        createdAt,
        followIds,
      );
    } else {
      page = await postRepository.getFirstFollowingPage(limit, followIds);
    }

    const lastPost = page[page.length - 1];
    const hasMore = page.length == limit;
    console.log(page.length);
    console.log(limit);

    const nextCursor = hasMore
      ? encodeCursor({
          createdAt: lastPost.uploadedAt.toISOString(),
          id: lastPost.id,
        })
      : null;

    const data = page.map((post) => {
      return formatData(post);
    });
    return {
      data,
      nextCursor,
    };
  },

  getPost: async (post_id: number) => {
    const post = await prisma.post.findUnique({
      where: {
        id: post_id,
      },
      ...postPayload,
    });
    if (!post) {
      throw new AppError("Post not found", 404);
    }

    return formatData(post);
  },

  deletePost: async (id: number) => {
    const post = await prisma.post.delete({
      where: {
        id: id,
      },
      ...postPayload,
    });

    if (!post) {
      throw new AppError("Post not found", 404);
    }
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
      ...postPayload,
    });

    const data_obj = posts.map((post) => {
      return formatData(post);
    });
    return data_obj;
  },
};

export default postQueries;
