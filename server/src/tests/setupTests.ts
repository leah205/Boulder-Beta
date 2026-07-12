import { beforeEach, afterEach } from "vitest";
import { vi } from "vitest";
import prisma from "@/db/prisma_client";
import { uploadOnCloudinary, getCloudinarySignedUrl } from "@/utils/cloudinary";

vi.mock(import("@/utils/cloudinary"), () => ({
  uploadOnCloudinary: vi.fn(),
  getCloudinarySignedUrl: vi.fn(),
}));

beforeEach(async () => {
  await prisma.$transaction([
    prisma.video.deleteMany(),
    prisma.post.deleteMany(),
    prisma.attempt.deleteMany(),
    prisma.climb.deleteMany(),
    prisma.user.deleteMany(),
  ]);
  vi.mocked(uploadOnCloudinary).mockResolvedValue("taco_cat");
  vi.mocked(getCloudinarySignedUrl).mockReturnValue("https://fake_url.com");
});

afterEach(async () => {
  vi.resetAllMocks();
});

// afterAll(async () => {
//   await cloudinary.api.delete_resources_by_prefix("boulder_beta/", {
//     type: "authenticated",
//     resource_type: "image",
//   });
//   await cloudinary.api.delete_resources_by_prefix("boulder_beta/", {
//     type: "authenticated",
//     resource_type: "video",
//   });
// });
