import { Prisma } from "generated/prisma/client";
import prisma from "../db/prisma_client";

type CreateClimbInput = {
  grade: string | null;
  picture: string | null;
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

  patchClimb: async (
    creatorId: number,
    climb: Partial<Prisma.ClimbCreateInput>,
  ) => {
    const data = {
      ...climb,
      creator: {
        connect: {
          id: creatorId,
        },
      },
    };
    return await prisma.climb.update({
      data: data,
      where: {
        id: climb.id,
      },
    });
  },
};

export default climbQueries;
