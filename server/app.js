const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const usersRoutes = require("./routes/usersRoutes");
const memoryBooksRoutes = require("./routes/memoryBooksRoutes");
const memoriesRoutes = require("./routes/memoriesRoutes");

const validation = require("./dataValidation/usersValidation");

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@cluster0.4tadf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/users", usersRoutes);
app.use("/memoryBooks", memoryBooksRoutes);
app.use("/memoryBooks/:memoryBookId/memories", memoriesRoutes);

module.exports = app;
