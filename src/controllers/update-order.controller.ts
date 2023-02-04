import { Request, Response, NextFunction } from "express";
import { response } from "../helpers/response.helper";
import { errors } from "../helpers/error.helper";
const { Order } = require("../db/models");

class UpdateOrderController {
  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const { user_id } = req.body;

      // find order
      const isOrder = await Order.findByPk(id);
      if (!isOrder) {
        return errors(res, 400, { message: "order not found" });
      }

      // check if user authorized
      if (user_id !== isOrder.user_id) {
        return errors(res, 400, {
          message: "user not authorized",
        });
      }

      // udpate order
      await Order.update(
        {
          status: "paid",
        },
        { where: { id } }
      );

      return response(res, 200, { message: "status updated" });
    } catch (err) {
      next(err);
    }
  }
}

export const updateOrderController = new UpdateOrderController();
