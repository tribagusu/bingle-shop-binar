"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const response_helper_1 = require("../helpers/response.helper");
const error_helper_1 = require("../helpers/error.helper");
const { Order, Order_item, Product, User, } = require("../db/models");
class OrdersController {
    index(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = req.body;
                const findOrders = yield Order.findAll({
                    where: { user_id },
                    attributes: ["id", "status", "total", "user_id"],
                });
                if (findOrders.length === 0) {
                    return (0, error_helper_1.errors)(res, 400, {
                        message: "order not found",
                    });
                }
                return (0, response_helper_1.response)(res, 200, { orders: findOrders });
            }
            catch (err) {
                next(err);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id, cart } = req.body;
                // check if user true
                const isUser = yield User.findOne({
                    where: { id: user_id },
                    attributes: ["id"],
                });
                if (!isUser) {
                    return (0, error_helper_1.errors)(res, 400, {
                        message: "Unauthorized",
                    });
                }
                // find total price
                let totalPrice = 0;
                for (let i = 0; i < cart.length; i++) {
                    const product = yield Product.findOne({
                        where: { id: cart[i].product_id },
                    });
                    totalPrice += product.price * cart[i].quantity;
                }
                // create order
                yield Order.create({
                    user_id: user_id,
                    status: "pending",
                    total: totalPrice,
                });
                // find order id from the order created
                const isOrder = yield Order.findOne({
                    where: {
                        user_id: user_id,
                    },
                });
                // create order items
                let orderItems = [];
                for (let i = 0; i < cart.length; i++) {
                    const product = yield Product.findOne({
                        where: { id: cart[i].product_id },
                    });
                    const createOrderItems = yield Order_item.create({
                        order_id: isOrder.id,
                        product_id: cart[i].product_id,
                        quantity: cart[i].quantity,
                        price: product.price,
                    });
                    orderItems.push(createOrderItems);
                }
                // create order response
                const order = {
                    user_id: user_id,
                    status: "pending",
                    total: totalPrice,
                    order_items: orderItems,
                };
                return (0, response_helper_1.response)(res, 200, {
                    order,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    show(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { user_id } = req.body;
                // find order
                const findOrder = yield Order.findOne({
                    where: { id },
                    include: [
                        {
                            model: Order_item,
                            as: "order_items",
                            attributes: ["id", "quantity", "price"],
                        },
                    ],
                    attributes: ["id", "user_id", "status", "total"],
                });
                if (!id) {
                    return (0, error_helper_1.errors)(res, 400, {
                        message: "order not found",
                    });
                }
                // check if user authorized
                // if (user_id !== findOrder.user_id) {
                //   return errors(res, 400, { message: "user not authorized" });
                // }
                return (0, response_helper_1.response)(res, 200, { order: findOrder });
            }
            catch (err) {
                next(err);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { user_id } = req.body;
                // find order
                const isOrder = yield Order.findByPk(id);
                if (!isOrder) {
                    return (0, error_helper_1.errors)(res, 400, {
                        message: "order not found",
                    });
                }
                // check if user authorized
                if (user_id !== isOrder.user_id) {
                    return (0, error_helper_1.errors)(res, 400, {
                        message: "Unauthorized",
                    });
                }
                // udpate order
                yield Order.update({
                    status: "paid",
                }, { where: { id } });
                return (0, response_helper_1.response)(res, 200, {
                    message: "status updated",
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // find orders
                const order = yield Order.findByPk(id);
                if (!order) {
                    return (0, error_helper_1.errors)(res, 400, {
                        message: "order not found",
                    });
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.orderController = new OrdersController();