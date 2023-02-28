import { Request, Response, NextFunction } from "express";
import { Authentication } from "../utils/authentication";
import { response } from "../helpers/response.helper";
import { errors } from "../helpers/error.helper";
const { User } = require("../db/models");

class UsersController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { email, password, role, name, address } =
        req.body;

      const findUser = await User.findOne({
        where: { email: email },
        attributes: ["id"],
      });

      // user already exist
      if (findUser) {
        return errors(res, 400, {
          message: "Invalid authentication",
        });
      }

      const hashedPassword = await Authentication.hashing(
        password,
      );

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || "user",
        address,
      });

      const accessToken = Authentication.generateToken(
        user.id,
      );

      const refreshToken =
        Authentication.generateRefreshToken(user.id);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return response(res, 200, {
        _id: user.id,
        access_token: accessToken,
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
        return errors(res, 400, {
          message: "Invalid authentication",
        });
      }

      const isMatched = await Authentication.hashCompare(
        password,
        user.password,
      );

      if (!isMatched) {
        return errors(res, 400, {
          message: "Invalid authentication",
        });
      }

      const accessToken = Authentication.generateToken(
        user.id,
      );

      const refreshToken =
        Authentication.generateRefreshToken(user.id);

      user.access_token = refreshToken;
      await user.save();
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return response(res, 200, {
        _id: user.id,
        access_token: accessToken,
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
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        return errors(res, 403, {
          message: "Unauthorized",
        });
      }

      const decodedRefreshToken =
        Authentication.extractRefreshToken(refreshToken);

      if (!decodedRefreshToken) {
        return errors(res, 403, {
          message: "Unauthorized",
        });
      }

      const newToken = Authentication.generateToken(
        decodedRefreshToken.id,
      );

      return response(res, 200, {
        access_token: newToken,
      });
    } catch (err) {
      next(err);
    }
  }

  public async userDetail(
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
        return errors(res, 404, {
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

      return response(res, 200, {
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
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        return res
          .status(200)
          .json({ message: "User logged out" });
      }

      const userId = res.locals.userId;
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        res.clearCookie("refreshToken");
        return response(res, 200, {
          message: "User logged out",
        });
      }

      await User.update(
        { access_token: null },
        { where: { id: user.id } },
      );

      res.clearCookie("refreshToken");

      return response(res, 200, {
        message: "User logged out",
      });
    } catch (err) {
      next(err);
    }
  }
}

export const usersController = new UsersController();
