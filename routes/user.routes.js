const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const { verifyToken } = require("../middleware/verifyToken");
router
    .post("/signup", userController.signup)
    .post("/login", userController.login)
    .post("/me", verifyToken, userController.getMe)
    .get("/signup/confirmation/:token", userController.confirmationAccount)
  
    
module.exports = router;