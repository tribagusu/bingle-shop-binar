import { Router } from "express";
import { usersController } from "../controllers/users.controller";
import {
  registerValidator,
  loginValidator,
} from "../middlewares/users.validator";
import { authenticated } from "../middlewares/authorization";

export const usersRouter: Router = Router();

usersRouter.post(
  "/register",
  registerValidator,
  usersController.register,
);
usersRouter.post(
  "/login",
  loginValidator,
  usersController.login,
);
usersRouter.get(
  "/refresh-token",
  usersController.refreshToken,
);
usersRouter.get(
  "/current-user",
  authenticated,
  usersController.currentUser,
);
usersRouter.get(
  "/logout",
  authenticated,
  usersController.logout,
);
