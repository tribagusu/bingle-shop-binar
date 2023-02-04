import { Router } from "express"
import { usersController } from "../controllers/users.controller"
import {
  registerValidator,
  loginValidator,
} from "../middlewares/users.validator"

export const usersRouter: Router = Router()

usersRouter.post("/register", registerValidator, usersController.register)
usersRouter.post("/login", loginValidator, usersController.login)
