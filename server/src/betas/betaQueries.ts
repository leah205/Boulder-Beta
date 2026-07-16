import prisma from "@/db/prisma_client";
import { AppError } from "@/Errors";
import { createBetaSchema } from "@shared/types";
import z from "zod";

type BetaInput = z.infer<typeof createBetaSchema>;

const betaQueries = {
  createBeta: async (postId: number, userId: number, betaInput: BetaInput) => {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new AppError("post not found", 404);
    }

    const beta = await prisma.beta.create({
      data: {
        ...betaInput,
        author: {
          connect: {
            id: userId,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
      include: {
        author: {
          select: {
            username: true,
            id: true,
          },
        },
      },
    });
    return beta;
  },

  //   getBetas: async (postId: number) => {
  //     const post = await prisma.post.findUnique({
  //         where: {
  //             id: postId
  //         }
  //     })

  //     if(!post){
  //         throw new AppError("Post not found", )
  //     }

  //     const betas = await prisma.beta.findMany({
  //       where: {
  //         postId: postId,
  //       },
  //     });
  //     return betas;
  //   },
};

export default betaQueries;
