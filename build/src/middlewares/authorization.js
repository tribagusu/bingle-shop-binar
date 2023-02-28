"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRole = exports.authenticated = void 0;
const error_helper_1 = require("../helpers/error.helper");
const authentication_1 = require("../utils/authentication");
const { User } = require("../db/models");
const authenticated = (req, res, next) => {
    var _a;
    try {
        const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!accessToken) {
            return (0, error_helper_1.errors)(res, 401, { message: "Unauthorized" });
        }
        const decodedToken = authentication_1.Authentication.extractToken(accessToken);
        if (!decodedToken) {
            return (0, error_helper_1.errors)(res, 401, { message: "Unauthorized" });
        }
        res.locals.userId = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.id;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authenticated = authenticated;
const adminRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.userId;
        const user = yield User.findOne({
            where: { id: userId },
        });
        if (user.role !== "admin") {
            return (0, error_helper_1.errors)(res, 403, { message: "Forbidden" });
        }
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.adminRole = adminRole;
