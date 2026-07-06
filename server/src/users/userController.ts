import { Request, Response } from "express";
import prisma from "../db/prisma_client";

const userController = {
  getMyClimbs: async (req: Request, res: Response) => {
    //filter by visibility with authentication
    //remove when add in authentication
    const id = req.user!.id;
    const climbs = await prisma.climb.findMany({
      where: {
        creatorId: id,
      },
    });

    return res.json(climbs);
  },
};

export default userController;
