import prisma from "@/db/prisma_client";
import type { Attempt } from "generated/prisma/client";
type AttemptInput = Pick<Attempt, "clip" | "send">;

const attemptQueries = {
  createAttempt: async (climb_id: number, attemptInput: AttemptInput) => {
    const attempt = await prisma.attempt.create({
      data: {
        send: attemptInput.send,
        clip: attemptInput.clip,
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
