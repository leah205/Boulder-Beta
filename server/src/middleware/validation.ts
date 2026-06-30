import { body } from "express-validator";
import userQueries from "@/auth/authQueries";

const validation = {
  signup: [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("username is required")
      .custom(async (value) => {
        const isTaken = await userQueries.isUsernameTaken(value);
        if (isTaken) {
          throw new Error("username is taken");
        }
        return true;
      }),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 5, max: 20 })
      .withMessage("password must be between 5 and 20 characters"),
    body("password_confirm")
      .trim()
      .custom((value, { req }) => {
        return value == req.body.password;
      })
      .withMessage("Password fields must match"),
  ],
};

export default validation;
