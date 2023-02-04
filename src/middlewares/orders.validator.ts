import { body } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { errorValidation } from "./helpers/error-validation";

export const createValidator = [
  body("user_id").notEmpty().withMessage("User id is mandatory"),
  body("cart").notEmpty().withMessage("Total order is mandatory"),
  (req: Request, res: Response, next: NextFunction) => {
    errorValidation(req, res, next);
  },
];

export const updateValidator = [
  body("name").notEmpty().withMessage("Name is mandatory"),
  body("price").notEmpty().withMessage("Price is mandatory"),
  body("stock").notEmpty().withMessage("Stock is mandatory"),
  body("sku").notEmpty().withMessage("Sku is mandatory"),
  (req: Request, res: Response, next: NextFunction) => {
    errorValidation(req, res, next);
  },
];
