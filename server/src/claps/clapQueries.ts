import prisma from "@/db/prisma_client";
import { AppError } from "@/Errors";
import type { Prisma } from "generated/prisma/client";
const selectPayload =   {
        // update!!
        select: {
             user: {
                select: {
                    username: true,
                }
                
            },
            id: true,
            postId: true,
            userId: true
        }     
        }

export type clapPayloadType = Prisma.ClapGetPayload<typeof selectPayload>;

function formatClapData(data: clapPayloadType){
    const {user, ...clapData} = data
    return {...clapData, username: user.username}
}





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
        },
        ...selectPayload

        
    })

    return formatClapData(clap);
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
        ...selectPayload
    })

    if(!clap){
        throw new AppError("cannot perform user action", 400);
    }

    return formatClapData(clap);
    },
    getClaps: async (postId: number) => {
         const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new AppError("post not found", 404);
    }


    const claps = await prisma.clap.findMany({
        where: {
            postId: postId

        },
         ...selectPayload
    })

    return claps.map(clap => formatClapData(clap))
    }
}

export default clapQueries