import type { Prisma } from "generated/prisma/client";

const mostRecent = {
  video: {
    attempt: {
      climb: {
        uploadedAt: "desc",
      },
    },
  },
} satisfies Prisma.PostOrderByWithRelationInput;
const postPayload = {
  include: {
    betas: {
      include: {
        author: {
          select: {
            username: true,
            id: true,
          },
        },
      },
    },

    video: {
      select: {
        public_id: true,
        attempt: {
          include: {
            climb: {
              select: {
                id: true,
                uploadedAt: true,
                creator: {
                  select: {
                    id: true,
                    username: true,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
} satisfies Prisma.PostDefaultArgs;

const nextPageQuery = {};

const firstPageQuery = {};

const prevPageQuery = {};

export { mostRecent, postPayload };
