const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { v4: uniqueId } = require("uuid");
const MemoryBook = require("../models/MemoryBook");
const Memory = require("../models/Memory");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "memories",
    format: async (req, file) => "jpg",
    public_id: (req, file) => `${file.originalname}${uniqueId()}`,
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 1000000 * 3 }, // 3mb file size
});

const getMemories = async (req, res) => {
  const { memoryBookId } = req.params;
  try {
    const foundMemoryBook = await MemoryBook.findById(memoryBookId).populate(
      "memories"
    );
    if (!foundMemoryBook) {
      throw new Error("Cannot find that memory book");
    }
    if (
      foundMemoryBook.owner.toString() !== req.userData.id &&
      !foundMemoryBook.viewers.includes(req.userData.id)
    ) {
      throw new Error("You don't have access to this memory book");
    }
    res.status(200).json({ memories: foundMemoryBook.memories });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const addNewMemory = async (req, res) => {
  const { title, description } = req.body;
  const { memoryBookId } = req.params;
  const uploadedImage = req.file;
  try {
    const foundMemoryBook = await MemoryBook.findById(memoryBookId);
    const newMemory = new Memory({
      memoryBook: foundMemoryBook,
      title,
      description,
      imageUrl: uploadedImage.path,
    });
    foundMemoryBook.memories.push(newMemory);
    await newMemory.save();
    await foundMemoryBook.save();
    res
      .status(200)
      .json({ success: "Successfully added new memory to memory book" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const deleteMemory = async (req, res) => {
  const { memoryBookId, memoryId } = req.params;
  try {
    const foundMemoryBook = await MemoryBook.findById(memoryBookId);
    if (!foundMemoryBook) {
      throw new Error("Cannot find that memory book");
    }
    if (foundMemoryBook.owner.toString() !== req.userData.id) {
      throw new Error("You don't have permission to do this");
    }
    if (!foundMemoryBook.memories.includes(memoryId)) {
      throw new Error("You cannot delete this memory");
    }
    await Memory.deleteOne({ _id: memoryId });
    foundMemoryBook.memories = foundMemoryBook.memories.filter(
      (memory) => memory !== memoryId
    );
    await foundMemoryBook.save();
    res.status(200).json({ success: "Successfully deleted memory book" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  upload,
  getMemories,
  addNewMemory,
  deleteMemory,
};
