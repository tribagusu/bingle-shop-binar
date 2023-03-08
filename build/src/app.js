"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const products_router_1 = require("./routers/products.router");
const users_router_1 = require("./routers/users.router");
const orders_router_1 = require("./routers/orders.router");
const order_update_router_1 = require("./routers/order-update.router");
const logger_1 = require("./middlewares/logger");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)());
exports.app.use(logger_1.requestLogging);
exports.app.use("/api/v1/users", users_router_1.usersRouter);
exports.app.use("/api/v1/products", products_router_1.productsRouter);
exports.app.use("/api/v1/orders", orders_router_1.ordersRouter);
exports.app.use("/api/v1/order-update", order_update_router_1.orderUpdateRouter);
exports.app.use("/uploads", express_1.default.static("uploads"));
exports.app.use((err, req, res, next) => {
    console.log(err);
    return res.status(err.status).json({
        status: false,
        data: {},
        error: err.error,
    });
});
