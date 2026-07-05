import prisma from "@/db/prisma_client";

async function createTestUser(username: string, password: string) {
  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });
  return user.id;
}

export { createTestUser };
