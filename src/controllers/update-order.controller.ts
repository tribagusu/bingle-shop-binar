import { Request, Response, NextFunction } from "express";
import { response } from "../helpers/response.helper";
const { Order_item, Product } = require("../db/models");

class UpdateOrderController {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { cart, order_id } = req.body;

      // create order items

      return response(res, 200, {});
    } catch (err) {
      next(err);
    }
  }
}

export const updateOrderController = new UpdateOrderController();
