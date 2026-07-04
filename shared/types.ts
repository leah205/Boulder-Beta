// import prisma from "../server/src/db/prisma_client";

export type { Climb } from "../server/generated/prisma/client";

export interface User {
  username: string;
  password: string;
  id: number;
}
