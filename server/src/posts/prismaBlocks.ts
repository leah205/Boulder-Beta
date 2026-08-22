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

function getPostPayload(userId: number){
  const postPayload = {
  include: {
    _count: {
      select: {
        claps: true
      }
    },
    claps: {
      where: {
        userId: userId
      },
      select: {
        userId: true
      }
    },
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
return postPayload

}

const nextPageQuery = {};

const firstPageQuery = {};

const prevPageQuery = {};

export { mostRecent, getPostPayload};
