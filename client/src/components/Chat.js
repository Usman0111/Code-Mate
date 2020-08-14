import React, { useState, useEffect } from "react";
import { Card, CardBody, Input } from "reactstrap";
import { socket } from "../socket.js";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div style={{ width: "750px" }}>
      <h3 className="text-secondary">Chat Room</h3>
      <Card>
        <CardBody className="overflow-auto" style={{ height: "225px" }}>
          {messages.map((message, index) => (
            <div key={index}>{`${message.user} : ${message.text}`}</div>
          ))}
        </CardBody>
      </Card>
      <Input
        className="mt-3"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />
    </div>
  );
};

export default Chat;
