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
exports.productController = void 0;
const response_helper_1 = require("../helpers/response.helper");
const error_helper_1 = require("../helpers/error.helper");
const { Product } = require("../db/models");
class ProductsController {
    index(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const products = yield Product.findAll({
                    attributes: ["id", "name", "price", "stock", "sku"],
                    // limit: limitInt,
                    // offset: offset,
                });
                return (0, response_helper_1.response)(res, 200, products);
            }
            catch (err) {
                next(err);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { sku } = req.body;
                const findProduct = yield Product.findOne({
                    where: { sku },
                    attributes: ["sku"],
                });
                if (findProduct) {
                    return (0, error_helper_1.errors)(res, 400, {
                        message: "product already exist",
                    });
                }
                const product = yield Product.create(req.body);
                return (0, response_helper_1.response)(res, 200, product);
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
                const product = yield Product.findByPk(id);
                if (!product) {
                    return (0, error_helper_1.errors)(res, 400, {
                        message: "product does not exist",
                    });
                }
                return (0, response_helper_1.response)(res, 200, product);
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
                const findProduct = yield Product.findByPk(id);
                if (!findProduct) {
                    return (0, error_helper_1.errors)(res, 400, {
                        message: "product does not exist",
                    });
                }
                const product = yield Product.update(req.body, { where: { id } });
                return (0, response_helper_1.response)(res, 200, product);
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
                const findProduct = yield Product.findByPk(id);
                if (!findProduct) {
                    return (0, error_helper_1.errors)(res, 400, {
                        message: "product does not exist",
                    });
                }
                const product = yield Product.destroy({
                    where: { id },
                });
                return (0, response_helper_1.response)(res, 200, product);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.productController = new ProductsController();
