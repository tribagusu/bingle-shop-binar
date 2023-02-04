import { Request, Response, NextFunction } from "express";
import { response } from "../helpers/response.helper";
import { errors } from "../helpers/error.helper";
const { Order, Order_item, Product, User } = require("../db/models");

class OrdersController {
  public async index(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const orders = await Order.findAll({
        attributes: ["id", "user_id", "total"],
      });

      return response(res, 200, orders);
    } catch (err) {
      next(err);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { user_id, cart } = req.body;
      // check if user true
      const isUser = await User.findOne({
        where: { id: user_id },
        attributes: ["id"],
      });

      if (!isUser) {
        return errors(res, 400, {
          message: "user not exist",
        });
      }

      // find total price
      let totalPrice = 0;
      for (let i = 0; i < cart.length; i++) {
        const product = await Product.findOne({
          where: { id: cart[i].product_id },
        });
        totalPrice += product.price * cart[i].quantity;
      }

      // create order
      await Order.create({
        user_id: user_id,
        status: "pending",
        total: totalPrice,
      });

      // find order id from the order created
      const isOrder = await Order.findOne({
        where: {
          user_id: user_id,
        },
      });

      //_create order items
      let orderItems = [];
      for (let i = 0; i < cart.length; i++) {
        const product = await Product.findOne({
          where: { id: cart[i].product_id },
        });
        const createOrderItems = await Order_item.create({
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

      return response(res, 200, {
        order,
      });
    } catch (err) {
      next(err);
    }
  }

  public async show(req: Request, res: Response): Promise<Response> {
    return res.send("show endpoint");
  }

  public async update(req: Request, res: Response): Promise<Response> {
    return res.send("update endpoint");
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    return res.send("delete endpoint");
  }
}

export const orderController = new OrdersController();
