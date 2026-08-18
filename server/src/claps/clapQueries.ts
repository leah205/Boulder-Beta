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
    },
    removeClap: async (post_id: number, user_id: number) => {
         const post = await prisma.post.findUnique({
      where: {
        id: post_id,
      },
    });

    if (!post) {
      throw new AppError("post not found", 404);
    }

    const clap = await prisma.clap.delete({
        where: {
            clapId: {
                postId: post_id,
                userId: user_id
            }  
        }, 
    })

    if(!clap){
        throw new AppError("cannot perform user action", 400);
    }

    return clap;
    }
}

export default clapQueries