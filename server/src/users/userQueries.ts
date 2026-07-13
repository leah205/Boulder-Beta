import prisma from "@/db/prisma_client";
import { getCloudinarySignedUrl } from "@/utils/cloudinary";

const userQueries = {
  getMyClimbs: async (user_id: number) => {
    const climbs = await prisma.climb.findMany({
      where: {
        creatorId: user_id,
      },
    });

    const data_obj = climbs.map((climb) => {
      const { public_id, ...data } = climb;
      const picture = public_id
        ? getCloudinarySignedUrl(public_id, "image")
        : null;
      return { ...data, picture };
    });
    return data_obj;
  },

  getMyPosts: async (user_id: number) => {
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
      },
    });

    const data_obj = posts.map((post) => {
      const { video, ...res_rest } = post;
      const { public_id, ...data } = video;
      const clip = public_id
        ? getCloudinarySignedUrl(public_id, "video")
        : null;
      const res = { ...res_rest, video: { ...data, clip } };
      return res;
    });

    return data_obj;
  },
};
export default userQueries;
