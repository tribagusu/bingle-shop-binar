"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogging = void 0;
const winston_1 = require("../config/winston");
const requestLogging = (req, res, next) => {
    const logs = {
        headers: req.headers,
        body: req.body,
        params: req.params,
    };
    winston_1.logger.info(JSON.stringify(logs));
    next();
};
exports.requestLogging = requestLogging;
