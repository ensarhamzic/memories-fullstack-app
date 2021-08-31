const usersJoiSchema = require("../dataValidation/usersValidation");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  const { fullName, email, username, password } = req.body;
  const { error, value } = usersJoiSchema.validate({
    fullName,
    email,
    username,
    password,
  });
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  try {
    const notUnique = await User.findOne({ $or: [{ email }, { username }] });
    if (notUnique) {
      return res
        .status(400)
        .json({ error: "Email or username is already in use" });
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);
    const newUser = new User({
      fullName,
      email,
      username,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    const token = jwt.sign(
      { username: savedUser.username, id: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (e) {
    res.status(200).json({ error: "Something went wrong. Try again" });
  }
};

const signIn = async (req, res) => {
  const { emailOrUsername, password } = req.body;
  let foundUser = null;
  try {
    if (emailOrUsername.includes("@")) {
      foundUser = await User.findOne({ email: emailOrUsername });
    } else {
      foundUser = await User.findOne({ username: emailOrUsername });
    }

    if (!foundUser) {
      throw new Error();
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
      throw new Error();
    }

    const token = jwt.sign(
      { username: foundUser.username, id: foundUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (e) {
    res.status(400).json({ error: "Authentication failed" });
  }
};

module.exports = {
  signUp,
  signIn,
};
