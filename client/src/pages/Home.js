import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, Form, FormGroup, Input } from "reactstrap";
import Picutre from "../assets/pic2.svg";
import Typewriter from "typewriter-effect";

const Home = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <Row className="w-100">
      <Col>
        <div
          style={{
            fontSize: "50px",
            color: "white",
            margin: "20px",
            marginTop: "40px",
            marginLeft: "100px",
          }}
        >
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("Welcome to Code Mate!")
                .pauseFor(2500)
                .deleteAll()
                .start()
                .typeString("Join a room to collaborate");
            }}
          />
        </div>

        <div style={{ width: "300px", marginLeft: "200px", marginTop: "70px" }}>
          <Card className="p-5 bg-sign-in border border white">
            <Form>
              <FormGroup>
                <Input
                  className="bg-sign-in text-white"
                  type="text"
                  placeholder="Name"
                  onChange={(event) => setName(event.target.value)}
                />
              </FormGroup>{" "}
              <FormGroup>
                <Input
                  className="bg-sign-in text-white"
                  type="text"
                  placeholder="Room"
                  onChange={(event) => setRoom(event.target.value)}
                />
              </FormGroup>{" "}
              <Link
                onClick={(e) => (!name || !room ? e.preventDefault() : null)}
                to={`/room?name=${name}&room=${room}`}
              >
                <Button color="info-button" outline>
                  Join
                </Button>
              </Link>
            </Form>
          </Card>
        </div>
      </Col>
      <Col>
        <div style={{ position: "reltive", right: "50px" }}>
          <img src={Picutre} alt="something" height="600" width="600" />
        </div>
      </Col>
    </Row>
  );
};

export default Home;
