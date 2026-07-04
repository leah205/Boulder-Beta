import { Request, Response } from "express";
import prisma from "../db/prisma_client";
import { getFromCloudinary } from "@/utils/cloudinary";

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

    const climbPromises = climbs.map((climb) => {
      return getFromCloudinary(climb.id);
    });

    Promise.all(climbPromises).then((urls) => {
      for (let i = 0; i < urls.length; i++) {
        climbs[i].picture = urls[i] || null;
      }
    });

    return res.json(climbs);
  },
};

export default userController;
