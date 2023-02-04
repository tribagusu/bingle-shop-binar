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
                if (findUser) {
                    return (0, error_helper_1.errors)(res, 400, {
                        message: "user already exist",
                    });
                }
                const hashedPassword = yield authentication_1.Authentication.passwordHash(password);
                const user = yield User.create({
                    name,
                    email,
                    password: hashedPassword,
                    role,
                    address,
                });
                const accessToken = authentication_1.Authentication.generateToken(user.id);
                return (0, response_helper_1.response)(res, 200, {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    address: user.address,
                    token: accessToken,
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
                        message: "user not exist",
                    });
                }
                const compare = yield authentication_1.Authentication.passwordCompare(password, user.password);
                if (compare) {
                    const accessToken = authentication_1.Authentication.generateToken(user.id);
                    return (0, response_helper_1.response)(res, 200, {
                        _id: user.id,
                        name: user.name,
                        token: accessToken,
                    });
                }
                return (0, error_helper_1.errors)(res, 400, {
                    message: "Invalid authentication",
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.usersController = new UsersController();
