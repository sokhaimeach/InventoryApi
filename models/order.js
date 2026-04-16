"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Customer, {
        foreignKey: "customer_id",
        as: "customer",
      });

      Order.hasMany(models.OrderDetail, {
        foreignKey: "orderdetail_id",
        as: "orderDetail",
      });
    }
  }
  Order.init(
    {
      customer_id: DataTypes.INTEGER,
      order_number: DataTypes.STRING,
      total: DataTypes.DECIMAL,
      discount: DataTypes.DECIMAL,
      order_date: DataTypes.DATE,
      location: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Order",
    },
  );
  return Order;
};
