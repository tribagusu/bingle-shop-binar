"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidator = exports.createValidator = void 0;
const express_validator_1 = require("express-validator");
const error_1 = require("../helpers/error");
exports.createValidator = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is mandatory"),
    (0, express_validator_1.body)("sku").notEmpty().withMessage("Sku is mandatory"),
    (req, res, next) => {
        (0, error_1.errorValidator)(req, res, next);
    },
];
exports.updateValidator = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is mandatory"),
    (0, express_validator_1.body)("price")
        .notEmpty()
        .withMessage("Price is mandatory"),
    (0, express_validator_1.body)("stock")
        .notEmpty()
        .withMessage("Stock is mandatory"),
    (0, express_validator_1.body)("sku").notEmpty().withMessage("Sku is mandatory"),
    (req, res, next) => {
        (0, error_1.errorValidator)(req, res, next);
    },
];
