import { Router } from "express";
import {
  createValidator,
  updateValidator,
} from "../middlewares/products.validator";
import { productController } from "../controllers/products.controller";
import { authenticated } from "../middlewares/authorization";

export const productsRouter: Router = Router();

productsRouter.get(
  "/",
  authenticated,
  productController.index,
);
productsRouter.post(
  "/",
  createValidator,
  authenticated,
  productController.create,
);
productsRouter.get("/:id", productController.show);
productsRouter.put(
  "/:id",
  updateValidator,
  productController.update,
);
productsRouter.delete("/:id", productController.delete);
