const mongoose = require("mongoose");

const MemoryBookSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  viewers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  title: {
    type: String,
    required: true,
    maxLength: 30,
  },
  location: {
    type: String,
    maxLength: 20,
  },
  memories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Memory" }],
});

const MemoryBook = mongoose.model("MemoryBook", MemoryBookSchema);
module.exports = MemoryBook;
