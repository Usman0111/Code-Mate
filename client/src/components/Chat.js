import React, { useState, useEffect, useContext, useRef } from "react";
import { Row, Col, Input, Button, Tooltip } from "reactstrap";
import { socket } from "../socket.js";
import { DataContext } from "../dataContext";

const Chat = (props) => {
  console.log("render");
  const { data } = useContext(DataContext);
  const dataRef = useRef(data);
  dataRef.current = data;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  useEffect(() => {
    socket.on("currentMembers", (currentMembers) => {
      const names = currentMembers.map((member) => member.name);
      setMembers([...members, ...names]);
    });
    socket.on("memberJoin", (member) => {
      setMembers([...members, member]);
      socket.emit("syncLanguage", {
        language: dataRef.current.language,
        newUser: true,
      });
      socket.emit("editCode", dataRef.current.code);
      socket.emit("editInput", dataRef.current.input);
    });
    socket.on("memberLeave", (member) => {
      setMembers(members.filter((currentMember) => currentMember == member));
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <Col>
      <Row>
        <div className="mt-2" style={{ position: "absolute", right: "1px" }}>
          <Button color="info-button" id="Tooltip" outline>
            Room Status
          </Button>
          <Tooltip
            placement="right"
            isOpen={tooltipOpen}
            target="Tooltip"
            toggle={toggle}
          >
            Name: {props.room} <br />
            Member(s): <br />
            {props.name + " (you)"}
            {members.map((member, index) => (
              <div key={index}>
                {member} <br />
              </div>
            ))}
          </Tooltip>
        </div>
      </Row>
      <Row>
        <div
          style={{
            width: "645px",
            marginTop: "49px",
          }}
        >
          <div className="card mb-2 bg-chat text-white border border-white">
            <div
              className="card-body overflow-auto"
              style={{ height: "300px" }}
            >
              {messages.map((message, index) =>
                message.user === "admin" ? (
                  <div
                    key={index}
                    className="text-admin-color "
                  >{`${message.text}`}</div>
                ) : (
                  <div key={index}>{`${message.user} : ${message.text}`}</div>
                )
              )}
            </div>
          </div>

          <Input
            className="mt-2  bg-chat text-white"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={(event) =>
              event.key === "Enter" ? sendMessage(event) : null
            }
          />
        </div>
      </Row>
    </Col>
  );
};

export default Chat;
