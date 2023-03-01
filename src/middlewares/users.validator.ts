import { body } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { errorValidator } from "../helpers/error";

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
    errorValidator(req, res, next);
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
    errorValidator(req, res, next);
  },
];
