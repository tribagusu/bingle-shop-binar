"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_helper_1 = require("../helpers/error.helper");
const authorization = (req, res, next) => {
    if (!req.headers.authorization) {
        return (0, error_helper_1.errors)(res, 401, { message: "not authorized" });
    }
    const secretKey = process.env.JWT_SECRET_KEY || "secret";
    const token = req.headers.authorization.split(" ")[1];
    try {
        const credential = jsonwebtoken_1.default.verify(token, secretKey);
        if (credential) {
            // req.app.locals.credential = credential;
            // console.log(credential);
            next();
        }
        else {
            return (0, error_helper_1.errors)(res, 400, { message: "token invalid" });
        }
    }
    catch (error) {
        res.send(error);
    }
};
exports.authorization = authorization;
