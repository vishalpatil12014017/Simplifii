const jwt = require("jsonwebtoken");
const response = require("../lib/response");
const constant = require("../constants/constants");

const authorization = async (req, res, next) => {
	let token = JSON.parse(req.token);
	if (constant.ACCESS.includes(token.role)) {
		next();
	}else{
	return response.sendResponse(constant.response_code.UNAUTHORIZED, constant.STRING_CONSTANTS.INVALID_AUTHORIZATION, null, res, null);
	}
	
};
const checkAutorizaton = async (input) => {
	if (constant.ACCESS.includes(input.role)) {
	  return { succes: 1, data: null };
	} else {
	  return { succes: 0, data: null };
	}
  };
const authentication = (req, res, next) => {
	const token = req.headers.authorization;
	if (token) {
		jwt.verify(token, constant.jwt.SECRET, (err, decoded) => {
			if (err) {
				response.sendResponse(constant.response_code.UNAUTHORIZED, constant.STRING_CONSTANTS.INVALID_AUTHORIZATION, null, res, null);
			} else {
				req.user = decoded;
				req.token= JSON.stringify(decoded);
				// TODO: Need to change this to req.user from req.user
				return next();
			}
		});
	
	} else {
		response.sendResponse(constant.response_code.UNAUTHORIZED, "You are not authorized!", null, res, null);
	}
};

module.exports = {authorization,authentication,checkAutorizaton};
