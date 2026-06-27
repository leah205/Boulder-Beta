import { Prisma } from "generated/prisma/client";

declare module "express" {
  interface Request {
    user?: Prisma.User;
  }
}
