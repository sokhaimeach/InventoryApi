const { Op, col } = require("sequelize");
const sequelize = require("../../config/db");
const { Product, Category, ProductImage } = require("../../models");
const { errorResponse, successResponse, warningResponse } = require("../helpers/response.helper");

// GET : /api/v1/products
const getAllProducts = async (req, res) => {
    try {
        const { search } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req. query.limit) || 10;
        const offset = (page - 1) * limit;

        const where = {};
        if(search) {
            where[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } },
                sequelize.where(col("category.name"), Op.iLike, `%${search}%`)
            ];
        }

        const {rows: products, count: total} = await Product.findAndCountAll({
            include: [
                {
                    model: Category,
                    as: "category"
                },
                {
                    model: ProductImage,
                    as: "images",
                    attributes: ["image_id", "image_url"]
                }
            ],
            where,
            offset,
            limit
        });

        const totalPages = Math.ceil(total / limit);

        successResponse(res, "Get all products successfully", products, {
            total,
            totalPages,
            currentPage: page,
            nextPage: page < totalPages? page + 1 : page,
            prevPage: page > 1 ? page - 1 : 1,
            limit
        });
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

// PUT: api/v1/products/:id
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {name, description, color, price, qty, category_id} = req.body;

        const product = await Product.findByPk(id);
        if (!product) {
            return warningResponse(res, "Product not found", 404);
        }

        product.name = name;
        product.description = description;
        product.color = color? color : "";
        product.price = price;
        product.qty = qty;
        product.category_id = category_id;

        await product.save();
        successResponse(res, "Update product successfully", product);
    } catch(error) {
        errorResponse(res, "Error update product", error.message);
    }
}

// DELETE: api/v1/products/:id
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);
        if (!product) {
            return warningResponse(res, "Product not found", 404);
        }

        await product.destroy();
        successResponse(res, "Delete product successfully", product);
    } catch(error) {
        errorResponse(res, "Error delete product", error.message);
    }
}


module.exports = {
    getAllProducts,
    createNewProduct,
    updateProduct,
    deleteProduct
}