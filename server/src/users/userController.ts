import { Request, Response } from "express";
import userQueries from "./userQueries";
import type { ClimbResponse } from "@shared/types";

const userController = {
  getMyClimbs: async (req: Request, res: Response) => {
    //filter by visibility with authentication
    //remove when add in authentication
    const id = req.user!.id!;
    const data_obj = (await userQueries.getMyClimbs(
      id,
    )) satisfies ClimbResponse[];
    return res.json(data_obj);
  },
};

export default userController;
