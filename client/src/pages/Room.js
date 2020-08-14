import React, { useState, useEffect } from "react";
import TextEditor from "../components/TextEditor";
import IoPanel from "../components/IoPanel";
import Chat from "../components/Chat";
import { Container, Row, Col } from "reactstrap";
import queryString from "query-string";
import { socket } from "../socket.js";

const Room = ({ location }) => {
  // const [name, setName] = useState("");
  // const [room, setRoom] = useState("");
  const [code, setCode] = useState(
    '#include <iostream>\r\nusing namespace std;\r\nint main()\r\n{\r\n    cout << "Hello World" << endl;\r\n    return 0;\r\n}\r\n'
  );

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    // setName(name);
    // setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      alert(error);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [location.search]);

  useEffect(() => {
    socket.on("ChangedCode", (code) => {
      console.log("test");
      setCode(code);
    });
  }, [location.search]);

  return (
    <Container fluid={true}>
      <Row>
        <Col sm="6">
          <TextEditor code={code} setCode={setCode} />
        </Col>
        <Col sm="6">
          <div className="row h-50 d-inline-block">
            <IoPanel code={code} />
          </div>
          <div className="row h-50 d-inline-block">
            <Chat />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Room;
