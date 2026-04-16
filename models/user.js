'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }

    // helpper method to compare password
    async comparePassword(plainPassword) {
      return bcrypt.compare(plainPassword, this.password);
    }
  }
  User.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    gender: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: { exclude: ['password']}
    },
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",

    // hash password before create and update using bcryptjs
    hooks: {
      // hash before create
      beforeCreate: async (user) => {
        if(user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },

      // hash before update
      beforeUpdate: async (user) => {
        if(user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      }
    }
  });
  return User;
};