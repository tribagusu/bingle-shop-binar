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
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkInsert("users", [
                {
                    name: "John Doe",
                    address: "Jakarta",
                    email: "satu@gmail.com",
                    password: "$2y$10$GCjY/7K/SV4sE8p7W6VdXu7nSTsoa7hHme/tz0SHoXj/ylW7gcq6e",
                    role: "admin",
                },
                {
                    name: "Sinatra",
                    address: "Jakarta",
                    email: "dua@gmail.com",
                    password: "$2y$10$jtYbmjE4VmFW/ncjO9d/h.HLYsjP0eQLHv9mYNWEWDHCrZLmSZUXO",
                    role: "user",
                },
            ], {});
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete("users", null, {});
        });
    },
};
