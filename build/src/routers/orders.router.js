"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRouter = void 0;
const express_1 = require("express");
const orders_controller_1 = require("../controllers/orders.controller");
const orders_validator_1 = require("../middlewares/orders.validator");
exports.ordersRouter = (0, express_1.Router)();
exports.ordersRouter.get("/", orders_validator_1.getValidator, orders_controller_1.orderController.index);
exports.ordersRouter.post("/", orders_validator_1.createValidator, orders_controller_1.orderController.create);
exports.ordersRouter.get("/:id", 
// getValidator,
orders_controller_1.orderController.show);
exports.ordersRouter.delete("/:id", orders_controller_1.orderController.delete);
