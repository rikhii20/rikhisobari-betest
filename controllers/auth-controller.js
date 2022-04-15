const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const User = require("../models/user");
const errorHandler = require("../utils/errorHandler");

module.exports = {
  register: async (req, res) => {
    const { userName, accountNumber, password, emailAddress, identityNumber } =
      req.body;
    try {
      const schema = Joi.object({
        userName: Joi.string().min(4).required(),
        accountNumber: Joi.string().required(),
        password: Joi.string().min(5).required(),
        emailAddress: Joi.string().required(),
        identityNumber: Joi.string().required(),
      });
      const { error } = schema.validate({
        accountNumber,
        userName,
        password,
        emailAddress,
        identityNumber,
      });
      if (error) {
        return res.status(400).json({
          status: "Bad request",
          message: error.message,
          result: {},
        });
      }
      const check = await User.findOne({ userName });
      if (check) {
        return res.status(400).json({
          status: "Bad request",
          message: "Account has already exist",
          result: {},
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        accountNumber,
        userName,
        password: hashedPassword,
        emailAddress,
        identityNumber,
      });
      const token = jwt.sign(
        {
          _id: user.id,
          userName: user.userName,
        },
        process.env.SECRET_TOKEN,
        { expiresIn: "24h" },
      );
      res.status(200).json({
        status: "Success",
        message: "Successfuly to register",
        result: {
          token,
        },
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
  login: async (req, res) => {
    const { userName, password } = req.body;
    try {
      const schema = Joi.object({
        userName: Joi.string().min(4).required(),
        password: Joi.string().required(),
      });
      const { error } = schema.validate({
        userName,
        password,
      });
      if (error) {
        return res.status(400).json({
          status: "Bad request",
          message: error.message,
          result: {},
        });
      }
      const user = await User.findOne({ userName });
      if (!user) {
        return res.status(401).json({
          status: "Unauthorized",
          message: "Invalid username or password",
          result: {},
        });
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({
          status: "Unauthorized",
          message: "Invalid username or password",
          result: {},
        });
      }
      const token = jwt.sign(
        {
          userName: user.userName,
          _id: user.id,
        },
        process.env.SECRET_TOKEN,
        { expiresIn: "24h" },
      );
      res.status(200).json({
        status: "Success",
        message: "Logged in successfuly",
        result: {
          token,
          user: {
            _id: user.id,
            userName: user.userName,
            accountNumber: user.accountNumber,
            identityNumber: user.identityNumber,
          },
        },
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
};
