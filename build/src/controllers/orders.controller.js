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
const { Order, Order_item, Product, User } = require("../db/models");
class OrdersController {
    index(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield Order.findAll({
                    attributes: ["id", "user_id", "total"],
                });
                return (0, response_helper_1.response)(res, 200, orders);
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
                        message: "user not exist",
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
                //_create order items
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
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.send("show endpoint");
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.send("update endpoint");
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.send("delete endpoint");
        });
    }
}
exports.orderController = new OrdersController();
