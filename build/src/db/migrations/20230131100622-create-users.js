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
            yield queryInterface.createTable("users", {
                id: {
                    primaryKey: true,
                    allowNull: false,
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.literal("gen_random_uuid()"),
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                role: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                address: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                refresh_token: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                created_at: {
                    type: Sequelize.DATE,
                    defaultValue: Date.now(),
                },
                updated_at: {
                    type: Sequelize.DATE,
                    defaultValue: Date.now(),
                },
                deleted_at: {
                    type: Sequelize.DATE,
                },
            });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable("users");
        });
    },
};
