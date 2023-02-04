import { Router } from "express";
import { authorization } from "../middlewares/authorization";
import { orderController } from "../controllers/orders.controller";
import { createValidator } from "../middlewares/orders.validator";

export const ordersRouter: Router = Router();

ordersRouter.get("/orders", authorization, orderController.index);
ordersRouter.post("/orders", createValidator, orderController.create);
ordersRouter.get("/orders/:id", orderController.show);
ordersRouter.put("/orders/:id", orderController.update);
ordersRouter.delete("/orders/:id", orderController.delete);
