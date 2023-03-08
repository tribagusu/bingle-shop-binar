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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const hash_1 = __importDefault(require("../modules/hash"));
const jwt_1 = __importDefault(require("../modules/jwt"));
const response_1 = require("../helpers/response");
const error_1 = require("../helpers/error");
const { User } = require("../db/models");
class UsersController {
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // upload foto
                // use multer to upload foto
                const { email, password, role, name, address } = req.body;
                const findUser = yield User.findOne({
                    where: { email: email },
                    attributes: ["id"],
                });
                // user already exist
                if (findUser) {
                    return (0, error_1.createErrors)(res, 400, {
                        message: "Invalid authentication",
                    });
                }
                const hashedPassword = yield hash_1.default.hashing(password);
                yield User.create({
                    name,
                    email,
                    password: hashedPassword,
                    role: role || "user",
                    address,
                });
                return (0, response_1.createResponse)(res, 200, {
                    message: "User created",
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
                    return (0, error_1.createErrors)(res, 400, {
                        message: "Invalid authentication",
                    });
                }
                const isMatched = yield hash_1.default.compare(password, user.password);
                if (!isMatched) {
                    return (0, error_1.createErrors)(res, 400, {
                        message: "Invalid authentication",
                    });
                }
                const accessToken = jwt_1.default.signToken(user.id);
                const refreshToken = jwt_1.default.signRefreshToken(user.id);
                user.refresh_token = refreshToken;
                yield user.save();
                res.cookie("jwt", refreshToken, {
                    httpOnly: true,
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                });
                return (0, response_1.createResponse)(res, 200, {
                    accessToken: accessToken,
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
                const refreshToken = (_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.jwt;
                if (!refreshToken) {
                    return (0, error_1.createErrors)(res, 401, {
                        message: "Unauthorized",
                    });
                }
                // find the user
                const user = yield User.findOne({
                    where: {
                        refresh_token: refreshToken,
                    },
                });
                // detected reuse or hack
                if (!user) {
                    return (0, error_1.createErrors)(res, 403, {
                        message: "Forbidden",
                    });
                }
                const decodedRefreshToken = jwt_1.default.verifyRefreshToken(refreshToken);
                // detected reuse or hack
                if (decodedRefreshToken.id !== user.id) {
                    return (0, error_1.createErrors)(res, 403, {
                        message: "Forbidden",
                    });
                }
                // issue new acces token
                const newAccessToken = jwt_1.default.signToken(decodedRefreshToken.id);
                return (0, response_1.createResponse)(res, 200, {
                    accessToken: newAccessToken,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    currentUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = res.locals.userId;
                const user = yield User.findOne({
                    where: {
                        id: userId,
                    },
                });
                // user not found
                if (!user) {
                    return (0, error_1.createErrors)(res, 404, {
                        message: "Not found",
                    });
                }
                const userData = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    address: user.address,
                };
                return (0, response_1.createResponse)(res, 200, {
                    user: userData,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    logout(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = (_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.jwt;
                if (!refreshToken) {
                    return res
                        .status(200)
                        .json({ message: "User logged out" });
                }
                const user = yield User.findOne({
                    where: {
                        refresh_token: refreshToken,
                    },
                });
                // detected hack
                if (!user) {
                    res.clearCookie("jwt");
                    return (0, response_1.createResponse)(res, 200, {
                        message: "User logged out",
                    });
                }
                // delete token in jwt
                res.clearCookie("jwt");
                // delete refresh token in db
                user.refresh_token = null;
                user.save();
                return (0, response_1.createResponse)(res, 200, {
                    message: "User logged out",
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.usersController = new UsersController();
