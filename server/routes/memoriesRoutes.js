const express = require("express");
const checkAuth = require("../middleware/check-auth");
const Router = express.Router({ mergeParams: true });
const memoriesController = require("../controllers/memoriesController");
const checkAccess = require("../middleware/check-has-access");

Router.get("/", checkAuth, memoriesController.getMemories);
Router.post(
  "/",
  checkAuth,
  checkAccess,
  memoriesController.upload.single("memoryImage"),
  memoriesController.addNewMemory
);
Router.delete("/:memoryId", checkAuth, memoriesController.deleteMemory);

module.exports = Router;
