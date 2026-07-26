import { getCloudinarySignedUrl } from "@/utils/cloudinary";
import type { Prisma } from "generated/prisma/client";
import { postPayload } from "../prismaBlocks";
import { AppError } from "@/Errors";

export type PostPayloadType = Prisma.PostGetPayload<typeof postPayload>;

export default function formatData(data: PostPayloadType) {
  const { video, ...post } = data;

  if (!video) {
    throw new AppError("video not found", 404);
  }

  const clip = getCloudinarySignedUrl(video.public_id, "video");

  const author = video.attempt.climb.creator;
  const climb_id = video.attempt.climb.id;
  const uploadedAt = video.attempt.climb.uploadedAt.toJSON();
  const res = {
    ...post,
    clip,
    author: {
      id: author.id,
      username: author.username,
    },
    uploadedAt,
    climb_id,
  };
  return res;
}
