import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const Home = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="mx-auto" style={{ width: "250px", marginTop: "100px" }}>
      <Card className="p-3 bg-sign-in border-0">
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
  );
};

export default Home;
