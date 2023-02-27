import { Request, Response, NextFunction } from "express";
import { response } from "../helpers/response.helper";
import { errors } from "../helpers/error.helper";
const {
  Order,
  Order_item,
  Product,
  User,
} = require("../db/models");

class OrdersController {
  public async index(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { user_id } = req.body;

      const findOrders = await Order.findAll({
        where: { user_id },
        attributes: ["id", "status", "total", "user_id"],
      });

      if (findOrders.length === 0) {
        return errors(res, 400, {
          message: "order not found",
        });
      }

      return response(res, 200, { orders: findOrders });
    } catch (err) {
      next(err);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
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
          message: "Unauthorized",
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

      // create order items
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

  public async show(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const { user_id } = req.body;

      // find order
      const findOrder = await Order.findOne({
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
        return errors(res, 400, {
          message: "order not found",
        });
      }

      // check if user authorized
      // if (user_id !== findOrder.user_id) {
      //   return errors(res, 400, { message: "user not authorized" });
      // }

      return response(res, 200, { order: findOrder });
    } catch (err) {
      next(err);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const { user_id } = req.body;

      // find order
      const isOrder = await Order.findByPk(id);
      if (!isOrder) {
        return errors(res, 400, {
          message: "order not found",
        });
      }

      // check if user authorized
      if (user_id !== isOrder.user_id) {
        return errors(res, 400, {
          message: "Unauthorized",
        });
      }

      // udpate order
      await Order.update(
        {
          status: "paid",
        },
        { where: { id } },
      );

      return response(res, 200, {
        message: "status updated",
      });
    } catch (err) {
      next(err);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { id } = req.params;

      // find orders
      const order = await Order.findByPk(id);
      if (!order) {
        return errors(res, 400, {
          message: "order not found",
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

export const orderController = new OrdersController();
