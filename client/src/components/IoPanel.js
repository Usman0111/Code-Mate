import React, { useContext, useEffect } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormGroup,
} from "reactstrap";
import classnames from "classnames";
import { DataContext } from "../dataContext";
import { socket } from "../socket";

const IoPanel = (props) => {
  const { data, dispatch } = useContext(DataContext);

  const toggle = (tab) => {
    if (data.activeTab !== tab) dispatch({ type: "SET_TAB", tab });
  };

  useEffect(() => {
    socket.on("changeInput", (input) => {
      dispatch({ type: "SET_INPUT", input });
    });
  }, [dispatch]);

  const changeInput = (event) => {
    dispatch({ type: "SET_INPUT", input: event.target.value });
    socket.emit("editInput", event.target.value);
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: data.activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            <div className="text-white">Input</div>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: data.activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            <div className="text-white">Output</div>
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent className="mt-1" activeTab={data.activeTab}>
        <TabPane tabId="1">
          <textarea
            className=" bg-secondary text-white"
            value={data.input}
            onChange={changeInput}
            rows="8"
            cols="87"
          ></textarea>
        </TabPane>
        <TabPane tabId="2">
          <div>
            <div className="card mb-2 bg-secondary text-white border border-white">
              <div
                className="card-body overflow-auto"
                style={{
                  height: "195px",
                  width: "645px",
                }}
              >
                {data.output.default.split("\n").map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
                {data.output.success.split("\n").map((line, index) => (
                  <div key={index} className="text-output-green">
                    {line}
                  </div>
                ))}
                {data.output.error.split("\n").map((line, index) => (
                  <div key={index} className="text-danger">
                    {line}
                  </div>
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
