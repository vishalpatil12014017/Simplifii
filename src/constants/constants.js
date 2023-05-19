
module.exports = {
	Delimeters: {
		EMPTY: "",
		STRING_JOIN_SYMBOL_TILT: "~~",
		EXTRA_SPACE: " ",
		AMPERSAND: "&",
		PIPE: "|",
		ASTRIK: "*",
		FORWARD_SLASH: "/",
		EQUALS: "=",
	},
	DB: {
		table: {
			USERS_MASTER: "users",
			VERIFICATION_MASTER:"verification"
		},
	},
	response_code: {
		/** Success Codes */
		SUCCESS: 200,
		No_Content: 204,
		EMPTY_REQ: 227,
		MAX_SUCCESS_CODE: 299,

		/** Other Codes*/
		RESOURCE_MOVED_PERMANENTLY: 301,

		/** Error Codes*/
		BAD_REQUEST: 400,
		UNAUTHORIZED: 401,
		JWT: 402,
		FORBIDDEN: 403,
		NOT_FOUND: 404,
		INVALID_ID: 406,
		DUPLICATE: 406,
		CONFLICT: 409,
		EXPIRED: 410,
		UPGRADE_APP: 426,
		ROLE_BREACH: 451,
		RECORD_NOT_FOUND: 499,
		INTERNAL_SERVER_ERROR: 500,
	},
	otp: {
		EXPIRY: 15, //in minutes
		MAX_RESEND: 2,
		MAX_RETRY: 2,
	},
	MOBILE_NO_LENGTH: 10,
	PASSWORD_LENGTH: 8,
	EMAIL_DOMAIN_SEGMENTS: 2,
	OTP_LENGTH: 100000,
	RANDOM_MULTIPLIER: 889988,
	DEV_OTP: 123456,
	ONE_MIN:60000,
	jwt: {
		SECRET: "secretfortoken",
		EXPIRE: 86400,
		ADMIN_TOKEN_EXPIRE:86400*30
	},
	string_constants: {
		SOME_ERROR_OCCURED: "Some error occurred while retrieving data.",
		INVALID_AUTHORIZATION: "Unauthorized Request",
	},
	STRING_CONSTANTS: {
		SOME_ERROR_OCCURED: "Some error occurred while retrieving data.",
		MOBILE_NO_LENGTH_STRING: `Mobile number length should be greater than 10`,
		ENDPOINT_NOT_FOUND: "Endpoint not found at server",
		INVALID_AUTHORIZATION: "Unauthorized Request",
		PROVIDE_VALID_TOKEN:"Please Provide Valid Token! "
	},
	ACCESS:["ADMIN"],
	SERVICE_NAME:"Simplifii"
};
