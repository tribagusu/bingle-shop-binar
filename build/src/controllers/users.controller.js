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
exports.usersController = void 0;
const authentication_1 = require("../utils/authentication");
const response_helper_1 = require("../helpers/response.helper");
const error_helper_1 = require("../helpers/error.helper");
const { User } = require("../db/models");
class UsersController {
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, role, name, address } = req.body;
                const findUser = yield User.findOne({
                    where: { email: email },
                    attributes: ["id"],
                });
                // user already exist
                if (findUser) {
                    return (0, error_helper_1.errors)(res, 400, {
                        message: "Invalid authentication",
                    });
                }
                const hashedPassword = yield authentication_1.Authentication.hashing(password);
                const user = yield User.create({
                    name,
                    email,
                    password: hashedPassword,
                    role: role || "user",
                    address,
                });
                const hashedRole = yield authentication_1.Authentication.hashing(user.role);
                const accessToken = authentication_1.Authentication.generateToken(user.id, hashedRole);
                const refreshToken = authentication_1.Authentication.generateRefreshToken(user.id, hashedRole);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                });
                return (0, response_helper_1.response)(res, 200, {
                    _id: user.id,
                    access_token: accessToken,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield User.findOne({
                    where: { email: email },
                });
                if (!user) {
                    return (0, error_helper_1.errors)(res, 400, {
                        message: "Invalid authentication",
                    });
                }
                const isMatched = yield authentication_1.Authentication.hashCompare(password, user.password);
                if (!isMatched) {
                    return (0, error_helper_1.errors)(res, 400, {
                        message: "Invalid authentication",
                    });
                }
                const hashedRole = yield authentication_1.Authentication.hashing(user.role);
                const accessToken = authentication_1.Authentication.generateToken(user.id, hashedRole);
                const refreshToken = authentication_1.Authentication.generateRefreshToken(user.id, hashedRole);
                user.access_token = refreshToken;
                yield user.save();
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                });
                return (0, response_helper_1.response)(res, 200, {
                    _id: user.id,
                    name: user.name,
                    access_token: accessToken,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    refreshToken(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
                if (!refreshToken) {
                    return (0, error_helper_1.errors)(res, 401, {
                        message: "Unauthorized",
                    });
                }
                const decodedToken = authentication_1.Authentication.extractRefreshToken(refreshToken);
                if (!decodedToken) {
                    return (0, error_helper_1.errors)(res, 401, {
                        message: "Unauthorized",
                    });
                }
                const newToken = authentication_1.Authentication.generateToken(decodedToken.user.id, decodedToken.user.role);
                return (0, response_helper_1.response)(res, 200, {
                    _id: decodedToken.user.id,
                    name: decodedToken.user.name,
                    access_token: newToken,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.usersController = new UsersController();
