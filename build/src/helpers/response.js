"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponse = void 0;
const createResponse = (res, code, data) => {
    return res.status(code).json({
        status: true,
        code: code,
        data: data,
    });
};
exports.createResponse = createResponse;
