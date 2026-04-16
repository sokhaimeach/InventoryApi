const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const { warningResponse, errorResponse } = require('../helpers/response.helper');

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader && !authHeader.startsWith("Bearer ")) {
            return warningResponse(res, "Not authorized, no token provided", 401);
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findByPk(decoded.id);

        if(!req.user) {
            return warningResponse(res, "User not found", 401);
        }

        next();
    } catch(err) {
        errorResponse(res, "Not authorized, token invalid or expired", null,401);
    }
}

module.exports = protect;
