const express = require("express");
const {
  getUser,
  editUser,
  deleteUser,
  getUserByAccountNumber,
  getUserByIdentityNumber,
} = require("../controllers/user-controller");
const { isLogin } = require("../middlewares/auth");
const router = express.Router();

router.get("/profile", isLogin, getUser);
router.get("/account-number", getUserByAccountNumber);
router.get("/identity-number", getUserByIdentityNumber);
router.put("/edit", isLogin, editUser);
router.delete("/delete", isLogin, deleteUser);

module.exports = router;
