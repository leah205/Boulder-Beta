import prisma from "@/db/prisma_client";
import { AppError } from "@/Errors";
import { getCloudinarySignedUrl } from "@/utils/cloudinary";

const betaPaylod = {
  include: {
    author: {
      select: {
        username: true,
        id: true,
      },
    },
  },
};

const postQueries = {
  getAllPublished: async () => {
    const published_posts = await prisma.post.findMany({
      include: {
        video: {
          select: { public_id: true },
        },
        betas: betaPaylod,
      },
    });

    const res = published_posts.map((post) => {
      const { video, ...res_obj } = post;
      let clip = null;
      if (video) {
        clip = getCloudinarySignedUrl(video.public_id, "video");
      }
      return { ...res_obj, clip };
    });
    return res;
  },

  getPost: async (post_id: number) => {
    const post = await prisma.post.findUnique({
      where: {
        id: post_id,
      },
      include: {
        video: {
          select: { public_id: true },
        },
        betas: betaPaylod,
      },
    });
    if (!post) {
      throw new AppError("Post not found", 404);
    }
    if (post.video) {
      const { video, ...res_obj } = post;
      let clip = null;
      if (video) {
        clip = getCloudinarySignedUrl(video.public_id, "video");
      }
      return { ...res_obj, clip };
    }
    return post;
  },

  deletePost: async (id: number) => {
    const post = await prisma.post.delete({
      where: {
        id: id,
      },
    });
    return post;
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
      include: {
        video: true,
        betas: betaPaylod,
      },
    });

    const data_obj = posts.map((post) => {
      const { video, ...res_rest } = post;
      const { public_id } = video;
      const clip = public_id
        ? getCloudinarySignedUrl(public_id, "video")
        : null;
      const res = { ...res_rest, clip };
      return res;
    });
    return data_obj;
  },
};

export default postQueries;
