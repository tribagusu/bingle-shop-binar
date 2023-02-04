import { Router } from "express";
import { updateOrderController } from "../controllers/update-order.controller";

export const updateOrderRouter: Router = Router();

updateOrderRouter.put("/update-order/:id", updateOrderController.update);
