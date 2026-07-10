import { getCloudinarySignedUrl } from "@/utils/cloudinary";
import prisma from "../db/prisma_client";
import { AppError } from "@/Errors";
import { uploadOnCloudinary } from "@/utils/cloudinary";

type CreateClimbInput = {
  grade?: string | null;
  picture?: string | undefined;
  sent?: boolean;
  color: string;
};

const climbQueries = {
  createClimb: async (creatorId: number, climb: CreateClimbInput) => {
    let public_id = null;
    const { picture, ...input_data } = climb;
    if (picture) {
      public_id = await uploadOnCloudinary(picture, "image");
    }

    const data = {
      ...input_data,
      public_id: public_id,
      creator: {
        connect: {
          id: creatorId,
        },
      },
    };
    return await prisma.climb.create({
      data: data,
    });
  },

  getClimb: async (climb_id: number) => {
    const data = await prisma.climb.findUnique({
      where: {
        id: climb_id,
      },
    });
    if (!data) {
      throw new AppError("climb not found", 404);
    }
    const { public_id, ...climb } = data;
    const picture = public_id
      ? getCloudinarySignedUrl(public_id, "image")
      : null;

    return { ...climb, picture };
  },

  getAttempts: async (climb_id: number) => {
    const attemptsData = await prisma.attempt.findMany({
      where: {
        climbId: climb_id,
      },
      include: {
        video: true,
      },
    });

    const res = attemptsData.map((attempt) => {
      const { video, ...res_obj } = attempt;
      const clip = video
        ? getCloudinarySignedUrl(video.public_id, "video")
        : null;
      return { ...res_obj, clip };
    });
    return res;
  },

  patchClimb: async (climb: Partial<CreateClimbInput>, climb_id: number) => {
    const data = {
      ...climb,
    };
    return await prisma.climb.update({
      data: data,
      where: {
        id: climb_id,
      },
    });
  },
};

export default climbQueries;
