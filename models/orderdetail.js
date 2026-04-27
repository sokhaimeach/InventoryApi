'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDetail.belongsTo(models.Order, {
        foreignKey: "order_id",
        as: "order"
      })
    }
  }
  OrderDetail.init({
    orderdetail_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    product_name: DataTypes.STRING,
    product_price: DataTypes.DECIMAL,
    qty: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'OrderDetail',
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",

    // calculate amount before create and update
    hooks: {
      beforeCreate: async (orderItem) => {
        orderItem.amount = Number(orderItem.product_price) * orderItem.qty;
      },
      beforeUpdate: async (orderItem) => {
        orderItem.amount = Number(orderItem.product_price) * orderItem.qty;
      }
    }
  });
  return OrderDetail;
};