const { Op, col } = require("sequelize");
const sequelize = require("../../config/db");
const { Product, Category } = require("../../models");
const { errorResponse, successResponse } = require("../helpers/response.helper");

// GET : /api/v1/products
const getAllProducts = async (req, res) => {
    try {
        const { search } = req.query;
        const where = {};
        if(search) {
            where[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } },
                sequelize.where(col("category.name"), Op.iLike, `%${search}%`)
            ];
        }

        const products = await Product.findAll({
            include: [
                {
                    model: Category,
                    as: "category"
                }
            ],
            where
        });

        successResponse(res, "Get all products successfully", products);
    } catch(error) {
        errorResponse(res, "Error get all products", error.message);
    }
};

// POST: api/v1/products
const createNewProduct = async (req, res) => {
    try {
        const {name, description, color, price, qty, category_id} = req.body;
        const product = await Product.create({
            name, 
            price, 
            qty, 
            category_id, 
            description, 
            color
        });

        return successResponse(res, "Create product successfully", product);
    } catch(error) {
        errorResponse(res, "Error create product", error.message);
    }
}


module.exports = {
    getAllProducts,
    createNewProduct
}