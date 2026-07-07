import { Request, Response } from "express";
import prisma from "../db/prisma_client";
import { getCloudinarySignedUrl } from "@/utils/cloudinary";

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

    const data_obj = climbs.map((climb) => {
      const { public_id, ...data } = climb;
      const picture = public_id
        ? getCloudinarySignedUrl(public_id, "image")
        : null;
      return { ...data, picture };
    });

    return res.json(data_obj);
  },
};

export default userController;
