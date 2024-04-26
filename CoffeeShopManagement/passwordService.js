// passwordService.js
const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

module.exports = { hashPassword };
