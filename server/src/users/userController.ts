import { Request, Response } from "express";
import prisma from "../db/prisma_client";

const userController = {
  getUserClimbs: async (req: Request, res: Response) => {
    //filter by visibility with authentication

    //remove when add in authentication
    const id = 1;
    const climbs = await prisma.climb.findMany({
      where: {
        creatorId: id,
      },
    });

    return res.json({ data: climbs });
  },
};

export default userController;
