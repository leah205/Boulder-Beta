import authQueries from "../auth/authQueries";
import { NextFunction, Request, Response } from "express";
import passport from "../auth/passport_config";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import type { User } from "../types";
import config from "../config";

interface authInfo {
  message?: string;
}

const userController = {
  signup: {
    post: async (req: Request, res: Response) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = await authQueries.createUser(
        req.body.username,
        req.body.password,
      );
      res.json({
        username: user.username,
        id: user.id,
      });
    },
  },
  login: {
    post: async (req: Request, res: Response, next: NextFunction) => {
      passport.authenticate(
        "local",
        { session: false },
        (err: Error, user: User, info: authInfo) => {
          console.error(err);
          if (err || !user) {
            return res.status(400).json({
              message: info.message,
              user: user,
            });
          }
          req.login(user, { session: false }, (err) => {
            if (err) {
              res.json(err);
            }
          });

          const token = jwt.sign(
            {
              id: user?.id,
              username: user?.username,
            },
            config.secret,
            { expiresIn: "1d" },
          );
          return res.json({ id: user.id, username: user.username, token });
        },
      )(req, res, next);
    },
  },

  logout: {
    get: async (req: Request, res: Response) => {
      // add in logout frontend logic
      res.json({ logout: "success" });
    },
  },

  user: {
    get: (req: Request, res: Response) => {
      return res.status(200).json(req.user);
    },
  },
};

export default userController;
