import prisma from "../db/prisma_client";

type CreateClimbInput = {
  grade?: string | null;
  picture?: string | null;
  sent?: boolean;
  color: string;
};

const climbQueries = {
  createClimb: async (creatorId: number, climb: CreateClimbInput) => {
    const data = {
      ...climb,
      creator: {
        connect: {
          id: creatorId,
        },
      },
    };
    return await prisma.climb.create({
      data: data,
    });
  },

  getAttempts: async (climb_id: number) => {
    const attempts = await prisma.attempt.findMany({
      where: {
        climbId: climb_id,
      },
    });
    return attempts;
  },

  patchClimb: async (climb: Partial<CreateClimbInput>, climb_id: number) => {
    const data = {
      ...climb,
    };
    return await prisma.climb.update({
      data: data,
      where: {
        id: climb_id,
      },
    });
  },
};

export default climbQueries;
