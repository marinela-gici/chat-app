const ChatController = require("../controllers/chat.controller");

module.exports = (app) => {
  app.get("/api/messages", ChatController.getMessages);
  app.post("/api/messages", ChatController.postMessage);
};
