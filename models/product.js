"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });

      Product.hasMany(models.ProductImage, {
        foreignKey: "product_id",
        as: "images",
      });
    }
  }
  Product.init(
    {
      product_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      color: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      qty: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      is_active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Product",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return Product;
};
