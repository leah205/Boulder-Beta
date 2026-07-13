import prisma from "@/db/prisma_client";
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
};

export default postQueries;
