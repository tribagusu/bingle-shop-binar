import { Request, Response, NextFunction } from "express";
import { createErrors } from "../helpers/error";
import ModuleJwt from "../modules/jwt";
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
      return createErrors(res, 401, {
        message: "Unauthorized",
      });
    }

    const decodedAccessToken =
      ModuleJwt.verifyToken(accessToken);

    if (!decodedAccessToken) {
      return createErrors(res, 401, {
        message: "Unauthorized",
      });
    }

    res.locals.userId = decodedAccessToken?.id;

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
      return createErrors(res, 403, {
        message: "Forbidden",
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};
