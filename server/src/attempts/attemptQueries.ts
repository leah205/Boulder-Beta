import prisma from "@/db/prisma_client";
import z from "zod";
import { CreateAttemptSchema } from "@shared/types";
type AttemptInput = Omit<z.infer<typeof CreateAttemptSchema>, "clip"> & {
  clip: string | undefined;
};

import { uploadOnCloudinary } from "@/utils/cloudinary";
import { AppError } from "@/Errors";
import replaceIdWithClip from "@/utils/replaceIdWithClip";

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

    const attempt = await prisma.attempt.create({
      data: {
        ...input_data,
        climb: {
          connect: {
            id: climb_id,
          },
        },
        video: video_data,
      },
    });
    return attempt;
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
    const { video, uploadedAt, ...res_obj } = res;
    if (video) {
      const video_res = replaceIdWithClip(video, "video", "clip");
      return { ...res_obj, video: video_res, uploadedAt: uploadedAt.toJSON() };
    }
    return res_obj;
  },

  getVideoWithPost: async (attempt_id: number) => {
    const res = await prisma.video.findUnique({
      where: {
        attemptId: attempt_id,
      },
      include: {
        post: {},
      },
    });

    if (!res) {
      throw new AppError("Video not found", 404);
    }
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

  postVideo: async (attempt_id: number) => {
    const attempt = await prisma.attempt.findUnique({
      where: {
        id: attempt_id,
      },
    });

    if (!attempt) {
      throw new AppError("attempt not found", 404);
    }
    const video = await prisma.video.update({
      data: {
        post: {
          create: {},
        },
      },
      where: {
        attemptId: attempt_id,
      },
      include: {
        post: {},
      },
    });

    if (!video.post) {
      throw new Error("something went wrong...");
    }

    return video.post;

    // return await prisma.attempt.update({
    //   data: {
    //     published: true,
    //     post: {
    //       create: {},
    //     },
    //   },
    //   where: {
    //     id: attempt_id,
    //   },
    // });
  },
};
export default attemptQueries;
