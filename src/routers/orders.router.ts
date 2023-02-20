import { Router } from "express";
import { authorization } from "../middlewares/authorization";
import { orderController } from "../controllers/orders.controller";
import { getValidator, createValidator } from "../middlewares/orders.validator";

export const ordersRouter: Router = Router();

ordersRouter.get("/", getValidator, orderController.index);
ordersRouter.post("/", createValidator, orderController.create);
ordersRouter.get("/:id", getValidator, orderController.show);
ordersRouter.delete("/:id", orderController.delete);
