const { validationResult } = require("express-validator");
const response = require("../lib/response");
const constant = require("../constants/constants");
const jwt = require("jsonwebtoken");
const query = require("../lib/queries/users");
const verificationQuery = require("../lib/queries/verification");
const { generateOtp } = require("../middlewares/otpGenerator");
const { checkTimeDifferance } = require("../middlewares/timeDifferance");

const genNewToken = async (payload, res) => {
  try {
    const expireIn = constant.jwt.ADMIN_TOKEN_EXPIRE;
    var token = jwt.sign(payload, constant.jwt.SECRET, {
      expiresIn: expireIn || constant.jwt.EXPIRE, // expires in 24 hours
    });
    return token;
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      "Error in generating token",
      null,
      res
    );
  }
};

// Sign Up Or Generate OTP Function
exports.signUp = async (req, res) => {
  const email = req.body.email;
  try {
    let errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }
    let User = await query.getSingle({ where: { email } });
    if (!User) {
      req.body["role"] = "USER";
      User = await query.create(req.body);
    }
    let otp = generateOtp();

    let verification = await verificationQuery.getUserById(User.id);

    if (!verification) {
      await verificationQuery.createVerifications({
        userId: User.id,
        otp: otp,
        otpGeneratedAt: Math.floor(Date.now()),
      });
    } else {
      if (
        verification.blockedUntil &&
        verification.blockedUntil >= Math.floor(Date.now())
      ) {
        return response.sendResponse(
          constant.response_code.FORBIDDEN,
          `Account suspended. Please try again after ${Math.floor(
            (verification.blockedUntil - Math.floor(Date.now())) / 60 / 1000
          )} minutes`,
          null,
          res
        );
      }

      if (verification.otpGeneratedAt) {
        const timeDifference =
          Math.floor(Date.now()) - verification.otpGeneratedAt;
        if (timeDifference < constant.ONE_MIN) {
          return response.sendResponse(
            constant.response_code.FORBIDDEN,
            "Please wait for 1 minute before requesting a new OTP.",
            null,
            res
          );
        }
      }
      await verificationQuery.updateVerifications(
        {
          otp: otp,
          otpGeneratedAt: Math.floor(Date.now()),
          succesfulAttempts: 0,
        },
        {
          userId: User.id,
        }
      );
    }
    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Otp sent successfully",
      { otp: otp },
      res
    );
  } catch (err) {
    console.log(err);
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};

// Login Or Verify OTP Function
exports.userLogin = async (req, res) => {
  const email = req.body.email;
  const otp = parseInt(req.body.otp);
  try {
    let errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }

    let User = await query.getSingle({ where: { email } });
    if (!User) {
      return response.sendResponse(
        constant.response_code.NOT_FOUND,
        `Cannot find User with email=${email}.`,
        null,
        res,
        errors
      );
    } else {
      let verification = await verificationQuery.getUserById(User.id);
      if (
        verification.blockedUntil &&
        verification.blockedUntil >= Math.floor(Date.now())
      ) {
        return response.sendResponse(
          constant.response_code.FORBIDDEN,
          `Account suspended. Please try again after ${Math.floor(
            (verification.blockedUntil - Math.floor(Date.now())) / 60 / 1000
          )} minutes`,
          null,
          res
        );
      }
      if (verification.succesfulAttempts) {
        return response.sendResponse(
          constant.response_code.BAD_REQUEST,
          "The provided OTP has already been used. Please request a new OTP.",
          null,
          res
        );
      }

      if (checkTimeDifferance(verification.otpGeneratedAt) >= 5) {
        return response.sendResponse(
          constant.response_code.EXPIRED,
          `Otp has been expired`,
          null,
          res,
          errors
        );
      } else if (verification.otp !== otp) {
        let options = {};
        if (verification.loginAttempts === 4) {
          options.loginAttempts = 0;
          options.blockedUntil = Math.floor(Date.now()) + constant.ONE_MIN * 60;
        } else {
          options.loginAttempts = ++verification.loginAttempts;
        }
        await verificationQuery.updateVerifications(options, {
          userId: User.id,
        });
        return response.sendResponse(
          constant.response_code.UNAUTHORIZED,
          `OTP does not match`,
          null,
          res,
          errors
        );
      } else {
        var userDataForToken = {
          id: User.id,
          name: User.name,
          role: User.role,
          email: User.email,
        };
        let token = await genNewToken(userDataForToken, res);
        await verificationQuery.updateVerifications(
          {
            succesfulAttempts: 1,
            token: token,
            tokenGeneratedAt: Math.floor(Date.now()),
            loginAttempts: 0,
            blockedUntil: null,
          },
          {
            userId: User.id,
          }
        );

        return response.sendResponse(
          constant.response_code.SUCCESS,
          "Success",
          { ...User.dataValues, token },
          res
        );
      }
    }
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};
