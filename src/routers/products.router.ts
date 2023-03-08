import { Router } from "express";
import {
  createValidator,
  updateValidator,
} from "../middlewares/products.validator";
import { productController } from "../controllers/products.controller";
import {
  authenticated,
  adminRole,
} from "../middlewares/authorization";

export const productsRouter: Router = Router();

productsRouter.get(
  "/",
  // authenticated,
  // adminRole,
  productController.index,
);
productsRouter.post(
  "/",
  createValidator,
  authenticated,
  adminRole,
  productController.create,
);
productsRouter.get(
  "/:id",
  authenticated,
  productController.show,
);
productsRouter.put(
  "/:id",
  updateValidator,
  authenticated,
  adminRole,
  productController.update,
);
productsRouter.delete(
  "/:id",
  authenticated,
  adminRole,
  productController.delete,
);
