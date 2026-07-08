// import prisma from "../server/src/db/prisma_client";

import type { Climb } from "../server/generated/prisma/client";
import type { Attempt } from "../server/generated/prisma/client";
import { ClimbScalarFieldEnum } from "../server/generated/prisma/internal/prismaNamespace";

type FrontEndClimb = Omit<Climb, "public_id"> & { picture?: string };
type FrontEndAttempt = Omit<Attempt, "public_id"> & { clip?: string };

export type { FrontEndClimb as Climb, FrontEndAttempt as Attempt };
export type { User } from "../server/generated/prisma/client";
