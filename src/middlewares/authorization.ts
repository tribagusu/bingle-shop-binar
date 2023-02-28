import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errors } from "../helpers/error.helper";
import { Authentication } from "../utils/authentication";
const { User } = require("../db/models");

export const authenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
): unknown => {
  try {
    const accessToken: string =
      req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
      return errors(res, 401, { message: "Unauthorized" });
    }

    const decodedToken =
      Authentication.extractToken(accessToken);

    if (!decodedToken) {
      return errors(res, 401, { message: "Unauthorized" });
    }

    res.locals.userId = decodedToken?.id;

    next();
  } catch (error) {
    next(error);
  }
};

export const adminRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response> => {
  try {
    const userId = res.locals.userId;

    const user = await User.findOne({
      where: { id: userId },
    });

    if (user.role !== "admin") {
      return errors(res, 403, { message: "Forbidden" });
    }

    next();
  } catch (err) {
    next(err);
  }
};
