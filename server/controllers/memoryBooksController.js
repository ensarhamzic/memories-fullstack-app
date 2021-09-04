const User = require("../models/User");
const memoryBooksJoiSchema = require("../dataValidation/memoryBooksValidation");
const MemoryBook = require("../models/MemoryBook");

const getMemoryBooks = async (req, res) => {
  const { userData } = req;
  try {
    const foundUser = await User.findOne({
      username: userData.username,
    }).populate("memoryBooks");
    const memoryBooks = foundUser.memoryBooks;
    res.status(200).json({ memoryBooks });
  } catch (e) {
    res.status(400).json({ error: "Error happened. Try again" });
  }
};

const newMemoryBook = async (req, res) => {
  const { userData } = req;
  const { error, value } = memoryBooksJoiSchema.validate({
    title: req.body.title,
    location: req.body.location,
  });
  if (error) {
    return res.status(200).json({ error: error.message });
  }
  try {
    const foundUser = await User.findOne({ username: userData.username });
    const newMemoryBook = new MemoryBook({
      owner: foundUser,
      title: value.title,
      location: value.location,
    });
    foundUser.memoryBooks.push(newMemoryBook);
    await foundUser.save();
    await newMemoryBook.save();
    res.status(200).json({ success: "Saved" });
  } catch (e) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

const addNewViewer = async (req, res) => {
  const { memoryBookId } = req.params;
  const { emailOrUsername } = req.body;
  let foundUser;
  try {
    if (emailOrUsername.includes("@")) {
      foundUser = await User.findOne({ email: emailOrUsername });
    } else {
      foundUser = await User.findOne({ username: emailOrUsername });
    }
    if (!foundUser) {
      throw new Error("Could not find that user");
    }
    if (foundUser._id.toString() === req.userData.id) {
      throw new Error("Cannot add yourself");
    }
    const foundMemoryBook = await MemoryBook.findById(memoryBookId);
    if (foundMemoryBook.owner.toString() !== req.userData.id) {
      throw new Error("You have no access to this memory book");
    }
    if (foundMemoryBook.viewers.includes(foundUser._id.toString())) {
      throw new Error("This user is already added to viewers");
    }
    foundMemoryBook.viewers.push(foundUser);
    await foundMemoryBook.save();
    res.status(200).json({ success: "Successfully added user to viewers" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const removeViewer = async (req, res) => {
  const { memoryBookId, viewerId } = req.params;
  try {
    const foundMemoryBook = await MemoryBook.findById(memoryBookId);
    if (!foundMemoryBook) {
      throw new Error("Memory book not found");
    }
    if (foundMemoryBook.owner.toString() !== req.userData.id) {
      throw new Error("You have no access to this memory book");
    }
    foundMemoryBook.viewers = foundMemoryBook.viewers.filter(
      (viewer) => viewer.toString() !== viewerId.toString()
    );
    await foundMemoryBook.save();

    res.status(200).json({ success: "Succesfully deleted user from viewers" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  newMemoryBook,
  getMemoryBooks,
  addNewViewer,
  removeViewer,
};
