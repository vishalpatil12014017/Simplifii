
const constant = require("../constants/constants");

const generateOtp=()=> {
    return parseInt(Math.floor(constant.OTP_LENGTH + Math.random() * constant.RANDOM_MULTIPLIER));
}

module.exports = {generateOtp};