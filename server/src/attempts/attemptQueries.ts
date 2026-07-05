import prisma from "@/db/prisma_client";

const attemptQueries = {
  createAttempt: async (climb_id: number, send: boolean) => {
    const attempt = await prisma.attempt.create({
      data: {
        send,
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
