import { Request, Response, NextFunction } from "express"
import { Authentication } from "../utils/authentication"
import { response } from "../helpers/response.helper"
import { errors } from "../helpers/error.helper"
const { User } = require("../db/models")

class UsersController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { email, password, role, name, address } = req.body

      const findUser = await User.findOne({
        where: { email: email },
        attributes: ["id"],
      })

      if (findUser) {
        return errors(res, 400, {
          message: "user already exist",
        })
      }

      const hashedPassword = await Authentication.passwordHash(password)

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        address,
      })

      const accessToken = Authentication.generateToken(user.id)

      return response(res, 200, {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
        token: accessToken,
      })
    } catch (err) {
      next(err)
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: { email: email },
      })

      if (!user) {
        return errors(res, 400, {
          message: "user not exist",
        })
      }

      const compare = await Authentication.passwordCompare(
        password,
        user.password
      )

      if (compare) {
        const accessToken = Authentication.generateToken(user.id)
        return response(res, 200, {
          _id: user.id,
          name: user.name,
          token: accessToken,
        })
      }

      return errors(res, 400, {
        message: "Invalid authentication",
      })
    } catch (err) {
      next(err)
    }
  }
}

export const usersController = new UsersController()
