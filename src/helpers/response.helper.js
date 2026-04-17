/*
# Method (function) to handle response
# Purpose : reusable and make response more clean
*/

// success response
const successResponse = (res, message, data = {}, pagination={}, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        statusCode,
        message,
        data,
        pagination,
        error: null
    });
}

// warning response
const warningResponse = (res, message, statusCode = 400, pagination={}, data = {}) => {
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        data,
        pagination,
        error: null
    });
}

// error response 
const errorResponse = (res, message, error = null, statusCode = 500) => {
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        error
    });
}

module.exports = {
    successResponse,
    warningResponse,
    errorResponse
};