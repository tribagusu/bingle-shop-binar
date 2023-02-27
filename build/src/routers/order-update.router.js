"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderUpdateRouter = void 0;
const express_1 = require("express");
const orders_controller_1 = require("../controllers/orders.controller");
const orders_validator_1 = require("../middlewares/orders.validator");
exports.orderUpdateRouter = (0, express_1.Router)();
exports.orderUpdateRouter.put("/:id", orders_validator_1.updateValidator, orders_controller_1.orderController.update);
