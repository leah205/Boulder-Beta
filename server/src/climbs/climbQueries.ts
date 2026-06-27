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
    const climb_obj = await prisma.climb.create({
      data: data,
    });
    console.log(climb_obj);
    return climb_obj;
  },
};

export default climbQueries;
