const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createUsers,
  loginUser,
  getUser,
} = require("../controllers/userController");

router.post("/usersignup", createUsers);
router.post("/userlogin", loginUser);
router.get("/profile", auth, getUser);

module.exports = router;
