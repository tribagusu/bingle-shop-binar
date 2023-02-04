import { Router } from "express";
import { authorization } from "../middlewares/authorization";
import { orderController } from "../controllers/orders.controller";
import { getValidator, createValidator } from "../middlewares/orders.validator";

export const ordersRouter: Router = Router();

ordersRouter.get("/orders", getValidator, orderController.index);
ordersRouter.post("/orders", createValidator, orderController.create);
ordersRouter.get("/orders/:id", getValidator, orderController.show);
ordersRouter.delete("/orders/:id", orderController.delete);
