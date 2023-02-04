import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { errors } from "../helpers/error.helper"

export const authorization = (
  req: Request,
  res: Response,
  next: NextFunction
): unknown => {
  if (!req.headers.authorization) {
    return errors(res, 401, { message: "not authorized" })
  }

  const secretKey = process.env.JWT_SECRET_KEY || "secret"
  const token: string = req.headers.authorization.split(" ")[1]

  try {
    const credential: string | object = jwt.verify(token, secretKey)

    if (credential) {
      // req.app.locals.credential = credential;
      // console.log(credential);
      next()
    } else {
      return errors(res, 400, { message: "token invalid" })
    }
  } catch (error) {
    res.send(error)
  }
}
