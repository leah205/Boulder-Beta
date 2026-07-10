import prisma from "@/db/prisma_client";
type AttemptInput = {
  picture: string | undefined;
  send: boolean;
};
import { uploadOnCloudinary } from "@/utils/cloudinary";

const attemptQueries = {
  createAttempt: async (climb_id: number, attemptInput: AttemptInput) => {
    const { picture, ...input_data } = attemptInput;
    const public_id = picture
      ? await uploadOnCloudinary(picture, "video")
      : null;
    if (public_id) {
      const attempt = await prisma.attempt.create({
        data: {
          ...input_data,
          climb: {
            connect: {
              id: climb_id,
            },
          },
          video: {
            create: {
              public_id,
            },
          },
        },
      });
      return attempt;
    }
    const attempt = await prisma.attempt.create({
      data: {
        ...input_data,
        climb: {
          connect: {
            id: climb_id,
          },
        },
      },
    });

    return attempt;
  },
};
export default attemptQueries;
