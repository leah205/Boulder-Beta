import prisma from "@/db/prisma_client";
import { AppError } from "@/Errors";


const clapQueries = {
    createClap: async (post_id: number, user_id: number) => {
         const post = await prisma.post.findUnique({
      where: {
        id: post_id,
      },
    });

    if (!post) {
      throw new AppError("post not found", 404);
    }

    const clap = await prisma.clap.create({
        data: {
            post: {
            connect: {
                id: post_id
            }
        }, 
        user: {
            connect: {
                id: user_id
            }
        }
        }

        
    })

    return clap;


    }
}

export default clapQueries