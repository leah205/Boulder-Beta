import prisma from "@/db/prisma_client";
import { AppError } from "@/Errors";
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
  getFollowing: async (user_id: number) => {
    const following = await prisma.user.findMany({
      where: {
        followedBy: {
          some: {
            id: user_id,
          },
        },
      },
      omit: {
        password: true,
      },
    });
    return following;
  },
  getUser: async (user_id: number) => {
    const user = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
      omit: {
        password: true,
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  },

  followUser: async (follow_id: number, current_id: number) => {
    //error if uesr
    const user = await prisma.user.update({
      where: {
        id: current_id,
      },

      data: {
        following: {
          connect: {
            id: follow_id,
          },
        },
      },
      omit: {
        password: true,
      },
    });

    return user;
  },
};
export default userQueries;
