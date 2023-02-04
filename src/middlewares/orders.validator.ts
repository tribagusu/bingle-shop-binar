import { body, checkSchema } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { errorValidation } from "./helpers/error-validation";

export const getValidator = [
  body("user_id").notEmpty().withMessage("user_id is mandatory"),
  (req: Request, res: Response, next: NextFunction) => {
    errorValidation(req, res, next);
  },
];

export const createValidator = [
  body("user_id").notEmpty().withMessage("user id is mandatory"),
  body("cart")
    .notEmpty()
    .withMessage("cart is mandatory")
    .isArray()
    .withMessage(
      "cart should be valid array of object contains 'product_id' & 'quantity'"
    ),
  (req: Request, res: Response, next: NextFunction) => {
    errorValidation(req, res, next);
  },
];
