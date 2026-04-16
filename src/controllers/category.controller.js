const { Op } = require("sequelize");
const { Category } = require("../../models");
const { errorResponse, successResponse, warningResponse } = require("../helpers/response.helper");

// GET: api/v1/category
const getAllCategories = async (req, res) => {
    try {
        const { search } = req.query;
        let where = {};
        if (search) {
            where = {
                name: { [Op.iLike]: `%${search}%` }
            }
        }

        const categories = await Category.findAll({where});
        if (categories.length <= 0) {
            return warningResponse(res, "Category not found", 404);
        }

        successResponse(res, "Get all category successfully", categories);
    } catch(error) {
        errorResponse(res, "Error get all categories", error.message);
    }
}

// POST: api/v1/categories
const createNewCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.create({name});

        successResponse(res, "Create new category successfully", category);
    } catch(error) {
        errorResponse(res, "Error create new category", error.message);
    }
}

// PUT: api/v1/categories/:id
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const category = await Category.findByPk(id);
        if (!category) {
            return warningResponse(res, "Category not found", 404);
        }

        category.name = name;
        await category.save();
        successResponse(res, "Update category successfully", category);
    } catch(error) {
        errorResponse(res, "Error update category", error.message);
    }
}

// DELETE: api/v1/categories/:id
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category) {
            return warningResponse(res, "Category not found", 404);
        }

        await category.destroy();
        successResponse(res, "Delete category successfully", category);
    } catch(error) {
        errorResponse(res, "Error delete category", error.message);
    }
}

module.exports = {
    getAllCategories,
    createNewCategory,
    updateCategory,
    deleteCategory
}