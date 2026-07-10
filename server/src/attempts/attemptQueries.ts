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
    const attempt = await prisma.attempt.create({
      data: {
        ...input_data,
        public_id: public_id,
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
