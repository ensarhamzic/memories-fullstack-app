const express = require("express");
const Router = express.Router();
const checkAuth = require("../middleware/check-auth");
const usersController = require("../controllers/usersController");

Router.post("/signup", usersController.signUp);
Router.post("/signin", usersController.signIn);
Router.post("/verify", checkAuth, usersController.verify);

module.exports = Router;
