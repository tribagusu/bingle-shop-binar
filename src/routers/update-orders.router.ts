import { Router } from "express";
import { authorization } from "../middlewares/authorization";
import { updateOrderController } from "../controllers/update-order.controller";

export const orderItemsRouter: Router = Router();

orderItemsRouter.post(
  "/orderItems",
  authorization,
  updateOrderController.create
);
