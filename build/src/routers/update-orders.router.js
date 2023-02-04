"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderItemsRouter = void 0;
const express_1 = require("express");
const authorization_1 = require("../middlewares/authorization");
const update_order_controller_1 = require("../controllers/update-order.controller");
exports.orderItemsRouter = (0, express_1.Router)();
exports.orderItemsRouter.post("/orderItems", authorization_1.authorization, update_order_controller_1.updateOrderController.create);
