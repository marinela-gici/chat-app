const Chat = require("../models/chat.model");

module.exports.getMessages = (req, res) => {
  Chat.find()
    .sort({ createdAt: "desc" })
    .then((messages) => {
      res.json({ data: messages });
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};

module.exports.postMessage = (req, res) => {
  Chat.create(req.body)
    .then((newMessage) => {
      res.json(newMessage);
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};
