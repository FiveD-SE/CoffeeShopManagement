const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
