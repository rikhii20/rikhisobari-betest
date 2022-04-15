const Joi = require("joi");
const errorHandler = require("../utils/errorHandler");
const User = require("../models/user");

module.exports = {
  getUser: async (req, res) => {
    try {
      const user = await User.findOne(
        { _id: req.user._id },
        { password: 0, createdAt: 0 },
      );
      if (!user) {
        return res.status(404).json({
          status: "Not Found",
          message: "User not found",
          result: {},
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Successfully",
        result: user,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
  getUserByAccountNumber: async (req, res) => {
    const { accountNumber } = req.query;
    try {
      const user = await User.findOne(
        { accountNumber: accountNumber },
        { password: 0, createdAt: 0 },
      );
      if (!user) {
        return res.status(404).json({
          status: "Not Found",
          message: "User not found",
          result: {},
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Successfully",
        result: user,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
  getUserByIdentityNumber: async (req, res) => {
    const { identityNumber } = req.query;
    try {
      const user = await User.findOne(
        { identityNumber },
        { password: 0, createdAt: 0 },
      );
      if (!user) {
        return res.status(404).json({
          status: "Not Found",
          message: "User not found",
          result: {},
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Successfully",
        result: user,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
  editUser: async (req, res) => {
    const { emailAddress } = req.body;
    try {
      const schema = Joi.object({
        emailAddress: Joi.string(),
      });
      const { error } = schema.validate({
        emailAddress,
      });
      if (error) {
        return res.status(400).json({
          status: "Bad request",
          message: error.message,
          result: {},
        });
      }
      const update = await User.findByIdAndUpdate(
        { _id: req.user._id },
        { emailAddress },
        { new: true },
      );
      if (!update) {
        return res.status(404).json({
          status: "Not Found",
          message: "Data not found",
          result: {},
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Successfully update the data",
        result: update,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findOneAndDelete({
        _id: req.user._id,
      });
      if (!user) {
        return res.status(404).json({
          status: "Not Found",
          message: "Data not found",
          result: {},
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Successfully delete the data",
        result: user,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
};
