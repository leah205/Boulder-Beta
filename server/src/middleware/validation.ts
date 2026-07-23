import { body } from "express-validator";
import userQueries from "@/auth/authQueries";

const validGrades = Array(15)
  .fill("V")
  .map((ele, index) => {
    return ele + index;
  });
validGrades.unshift("VB");
validGrades.unshift("");

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

  logclimb: [
    body("grade")
      .trim()
      .optional({ nullable: true })
      .isIn(validGrades)
      .withMessage("invalid grade"),
    body("color").notEmpty().withMessage("color must be provided"),
    // body("climb.attempt_num")
    //   .optional()
    //   .toInt()
    //   .isInt({ min: 0 })
    //   .withMessage("attempt number must be positive"),
    // body("climb.rating")
    //   .optional()
    //   .toInt()
    //   .isInt({ min: 1, max: 5 })
    //   .withMessage("rating must be between 1 and 5"),
  ],
  createBeta: [
    body("content")
      .trim()
      .notEmpty()
      .withMessage("Please provide comment content"),
  ],
};

export default validation;
