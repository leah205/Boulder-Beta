import { beforeEach, afterAll } from "vitest";
import { v2 as cloudinary } from "cloudinary";

import prisma from "@/db/prisma_client";

beforeEach(async () => {
  await prisma.$transaction([
    prisma.video.deleteMany(),
    prisma.post.deleteMany(),
    prisma.attempt.deleteMany(),
    prisma.climb.deleteMany(),
    prisma.user.deleteMany(),
  ]);
});

afterAll(async () => {
  await cloudinary.api.delete_resources_by_prefix("boulder_beta/", {
    type: "authenticated",
    resource_type: "image",
  });
  await cloudinary.api.delete_resources_by_prefix("boulder_beta/", {
    type: "authenticated",
    resource_type: "video",
  });
});
