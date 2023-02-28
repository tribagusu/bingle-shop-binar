import { Router } from "express";
import { orderController } from "../controllers/orders.controller";
import { updateValidator } from "../middlewares/orders.validator";
import { authenticated } from "../middlewares/authorization";

export const orderUpdateRouter: Router = Router();

orderUpdateRouter.put(
  "/:id",
  updateValidator,
  authenticated,
  orderController.update,
);
