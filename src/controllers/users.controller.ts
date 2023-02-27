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

      const hashedRole = await Authentication.hashing(
        user.role,
      );

      const accessToken = Authentication.generateToken(
        user.id,
        hashedRole,
      );

      const refreshToken =
        Authentication.generateRefreshToken(
          user.id,
          hashedRole,
        );

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

      const hashedRole = await Authentication.hashing(
        user.role,
      );

      const accessToken = Authentication.generateToken(
        user.id,
        hashedRole,
      );

      const refreshToken =
        Authentication.generateRefreshToken(
          user.id,
          hashedRole,
        );

      user.access_token = refreshToken;
      await user.save();
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return response(res, 200, {
        _id: user.id,
        name: user.name,
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
        return errors(res, 401, {
          message: "Unauthorized",
        });
      }

      const decodedToken =
        Authentication.extractRefreshToken(refreshToken);

      if (!decodedToken) {
        return errors(res, 401, {
          message: "Unauthorized",
        });
      }

      const newToken = Authentication.generateToken(
        decodedToken.user.id,
        decodedToken.user.role,
      );

      return response(res, 200, {
        _id: decodedToken.user.id,
        name: decodedToken.user.name,
        access_token: newToken,
      });
    } catch (err) {
      next(err);
    }
  }
}

export const usersController = new UsersController();
