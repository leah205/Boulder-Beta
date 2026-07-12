import authQueries from "../auth/authQueries";
import { NextFunction, Request, Response } from "express";
import passport from "../auth/passport_config";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import config from "../config";
import type { AuthenticatedUser } from "@/types";
import {
  type AuthResponse,
  type LoginRequest,
  LoginSchema,
  LoginResponse,
  SignupSchema,
} from "@shared/types";

type authInfo = {
  message?: string;
};

const userController = {
  signup: {
    post: async (req: Request, res: Response) => {
      req.body = SignupSchema.parse(req.body);
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const result = errors.formatWith((err) => err.msg);
        return res.status(400).json({ errors: result.array() });
      }
      const user = await authQueries.createUser(
        req.body.username,
        req.body.password,
      );

      const data = {
        username: user.username,
        id: user.id,
      } satisfies AuthResponse;
      res.json(data);
    },
  },
  login: {
    post: async (req: Request, res: Response, next: NextFunction) => {
      req.body = LoginSchema.parse(req.body);
      passport.authenticate(
        "local",
        { session: false },
        (err: Error, user: LoginRequest, info: authInfo) => {
          if (err || !user) {
            return res.status(400).json({
              message: info.message,
              user: user,
            });
          }

          const authenticatedUser = user as unknown as AuthenticatedUser;
          const token = jwt.sign(
            {
              id: authenticatedUser?.id,
              username: authenticatedUser?.username,
            },
            config.secret,
            { expiresIn: "1d" },
          );
          return res.json({
            id: authenticatedUser.id,
            username: user.username,
            token,
          } satisfies LoginResponse);
        },
      )(req, res, next);
    },
  },

  logout: {
    post: async (req: Request, res: Response, next: NextFunction) => {
      req.logout(function (err) {
        if (err) {
          return next(err);
        }

        res.json({ logout: "success" });
      });
    },
  },

  user: {
    get: (req: Request, res: Response) => {
      const user = req.user satisfies AuthResponse;
      return res.status(200).json(user);
    },
  },
};

export default userController;
