import { Request, Response, NextFunction } from "express";
import Hash from "../modules/hash";
import ModuleJwt from "../modules/jwt";
import { createResponse } from "../helpers/response";
import { createErrors } from "../helpers/error";
const { User } = require("../db/models");

class UsersController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      // upload foto
      // use multer to upload foto

      const { email, password, role, name, address } =
        req.body;

      const findUser = await User.findOne({
        where: { email: email },
        attributes: ["id"],
      });

      // user already exist
      if (findUser) {
        return createErrors(res, 400, {
          message: "Invalid authentication",
        });
      }

      const hashedPassword = await Hash.hashing(password);

      await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || "user",
        address,
      });

      return createResponse(res, 200, {
        message: "User created",
      });
    } catch (err) {
      next(err);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: { email: email },
      });

      if (!user) {
        return createErrors(res, 400, {
          message: "Invalid authentication",
        });
      }

      const isMatched = await Hash.compare(
        password,
        user.password,
      );

      if (!isMatched) {
        return createErrors(res, 400, {
          message: "Invalid authentication",
        });
      }

      const accessToken = ModuleJwt.signToken(user.id);

      const refreshToken = ModuleJwt.signRefreshToken(
        user.id,
      );

      user.refresh_token = refreshToken;
      await user.save();
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return createResponse(res, 200, {
        accessToken: accessToken,
      });
    } catch (err) {
      next(err);
    }
  }

  public async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const refreshToken = req?.cookies?.jwt;

      if (!refreshToken) {
        return createErrors(res, 401, {
          message: "Unauthorized",
        });
      }

      // find the user
      const user = await User.findOne({
        where: {
          refresh_token: refreshToken,
        },
      });

      // detected reuse or hack
      if (!user) {
        return createErrors(res, 403, {
          message: "Forbidden",
        });
      }

      const decodedRefreshToken =
        ModuleJwt.verifyRefreshToken(refreshToken);

      // detected reuse or hack
      if (decodedRefreshToken.id !== user.id) {
        return createErrors(res, 403, {
          message: "Forbidden",
        });
      }

      // issue new acces token
      const newAccessToken = ModuleJwt.signToken(
        decodedRefreshToken.id,
      );

      return createResponse(res, 200, {
        accessToken: newAccessToken,
      });
    } catch (err) {
      next(err);
    }
  }

  public async currentUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const userId = res.locals.userId;
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });

      // user not found
      if (!user) {
        return createErrors(res, 404, {
          message: "Not found",
        });
      }

      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      };

      return createResponse(res, 200, {
        user: userData,
      });
    } catch (err) {
      next(err);
    }
  }

  public async logout(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const refreshToken = req?.cookies?.jwt;

      if (!refreshToken) {
        return res
          .status(200)
          .json({ message: "User logged out" });
      }

      const user = await User.findOne({
        where: {
          refresh_token: refreshToken,
        },
      });

      // detected hack
      if (!user) {
        res.clearCookie("jwt");
        return createResponse(res, 200, {
          message: "User logged out",
        });
      }

      // delete token in jwt
      res.clearCookie("jwt");

      // delete refresh token in db
      user.refresh_token = null;
      user.save();

      return createResponse(res, 200, {
        message: "User logged out",
      });
    } catch (err) {
      next(err);
    }
  }
}

export const usersController = new UsersController();
