import prisma from "../db/prisma_client";

export type Climb = prisma.Climb;

export interface User {
  username: string;
  password: string;
  id: number;
}
