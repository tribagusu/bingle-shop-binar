"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticated = void 0;
const error_helper_1 = require("../helpers/error.helper");
const authentication_1 = require("../utils/authentication");
const authenticated = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return (0, error_helper_1.errors)(res, 401, { message: "Unauthorized" });
        }
        const accessToken = authentication_1.Authentication.extractToken(token);
        if (!accessToken) {
            return (0, error_helper_1.errors)(res, 401, { message: "Unauthorized" });
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authenticated = authenticated;
