"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorValidation = void 0;
const express_validator_1 = require("express-validator");
const errorValidation = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }
    next();
};
exports.errorValidation = errorValidation;
