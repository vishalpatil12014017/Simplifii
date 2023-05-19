const { check, param,header } = require("express-validator");
const Errors = {
	SIGN_UP: [
		check("name", "name should not be empty").optional().notEmpty(),
		check("email", "email should be valid and not empty").isEmail().notEmpty(),
	],
	LOGIN:[
		check("email", "email should be valid and not empty").optional().isEmail().notEmpty(),
		check("otp", "Otp should be Numeric and length must be 6 digit")
		.isInt({ gt: 99999 })
		.isNumeric()
		.notEmpty()
		.isLength({ min: 6, max: 6 }),
	]
};
module.exports = Errors;
