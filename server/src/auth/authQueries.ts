import prisma from "../db/prisma_client";
import bcrypt from "bcryptjs";

const userQueries = {
  createUser: async (username: string, password: string) => {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username: username,
        password: hashed,
      },
    });
    return user;
  },
  isUsernameTaken: async (username: string) => {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    return Boolean(user);
  },
};

export default userQueries;
