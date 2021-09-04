const mongoose = require("mongoose");

const MemorySchema = mongoose.Schema({
  memoryBook: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MemoryBook",
  },
  title: {
    type: String,
    required: true,
    maxLength: 30,
  },
  description: {
    type: String,
    maxLength: 150,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Memory = mongoose.model("Memory", MemorySchema);
module.exports = Memory;
