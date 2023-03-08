"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const products_validator_1 = require("../middlewares/products.validator");
const products_controller_1 = require("../controllers/products.controller");
const authorization_1 = require("../middlewares/authorization");
exports.productsRouter = (0, express_1.Router)();
exports.productsRouter.get("/", 
// authenticated,
// adminRole,
products_controller_1.productController.index);
exports.productsRouter.post("/", products_validator_1.createValidator, authorization_1.authenticated, authorization_1.adminRole, products_controller_1.productController.create);
exports.productsRouter.get("/:id", authorization_1.authenticated, products_controller_1.productController.show);
exports.productsRouter.put("/:id", products_validator_1.updateValidator, authorization_1.authenticated, authorization_1.adminRole, products_controller_1.productController.update);
exports.productsRouter.delete("/:id", authorization_1.authenticated, authorization_1.adminRole, products_controller_1.productController.delete);
