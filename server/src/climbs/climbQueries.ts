import prisma from "../db/prisma_client";
import { AppError } from "@/Errors";
import { uploadOnCloudinary } from "@/utils/cloudinary";
import replaceIdWithClip from "@/utils/replaceIdWithClip";
import { CreateClimbRequest } from "@shared/types";
import { Send } from "express";
import type { Climb } from "generated/prisma/client";

type CreateClimbInput = Omit<CreateClimbRequest, "picture"> & {
  picture?: string;
  uploadedAt?: Date;
  sent: boolean;
};

function formatClimbData(input: Climb) {
  const res = replaceIdWithClip(input, "image", "picture");
  const topHeight = input.topHeight ? Number(input.topHeight) : null;
  const topLeftOffset = input.topLeftOffset
    ? Number(input.topLeftOffset)
    : null;
  return {
    ...res,
    uploadedAt: res.uploadedAt.toJSON(),
    topHeight,
    topLeftOffset,
  };
}

const climbQueries = {
  createClimb: async (creatorId: number, climb: CreateClimbInput) => {
    let public_id = null;
    const { picture, ...input_data } = climb;
    if (picture) {
      public_id = await uploadOnCloudinary(picture, "image");
    }

    if (!climb.color || !climb.color.length) {
      throw new AppError("no color provided", 400);
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
    const res = await prisma.climb.create({
      data: data,
    });

    return formatClimbData(res);
  },

  getClimb: async (climb_id: number) => {
    const res = await prisma.climb.findUnique({
      where: {
        id: climb_id,
      },
    });
    if (!res) {
      throw new AppError("climb not found", 404);
    }

    return formatClimbData(res);
  },

  patchClimb: async (climb: Partial<CreateClimbInput>, climb_id: number) => {
    const climbData = await prisma.climb.findUnique({
      where: {
        id: climb_id,
      },
    });

    if (!climbData) {
      throw new AppError("climb not found", 404);
    }
    const data = {
      ...climb,
    };
    const res = await prisma.climb.update({
      data: data,
      where: {
        id: climb_id,
      },
    });

    return formatClimbData(res);
  },

  getMyClimbs: async (user_id: number) => {
    const climbs = await prisma.climb.findMany({
      where: {
        creatorId: user_id,
      },
      orderBy: [
        {
          uploadedAt: "desc",
        },
      ],
    });

    const data_obj = climbs.map((climb) => {
      return formatClimbData(climb);
    });
    return data_obj;
  },
};

export default climbQueries;
