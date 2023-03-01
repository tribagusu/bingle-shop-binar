"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.registerValidator = void 0;
const express_validator_1 = require("express-validator");
const error_1 = require("../helpers/error");
exports.registerValidator = [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Email needs to be a valid email format"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6 })
        .withMessage("Password length must be at least 6 characters"),
    (req, res, next) => {
        (0, error_1.errorValidator)(req, res, next);
    },
];
exports.loginValidator = [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Email needs to be a valid email format"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6 })
        .withMessage("Password length must be at least 6 characters"),
    (req, res, next) => {
        (0, error_1.errorValidator)(req, res, next);
    },
];
