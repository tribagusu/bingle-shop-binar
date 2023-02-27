import { Router } from "express";
import { orderController } from "../controllers/orders.controller";
import { updateValidator } from "../middlewares/orders.validator";

export const orderUpdateRouter: Router = Router();

orderUpdateRouter.put(
  "/:id",
  updateValidator,
  orderController.update,
);
