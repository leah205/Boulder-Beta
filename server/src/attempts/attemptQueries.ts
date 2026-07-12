import prisma from "@/db/prisma_client";
import z from "zod";
import { CreateAttemptSchema } from "@shared/types";
type AttemptInput = Omit<z.infer<typeof CreateAttemptSchema>, "clip"> & {
  clip: string | undefined;
};

import { uploadOnCloudinary } from "@/utils/cloudinary";

const attemptQueries = {
  createAttempt: async (climb_id: number, attemptInput: AttemptInput) => {
    const { clip, ...input_data } = attemptInput;
    const public_id = clip ? await uploadOnCloudinary(clip, "video") : null;

    const video_data = public_id
      ? {
          create: {
            public_id,
          },
        }
      : undefined;
    const post_data = attemptInput.published
      ? {
          create: {},
        }
      : undefined;

    const attempt = await prisma.attempt.create({
      data: {
        ...input_data,
        climb: {
          connect: {
            id: climb_id,
          },
        },
        video: video_data,
        post: post_data,
      },
    });
    return attempt;
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
    return res;
  },

  publishAttempt: async (attempt_id: number) => {
    return await prisma.attempt.update({
      data: {
        published: true,
        post: {
          create: {},
        },
      },
      where: {
        id: attempt_id,
      },
    });
  },
};
export default attemptQueries;
