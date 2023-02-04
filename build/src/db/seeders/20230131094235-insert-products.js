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
const { UUIDV4 } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkInsert("products", [
                {
                    name: "Light Americano",
                    price: 10000,
                    stock: 100,
                    sku: "K0050",
                },
                {
                    name: "Jasmine Earl Grey Tea",
                    price: 15000,
                    stock: 100,
                    sku: "K0051",
                },
                {
                    name: "Thai Tea",
                    price: 9000,
                    stock: 100,
                    sku: "K0052",
                },
                {
                    name: "Lemon Black Tea",
                    price: 12000,
                    stock: 100,
                    sku: "K0053",
                },
                {
                    name: "Light Latte",
                    price: 18000,
                    stock: 100,
                    sku: "K0054",
                },
                {
                    name: "Cappuccino",
                    price: 9000,
                    stock: 100,
                    sku: "K0055",
                },
                {
                    name: "Milo Dinosaurus",
                    price: 10000,
                    stock: 100,
                    sku: "K0056",
                },
            ], {});
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete("products", null, {});
        });
    },
};
