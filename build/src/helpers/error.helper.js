"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorValidation = exports.errors = void 0;
const express_validator_1 = require("express-validator");
const errors = (res, code, errors) => {
    return res.status(code).json({
        status: false,
        code: code,
        errors: errors,
    });
};
exports.errors = errors;
const errorValidation = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }
    next();
};
exports.errorValidation = errorValidation;
