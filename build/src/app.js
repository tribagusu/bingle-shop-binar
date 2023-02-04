"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const products_router_1 = require("./routers/products.router");
const users_router_1 = require("./routers/users.router");
const orders_router_1 = require("./routers/orders.router");
// import { orderItemsRouter } from "./routers/order-items.router"
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.use("/api/v1", users_router_1.usersRouter);
exports.app.use("/api/v1", products_router_1.productsRouter);
exports.app.use("/api/v1", orders_router_1.ordersRouter);
// app.use("/api/v1", orderItemsRouter)
exports.app.use((err, req, res, next) => {
    console.log(err);
    return res.status(err.status).json({
        status: false,
        data: {},
        error: err.error,
    });
});
