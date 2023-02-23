const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");
class Orders extends Model {
}
Orders.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "user_id",
    },
}, {
    sequelize,
    modelName: "orders",
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "created_at",
    deletedAt: "deleted_at",
});
module.exports = Orders;
