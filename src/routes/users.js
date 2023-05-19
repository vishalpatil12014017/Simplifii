var router = require("express").Router();
const { authorization,authentication } = require("../middlewares/authorization");
const users = require("../controllers/users");
const errors = require("../middlewares/validator/users")

// Sign Up And Generate Otp
router.post("/signUp",errors.SIGN_UP, users.signUp);

// Login with Otp
router.post("/login",errors.LOGIN, users.userLogin);

module.exports = router;
