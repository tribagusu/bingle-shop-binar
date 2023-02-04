"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errors = void 0;
const errors = (res, code, errors) => {
    return res.status(code).json({
        status: false,
        code: code,
        errors: errors,
    });
};
exports.errors = errors;
