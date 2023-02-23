"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidator = exports.createValidator = exports.getValidator = void 0;
const express_validator_1 = require("express-validator");
const error_helper_1 = require("../helpers/error.helper");
exports.getValidator = [
    (0, express_validator_1.body)("user_id").notEmpty().withMessage("user_id is mandatory"),
    (req, res, next) => {
        (0, error_helper_1.errorValidation)(req, res, next);
    },
];
exports.createValidator = [
    (0, express_validator_1.body)("user_id").notEmpty().withMessage("user id is mandatory"),
    (0, express_validator_1.body)("cart")
        .notEmpty()
        .withMessage("cart is mandatory")
        .isArray()
        .withMessage("cart should be valid array of object contains 'product_id' & 'quantity'"),
    (req, res, next) => {
        (0, error_helper_1.errorValidation)(req, res, next);
    },
];
exports.updateValidator = [
    (0, express_validator_1.body)("user_id").notEmpty().withMessage("user_id is mandatory"),
    (req, res, next) => {
        (0, error_helper_1.errorValidation)(req, res, next);
    },
];
