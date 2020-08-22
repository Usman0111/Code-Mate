import React, { useState, useEffect } from "react";
import TextEditor from "../components/TextEditor";
import IoPanel from "../components/IoPanel";
import Chat from "../components/Chat";
import Toolbar from "../components/Toolbar";
import { Container, Row, Col } from "reactstrap";
import queryString from "query-string";
import { socket } from "../socket.js";
import { useHistory } from "react-router-dom";

const Room = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  let history = useHistory();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      history.push("/");
      alert(error);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [location.search]);

  return (
    <Container fluid={true}>
      <Row>
        <div style={{ minWidth: "830px" }}>
          <Col>
            <Toolbar />
            <TextEditor />
          </Col>
        </div>
        <div>
          <Col>
            <IoPanel />
            <Chat room={room} name={name} />
          </Col>
        </div>
      </Row>
    </Container>
  );
};

export default Room;
