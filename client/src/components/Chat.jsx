import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

const Chat = (props) => {
  const { socket } = props;
  const [showChat, setShowChat] = useState(false);
  const [user, setUser] = useState("");
  const [tempUser, setTempUser] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (showChat) {
      axios
        .get("http://localhost:8000/api/messages")
        .then((res) => {
          console.log(res.data);
          setMessages(res.data.data);
        })
        .catch((err) => console.log(err));

      socket.on("new_message", (data) =>
        setMessages((prevMessages) => [data, ...prevMessages])
      );
    }
  }, [user]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setUser(tempUser);
    setShowChat(true);
    socket.emit("joined_chat", tempUser);
  };

  const onSendMessage = () => {
    socket.emit("new_user_message", { user, message: currentMessage });
    setCurrentMessage("");
  };

  return (
    <div className="chat-app">
      {!user && (
        <div>
          <h2>Get started right now!</h2>
          <form onSubmit={onSubmitHandler}>
            <label>I want to start chatting with the name...</label>
            <br />
            <input
              type="text"
              placeholder="My name..."
              onChange={(e) => setTempUser(e.target.value)}
            />
            <button type="submit">Start Chatting</button>
          </form>
        </div>
      )}
      <div className="chat">
        {user && messages.length > 0 && (
          <>
            <div className="main">
              {messages.map((item, index) => {
                return (
                  <div key={index} className="row">
                    {item.type === "message" ? (
                      <div
                        className={`message ${
                          item.name === user ? "sender" : ""
                        }`}
                      >
                        <h4>{item.name === user ? "You" : item.name} said</h4>
                        <p>{item.message}</p>
                      </div>
                    ) : (
                      <div
                        className={`activity ${
                          item.name === user ? "sender" : ""
                        }`}
                      >
                        <p>
                          <i>
                            {item.name} {item.message}
                          </i>
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="new-message">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
              />
              <button onClick={onSendMessage}>Send</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
