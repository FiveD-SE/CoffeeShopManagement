const validateEmail = (email) => {
    // Regex pattern để kiểm tra email
    const regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexPattern.test(email);
};

module.exports = { validateEmail };
