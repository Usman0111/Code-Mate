import React, { useRef } from "react";
import TextEditor from "../components/TextEditor";
import IoPanel from "../components/IoPanel";
import Chat from "../components/Chat";
import { Container, Row, Col } from "reactstrap";

const Room = () => {
  const valueGetter = useRef();

  return (
    <Container fluid={true}>
      <Row>
        <Col sm="6">
          <TextEditor valueGetter={valueGetter} />
        </Col>
        <Col sm="6">
          <div className="row h-50 d-inline-block">
            <IoPanel valueGetter={valueGetter} />
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
