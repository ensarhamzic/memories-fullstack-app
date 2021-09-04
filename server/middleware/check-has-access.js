const MemoryBook = require("../models/MemoryBook");

const checkAccess = async (req, res, next) => {
  const { memoryBookId } = req.params;
  try {
    const foundMemoryBook = await MemoryBook.findById(memoryBookId);
    if (!foundMemoryBook) {
      throw new Error("Cannot find that memory book");
    }
    if (foundMemoryBook.owner.toString() !== req.userData.id) {
      throw new Error("You don't have access to this memory book");
    }
    next();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = checkAccess;
