import { Router } from "express";
import { orderController } from "../controllers/orders.controller";
import {
  getValidator,
  createValidator,
} from "../middlewares/orders.validator";
import {
  authenticated,
  adminRole,
} from "../middlewares/authorization";

export const ordersRouter: Router = Router();

ordersRouter.get(
  "/",
  getValidator,
  authenticated,
  orderController.index,
);
ordersRouter.post(
  "/",
  createValidator,
  authenticated,
  orderController.create,
);
ordersRouter.get(
  "/:id",
  authenticated,
  orderController.show,
);
ordersRouter.delete(
  "/:id",
  authenticated,
  orderController.delete,
);
