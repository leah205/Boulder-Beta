import { getCloudinarySignedUrl } from "@/utils/cloudinary";
import prisma from "../db/prisma_client";
import { AppError } from "@/Errors";

type CreateClimbInput = {
  grade?: string | null;
  public_id?: string | null;
  sent?: boolean;
  color: string;
};

const climbQueries = {
  createClimb: async (creatorId: number, climb: CreateClimbInput) => {
    const data = {
      ...climb,
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
    });
    const res = attemptsData.map((attempt) => {
      const { public_id, ...res_obj } = attempt;
      const clip = public_id
        ? getCloudinarySignedUrl(public_id, "video")
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
