import { body } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { errorValidation } from "../helpers/error.helper";

export const registerValidator = [
  body("email")
    .isEmail()
    .withMessage("Email needs to be a valid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage(
      "Password length must be at least 6 characters",
    ),
  (req: Request, res: Response, next: NextFunction) => {
    errorValidation(req, res, next);
  },
];

export const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Email needs to be a valid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage(
      "Password length must be at least 6 characters",
    ),
  (req: Request, res: Response, next: NextFunction) => {
    errorValidation(req, res, next);
  },
];
