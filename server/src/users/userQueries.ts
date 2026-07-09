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
};
export default userQueries;
