import { Request, Response, NextFunction } from "express"
import { response } from "../helpers/response.helper"
import { errors } from "../helpers/error.helper"
const { Product } = require("../db/models")

class ProductsController {
  public async index(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const { page, limit } = req.query
    const pageInt = Number(page)
    const limitInt = Number(limit)
    const offset = (pageInt - 1) * limitInt

    const paging = {
      size: "",
      total: "",
      totalPages: "",
      current: "",
    }

    try {
      const products = await Product.findAll({
        attributes: ["id", "name", "price", "stock", "sku"],
        // limit: limitInt,
        // offset: offset,
      })

      return response(res, 200, products)
    } catch (err) {
      next(err)
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { sku } = req.body

      const findProduct = await Product.findOne({
        where: { sku },
        attributes: ["sku"],
      })

      if (findProduct) {
        return errors(res, 400, {
          message: "product already exist",
        })
      }

      const product = await Product.create(req.body)

      return response(res, 200, product)
    } catch (err) {
      next(err)
    }
  }

  public async show(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id } = req.params
      const product = await Product.findByPk(id)
      if (!product) {
        return errors(res, 400, {
          message: "product does not exist",
        })
      }

      return response(res, 200, product)
    } catch (err) {
      next(err)
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id } = req.params
      const findProduct = await Product.findByPk(id)
      if (!findProduct) {
        return errors(res, 400, {
          message: "product does not exist",
        })
      }

      const product = await Product.update(req.body, { where: { id } })

      return response(res, 200, product)
    } catch (err) {
      next(err)
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id } = req.params
      const findProduct = await Product.findByPk(id)
      if (!findProduct) {
        return errors(res, 400, {
          message: "product does not exist",
        })
      }

      const product = await Product.destroy({
        where: { id },
      })

      return response(res, 200, product)
    } catch (err) {
      next(err)
    }
  }
}

export const productController = new ProductsController()
