import prisma from "../db/prisma_client";
import { AppError } from "@/Errors";
import { uploadOnCloudinary } from "@/utils/cloudinary";
import replaceIdWithClip from "@/utils/replaceIdWithClip";

// function formatClimbData(input: Climb) {
//   const { public_id, ...res } = input;
//   const media = public_id
//     ? getCloudinarySignedUrl(public_id, resource_type)
//     : null;
//   return { ...res, [resource_name]: media };
// }

type CreateClimbInput = {
  grade?: string | null;
  picture?: string | undefined;
  sent?: boolean;
  color: string;
  uploadedAt: Date | undefined;
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

    const res = replaceIdWithClip(data, "image", "picture");
    return { ...res, uploadedAt: res.uploadedAt.toJSON() };
  },

  getAttempts: async (climb_id: number) => {
    const climb = await prisma.climb.findUnique({
      where: {
        id: climb_id,
      },
    });

    if (!climb) {
      throw new AppError("climb not found", 404);
    }

    const attemptsData = await prisma.attempt.findMany({
      where: {
        climbId: climb_id,
      },
      include: {
        video: {
          include: {
            post: true,
          },
        },
      },
    });

    const res = attemptsData.map((attempt) => {
      const { video, uploadedAt, ...res_obj } = attempt;
      if (video) {
        const video_res = replaceIdWithClip(video, "video", "clip");
        return {
          ...res_obj,
          video: video_res,
          uploadedAt: uploadedAt.toJSON(),
        };
      }

      return { ...res_obj, video, uploadedAt: uploadedAt.toJSON() };
    });

    return res;
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
    return await prisma.climb.update({
      data: data,
      where: {
        id: climb_id,
      },
    });
  },
};

export default climbQueries;
