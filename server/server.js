const Chat = require("./models/chat.model");
const express = require("express");
const app = express();
const cors = require("cors");
const socket = require("socket.io");
const port = 8000;
app.use(cors({ origin: "*" }));

require("./config/mongoose.config");

app.use(express.json(), express.urlencoded({ extended: true }));

const ChatRoutes = require("./routes/chat.routes");
ChatRoutes(app);

const server = app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Nice to meet you." + socket.id);

  socket.on("joined_chat", (data) => {
    console.log(data);
    Chat.create({
      name: data,
      message: "has joined the chat",
      type: "activity",
    })
      .then((newMessage) => {
        io.emit("new_message", newMessage);
      })
      .catch((err) => {
        console.log(err);
      });

    socket.on("new_user_message", (data) => {
      console.log(data);
      Chat.create({
        name: data.user,
        message: data.message,
        type: "message",
      })
        .then((newMessage) => {
          io.emit("new_message", newMessage);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});
