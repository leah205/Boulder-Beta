import prisma from "@/db/prisma_client";
import { getCloudinarySignedUrl } from "@/utils/cloudinary";

const postQueries = {
  getAllPublished: async () => {
    const published_posts = await prisma.post.findMany({
      include: {
        attempt: {
          include: {
            video: {
              select: { public_id: true },
            },
          },
        },
      },
    });
    console.log(published_posts);
    const res = published_posts.map((post) => {
      const { attempt, ...res_obj } = post;
      let clip = null;
      if (attempt.video) {
        clip = getCloudinarySignedUrl(attempt.video.public_id, "video");
      }
      return { ...res_obj, clip };
    });
    console.log(res);
    return res;
  },
};

export default postQueries;
