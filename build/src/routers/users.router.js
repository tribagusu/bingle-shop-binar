"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const users_validator_1 = require("../middlewares/users.validator");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.post("/register", users_validator_1.registerValidator, users_controller_1.usersController.register);
exports.usersRouter.post("/login", users_validator_1.loginValidator, users_controller_1.usersController.login);
