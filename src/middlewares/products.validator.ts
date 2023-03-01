import { body } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { errorValidator } from "../helpers/error";

export const createValidator = [
  body("name").notEmpty().withMessage("Name is mandatory"),
  body("sku").notEmpty().withMessage("Sku is mandatory"),
  (req: Request, res: Response, next: NextFunction) => {
    errorValidator(req, res, next);
  },
];

export const updateValidator = [
  body("name").notEmpty().withMessage("Name is mandatory"),
  body("price")
    .notEmpty()
    .withMessage("Price is mandatory"),
  body("stock")
    .notEmpty()
    .withMessage("Stock is mandatory"),
  body("sku").notEmpty().withMessage("Sku is mandatory"),
  (req: Request, res: Response, next: NextFunction) => {
    errorValidator(req, res, next);
  },
];
