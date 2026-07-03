import { Prisma } from "generated/prisma/client";
import prisma from "../db/prisma_client";

const climbQueries = {
  createClimb: async (creatorId: number, climb: Prisma.ClimbCreateInput) => {
    console.log(climb);
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
    console.log(climb);
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
