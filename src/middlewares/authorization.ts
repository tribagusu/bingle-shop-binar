import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errors } from "../helpers/error.helper";
import { Authentication } from "../utils/authentication";

export const authenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
): unknown => {
  try {
    const token: string =
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return errors(res, 401, { message: "Unauthorized" });
    }

    const accessToken = Authentication.extractToken(token);

    if (!accessToken) {
      return errors(res, 401, { message: "Unauthorized" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
