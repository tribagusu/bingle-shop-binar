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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Authentication {
}
exports.Authentication = Authentication;
_a = Authentication;
Authentication.passwordHash = (password) => {
    return bcrypt_1.default.hash(password, 10);
};
Authentication.passwordCompare = (text, encryptedText) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bcrypt_1.default.compare(text, encryptedText);
    return result;
});
Authentication.generateToken = (id) => {
    const secretKey = process.env.JWT_SECRET_KEY || "secret";
    const accessToken = jsonwebtoken_1.default.sign({ id }, secretKey, { expiresIn: "30 Days" });
    return accessToken;
};
