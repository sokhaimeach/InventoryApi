const { where } = require('sequelize');
const { Customer } = require('../../models');
const { warningResponse, successResponse, errorResponse } = require('../helpers/response.helper');

// get all customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        if(customers.length === 0) {
            return warningResponse(res, "Customers not found", 404, []);
        }

        return successResponse(res, "Get all customers successfully", customers);
    } catch(err) {
        errorResponse(res, "Error get all customers", err.message);
    }
}

module.exports = {
    getAllCustomers
}
