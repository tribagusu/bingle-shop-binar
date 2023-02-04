"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const response = (res, code, data) => {
    return res.status(code).json({
        status: true,
        code: code,
        data: data,
    });
};
exports.response = response;
