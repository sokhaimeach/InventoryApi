const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const { 
    warningResponse, 
    successResponse, 
    errorResponse 
} = require('../helpers/response.helper');

// generate token for user
function generateToken(user) {
    return jwt.sign(
        {id: user.user_id, email: user.email}, 
        process.env.JWT_SECRET, 
        { expiresIn: "30d"});
}


// login controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return warningResponse(res, "Email and password are required", 400);
        }

        const user = await User.scope(null).findOne({ where: { email }});      
        if(!user) {
            return warningResponse(res, "Invalid credentials", 401);
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch) {
            return warningResponse(res, "Invalid password", 401);
        }

        const token = generateToken(user);

        successResponse(res, "Login successfully", {user, token});
    } catch(err) {
        errorResponse(res, "Error login", err.message);
    }
}

// register new user
const register = async (req, res) => {
    try {
        const {first_name, last_name, gender, password, phone, email } = req.body;

        const user = await User.create({first_name, last_name, gender, password, phone, email});

        const token = generateToken(user);

        successResponse(res, "Register successfully", {user, token});
    } catch(err) {
        errorResponse(res, "Error register", err.message);
    }
}

module.exports = { login, register };