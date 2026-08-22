import { getCloudinarySignedUrl } from "@/utils/cloudinary";
import type { Prisma } from "generated/prisma/client";
import { AppError } from "@/Errors";
import { getPostPayload } from "../prismaBlocks";

type PayloadType = ReturnType<typeof getPostPayload>
export type PostPayloadType = Prisma.PostGetPayload<PayloadType>;

export default function formatData(data: PostPayloadType) {
  const { video, _count, claps, ...post } = data;

  if (!video) {
    throw new AppError("video not found", 404);
  }

  const clip = getCloudinarySignedUrl(video.public_id, "video");
  const currentUserLiked = claps.length > 0;
  const author = video.attempt.climb.creator;
  const climb_id = video.attempt.climb.id;
  const uploadedAt = post.uploadedAt.toJSON();
  const clapCount = _count.claps
  const res = {
    ...post,
    clip,
    author: {
      id: author.id,
      username: author.username,
    },
    uploadedAt,
    climb_id,
    clapCount,
    currentUserLiked
  };
  return res;
}
