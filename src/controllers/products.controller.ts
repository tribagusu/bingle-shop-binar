import { Request, Response, NextFunction } from "express";
import { createResponse } from "../helpers/response";
import { createErrors } from "../helpers/error";
const { Product } = require("../db/models");

class ProductsController {
  public async index(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    const { page, limit } = req.query;
    const pageInt = Number(page);
    const limitInt = Number(limit);
    const offset = (pageInt - 1) * limitInt;

    const paging = {
      size: "",
      total: "",
      totalPages: "",
      current: "",
    };

    try {
      const products = await Product.findAll({
        attributes: ["id", "name", "price", "stock", "sku"],
        // limit: limitInt,
        // offset: offset,
      });

      return createResponse(res, 200, { products });
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
      const { sku } = req.body;

      // check if product already exist
      const findProduct = await Product.findOne({
        where: { sku },
        attributes: ["sku"],
      });
      if (findProduct) {
        return createErrors(res, 400, {
          message: "product already exist",
        });
      }

      // create product
      const product = await Product.create(req.body);

      return createResponse(res, 200, { product });
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

      const product = await Product.findByPk(id);

      // check if product exist
      if (!product) {
        return createErrors(res, 400, {
          message: "product does not exist",
        });
      }

      return createResponse(res, 200, { product });
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

      // find product
      const findProduct = await Product.findByPk(id);

      // check if product exist
      if (!findProduct) {
        return createErrors(res, 400, {
          message: "product does not exist",
        });
      }

      // update product
      const product = await Product.update(req.body, {
        where: { id },
      });

      return createResponse(res, 200, { product });
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

      // find product
      const findProduct = await Product.findByPk(id);

      // check if product exist
      if (!findProduct) {
        return createErrors(res, 400, {
          message: "product does not exist",
        });
      }

      // delete product
      await Product.destroy({
        where: { id },
      });

      return createResponse(res, 200, {
        message: "product deleted",
      });
    } catch (err) {
      next(err);
    }
  }
}

export const productController = new ProductsController();
