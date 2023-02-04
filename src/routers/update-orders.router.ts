import { Router } from "express";
import { updateOrderController } from "../controllers/update-order.controller";
import { updateValidator } from "../middlewares/update-order.validator";

export const updateOrderRouter: Router = Router();

updateOrderRouter.put(
  "/update-order/:id",
  updateValidator,
  updateOrderController.update
);
