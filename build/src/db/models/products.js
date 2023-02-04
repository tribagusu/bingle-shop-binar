const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");
class Products extends Model {
}
Products.init({
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    sku: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: true,
        field: "user_id",
    },
}, {
    sequelize,
    modelName: "products",
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    tableName: "products",
    freezeTableName: true,
});
module.exports = Products;
