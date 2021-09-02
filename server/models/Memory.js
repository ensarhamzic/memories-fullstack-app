const mongoose = require("mongoose");

const MemorySchema = mongoose.Schema({
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
