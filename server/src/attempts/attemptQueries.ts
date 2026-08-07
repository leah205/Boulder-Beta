import prisma from "@/db/prisma_client";
import z from "zod";
import { CreateAttemptSchema } from "@shared/types";
type AttemptInput = Omit<z.infer<typeof CreateAttemptSchema>, "clip"> & {
  clip: string | undefined;
};

import { uploadOnCloudinary } from "@/utils/cloudinary";
import { AppError } from "@/Errors";
import replaceIdWithClip from "@/utils/replaceIdWithClip";
import type { Attempt } from "generated/prisma/client";

function formatAttempt(attempt: Attempt) {
  const { uploadedAt, height, leftOffset, ...rest } = attempt;
  return {
    uploadedAt: uploadedAt.toJSON(),
    height: height ? Number(height) : null,
    leftOffset: leftOffset ? Number(leftOffset) : null,
    ...rest,
  };
}

const attemptQueries = {
  createAttempt: async (
    climb_id: number,
    climbHeight: number | undefined,
    attemptInput: AttemptInput,
  ) => {
    const {
      height = undefined,
      clip = undefined,
      ...input_data
    } = attemptInput;

    const newHeight =
      climbHeight && height && height > climbHeight ? climbHeight : height;

    const public_id = clip ? await uploadOnCloudinary(clip, "video") : null;
    const video_data = public_id
      ? {
          create: {
            public_id,
          },
        }
      : undefined;

    const attempt = await prisma.attempt.create({
      data: {
        ...input_data,
        height: newHeight,
        climb: {
          connect: {
            id: climb_id,
          },
        },
        video: video_data,
      },
    });
    return formatAttempt(attempt);
  },

  getAttemptWithVideo: async (attempt_id: number) => {
    const res = await prisma.attempt.findUnique({
      where: {
        id: attempt_id,
      },
      include: {
        video: {
          include: {
            post: true,
          },
        },
      },
    });

    if (!res) {
      throw new AppError("Attempt not found", 404);
    }
    const { video, ...attempt } = res;
    const formattedAttempt = formatAttempt(attempt);
    if (video) {
      const video_res = replaceIdWithClip(video, "video", "clip");
      return { ...formatAttempt, video: video_res };
    }
    return formattedAttempt;
  },

  // getVideoWithPost: async (attempt_id: number) => {
  //   const res = await prisma.video.findUnique({
  //     where: {
  //       attemptId: attempt_id,
  //     },
  //     include: {
  //       post: {},
  //     },
  //   });

  //   if (!res) {
  //     throw new AppError("Video not found", 404);
  //   }
  //   return res;
  // },

  getClimbAttempts: async (climb_id: number) => {
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
      orderBy: [
        {
          uploadedAt: "desc",
        },
        { id: "asc" },
      ],
    });

    const res = attemptsData.map((attempt) => {
      const { video, ...attemptInput } = attempt;
      if (video) {
        const video_res = replaceIdWithClip(video, "video", "clip");
        return {
          ...formatAttempt(attemptInput),
          video: video_res,
        };
      }

      return { video, ...formatAttempt(attemptInput) };
    });

    return res;
  },

  getAttemptWithUser: async (attempt_id: number) => {
    const res = await prisma.attempt.findUnique({
      where: {
        id: attempt_id,
      },
      include: {
        climb: {
          select: {
            creatorId: true,
          },
        },
      },
    });
    if (!res) {
      throw new AppError("attempt does not exist", 404);
    }
    return res;
  },
};
export default attemptQueries;
