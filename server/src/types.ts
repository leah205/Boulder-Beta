import prisma from "../db/prisma_client";

export interface User {
  username: string;
  password: string;
  id: number;
}

export type Climb = prisma.ClimbGetPayload;

// export interface Climb {
//   grade?: string;
//   attempts?: number;
//   creatorId: number;
//   published: boolean;
//   sent: boolean;
//   caption?: string;
//   rating?: number;
// }
