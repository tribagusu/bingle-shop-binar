import { body, checkSchema } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { errorValidation } from "./helpers/error-validation";

export const updateValidator = [
  body("user_id").notEmpty().withMessage("user_id is mandatory"),
  (req: Request, res: Response, next: NextFunction) => {
    errorValidation(req, res, next);
  },
];
