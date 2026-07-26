import prisma from "@/db/prisma_client";
import { AppError } from "@/Errors";
import { getCloudinarySignedUrl } from "@/utils/cloudinary";
import type { Prisma } from "generated/prisma/client";

const UserPayload = {
  omit: {
    password: true,
  },
  include: {
    following: {
      select: { id: true, username: true },
    },
    followedBy: {
      select: { id: true, username: true },
    },
  },
} satisfies Prisma.UserDefaultArgs;

const FollowPayload = {
  omit: {
    password: true,
  },
} satisfies Prisma.UserDefaultArgs;

export type UserPayloadType = Prisma.UserGetPayload<typeof UserPayload>;
export type FollowPayloadType = Prisma.UserGetPayload<typeof FollowPayload>;

const userQueries = {
  getFollowing: async (user_id: number) => {
    const following = await prisma.user.findMany({
      where: {
        followedBy: {
          some: {
            id: user_id,
          },
        },
      },
      ...FollowPayload,
    });
    return following;
  },
  getUser: async (user_id: number) => {
    const user = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
      ...UserPayload,
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  },

  followUser: async (follow_id: number, current_id: number) => {
    if (follow_id == current_id) {
      throw new AppError("Cannot follow yourself", 400);
    }

    const userToFollow = await prisma.user.findUnique({
      where: {
        id: follow_id,
      },
      include: {
        followedBy: true,
      },
    });

    if (!userToFollow) {
      throw new AppError("User not found", 404);
    }

    if (userToFollow.followedBy.some((user) => user.id == current_id)) {
      throw new AppError("Already following user", 400);
    }
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
  unfollowUser: async (follow_id: number, current_id: number) => {
    if (follow_id == current_id) {
      throw new AppError("Cannot unfollow yourself", 400);
    }
    const userToFollow = await prisma.user.findUnique({
      where: {
        id: follow_id,
      },
      include: {
        followedBy: true,
      },
    });

    if (!userToFollow) {
      throw new AppError("User not found", 404);
    }

    if (!userToFollow.followedBy.some((user) => user.id == current_id)) {
      throw new AppError("Not following user", 400);
    }

    const user = await prisma.user.update({
      where: {
        id: current_id,
      },

      data: {
        following: {
          disconnect: {
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
