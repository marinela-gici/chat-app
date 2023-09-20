const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    message: {
      type: String,
    },
    type: {
      type: String,
      enum: ["message", "activity"],
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
