import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormGroup,
} from "reactstrap";
import axios from "axios";
import classnames from "classnames";

const IoPanel = (props) => {
  const [activeTab, setActiveTab] = useState("1");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("Press Start...");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const changeInput = (event) => {
    setInput(event.target.value);
  };

  const baxios = axios.create({
    headers: {
      Authorization: "Token 8b0ebe3b-538e-4886-85f2-3bb8376c0e95",
    },
  });

  const runCode = () => {
    setOutput("Running...");
    toggle("2");
    baxios
      .post(
        "https://cors-anywhere.herokuapp.com/https://run.glot.io/languages/cpp/latest",
        {
          stdin: input,
          files: [
            {
              name: "main.cpp",
              content: props.code,
            },
          ],
        },
        {
          "Content-Type": "application/json",
        }
      )
      .then((res) => {
        res.data.stderr
          ? setOutput(res.data.stderr)
          : setOutput(res.data.stdout);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            onClick={() => {
              runCode();
            }}
          >
            Run
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            Input
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Output
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Form>
            <FormGroup>
              <textarea
                value={input}
                onChange={changeInput}
                rows="8"
                cols="102"
              ></textarea>
            </FormGroup>
          </Form>
        </TabPane>
        <TabPane tabId="2">
          <div>
            <div className="card">
              <div
                className="card-body overflow-auto"
                style={{ height: "200px", width: "750px" }}
              >
                {output.split("\n").map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
          </div>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default IoPanel;
