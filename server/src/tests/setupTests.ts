import { beforeEach } from "vitest";

import prisma from "@/db/prisma_client";

beforeEach(async () => {
  await prisma.$transaction([
    prisma.attempt.deleteMany(),
    prisma.climb.deleteMany(),
    prisma.user.deleteMany(),
  ]);
});
