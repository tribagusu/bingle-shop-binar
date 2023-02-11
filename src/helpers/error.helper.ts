import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const errors = (res: Response, code: number, errors: Object) => {
  return res.status(code).json({
    status: false,
    code: code,
    errors: errors,
  });
};

export const errorValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  next();
};
