import prisma from "@/db/prisma_client";
import { AppError } from "@/Errors";
import { getCloudinarySignedUrl } from "@/utils/cloudinary";

const postQueries = {
  getAllPublished: async () => {
    const published_posts = await prisma.post.findMany({
      include: {
        video: {
          select: { public_id: true },
        },
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
};

export default postQueries;
