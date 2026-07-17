import prisma from "@/db/prisma_client";
import { AppError } from "@/Errors";
import { getCloudinarySignedUrl } from "@/utils/cloudinary";
import type { Prisma } from "generated/prisma/client";

const Payload = {
  include: {
    betas: {
      include: {
        author: {
          select: {
            username: true,
            id: true,
          },
        },
      },
    },
    video: {
      select: {
        public_id: true,
        attempt: {
          include: {
            climb: {
              include: {
                creator: {
                  select: {
                    id: true,
                    username: true,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
} satisfies Prisma.PostDefaultArgs;

function formatData(data: Prisma.PostGetPayload<typeof Payload>) {
  const { video, ...post } = data;

  if (!video) {
    throw new AppError("video not found", 404);
  }

  const clip = getCloudinarySignedUrl(video.public_id, "video");

  const author = video.attempt.climb.creator;
  const res = {
    ...post,
    clip,
    author: {
      id: author.id,
      username: author.username,
    },
  };
  return res;
}

const postQueries = {
  getAllPublished: async () => {
    const published_posts = await prisma.post.findMany({
      ...Payload,
    });

    const res = published_posts.map((post) => {
      return formatData(post);
    });
    return res;
  },

  getPost: async (post_id: number) => {
    const post = await prisma.post.findUnique({
      where: {
        id: post_id,
      },
      ...Payload,
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
      ...Payload,
    });
    return formatData(post);
  },

  getPosts: async (user_id: number) => {
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
      ...Payload,
    });

    const data_obj = posts.map((post) => {
      return formatData(post);
    });
    return data_obj;
  },
};

export default postQueries;
