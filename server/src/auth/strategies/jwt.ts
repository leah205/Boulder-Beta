import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import prisma from "../../db/prisma_client";
import config from "../../config";
import dotenv from "dotenv";
dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret,
};

export default new JwtStrategy(opts, async function (jwt_payload, done) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: jwt_payload.id,
      },
    });
    if (!user) {
      return done(null, false, { message: "user authentication failed" });
    }

    return done(null, { id: user.id, username: user.username });
  } catch (err) {
    done(err, false);
  }
});
