const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

class Order_items extends Model {}

Order_items.init(
  {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "order_id",
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "product_id",
    },
  },
  {
    sequelize,
    modelName: "order_items",
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "created_at",
    deletedAt: "deleted_at",
  }
);

module.exports = Order_items;
