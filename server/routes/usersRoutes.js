const express = require("express");
const Router = express.Router();
const usersController = require("../controllers/usersController");

Router.post("/signup", usersController.signUp);
Router.post("/signin", usersController.signIn);

module.exports = Router;
