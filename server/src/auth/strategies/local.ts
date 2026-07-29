import bcryptjs from "bcryptjs";

import { Strategy as LocalStrategy } from "passport-local";
import prisma from "../../db/prisma_client";

export default new LocalStrategy(async (username, password, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      ("incorrect username");
      return done(null, false, { message: "Username not registered" });
    }
    const match = await bcryptjs.compare(password, user.password);

    if (!match) {
      return done(null, false, { message: "incorrect username or password" });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
});
