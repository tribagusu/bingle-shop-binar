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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
class Authentication {
}
exports.Authentication = Authentication;
_a = Authentication;
Authentication.hashing = (text) => {
    return bcrypt_1.default.hash(text, 10);
};
Authentication.hashCompare = (text, encryptedText) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bcrypt_1.default.compare(text, encryptedText);
    return result;
});
Authentication.generateToken = (id) => {
    const secretKey = process.env.JWT_SECRET_KEY;
    const accessToken = jsonwebtoken_1.default.sign({
        id,
    }, secretKey, {
        expiresIn: "1200s",
    });
    return accessToken;
};
Authentication.generateRefreshToken = (id) => {
    const secretKey = process.env.JWT_REFRESH_KEY;
    const refreshToken = jsonwebtoken_1.default.sign({
        id,
    }, secretKey, {
        expiresIn: "30d",
    });
    return refreshToken;
};
Authentication.extractToken = (token) => {
    const secretKey = process.env
        .JWT_SECRET_KEY;
    let data;
    jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
        if (err) {
            data = null;
        }
        else {
            data = decoded;
        }
    });
    return data;
};
Authentication.extractRefreshToken = (token) => {
    const secretKey = process.env
        .JWT_REFRESH_KEY;
    let data;
    jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
        if (err) {
            data = null;
        }
        else {
            data = decoded;
        }
    });
    return data;
};
