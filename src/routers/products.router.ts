import { Router } from "express"
import { authorization } from "../middlewares/authorization"
import {
  createValidator,
  updateValidator,
} from "../middlewares/products.validator"
import { productController } from "../controllers/products.controller"

export const productsRouter: Router = Router()

productsRouter.get("/products", productController.index)
productsRouter.post(
  "/products",
  authorization,
  createValidator,
  productController.create
)
productsRouter.get("/products/:id", productController.show)
productsRouter.put(
  "/products/:id",
  authorization,
  updateValidator,
  productController.update
)
productsRouter.delete("/products/:id", authorization, productController.delete)
