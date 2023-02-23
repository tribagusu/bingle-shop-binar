const User = require("./users");
const Product = require("./products");
const Order = require("./orders");
const Order_item = require("./order-items");
const sequelize = require("./sequelize");
User.hasMany(Product, {
    as: "products",
});
User.hasMany(Order, {
    as: "orders",
});
Product.belongsTo(User, {
    as: "owner",
    foreignKey: "user_id",
});
Product.hasMany(Order_item, {
    as: "order_items_product",
    foreignKey: "product_id",
});
Order.belongsTo(User, {
    as: "owner",
    foreignKey: "user_id",
});
Order.hasMany(Order_item, {
    as: "order_items",
    foreignKey: "order_id",
});
Order_item.belongsTo(Order, {
    as: "order",
    foreignKey: "order_id",
});
Order_item.belongsTo(Product, {
    as: "product",
    foreignKey: "product_id",
});
// Order.belongsToMany(User, { through: Order_item });
// Order.belongsToMany(Product, { through: Order_item });
// User.belongsToMany(Order, { through: Order_item });
// User.belongsToMany(Product, { through: Order_item });
// Product.belongsToMany(Order, { through: Order_item });
// Product.belongsToMany(User, { through: Order_item });
module.exports = {
    User,
    Product,
    Order,
    Order_item,
    sequelize,
};
