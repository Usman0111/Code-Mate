import React, { useState, useContext } from "react";
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

const IoPanel = (props) => {
  const { data, dispatch } = useContext(DataContext);

  const toggle = (tab) => {
    if (data.activeTab !== tab) dispatch({ type: "SET_TAB", tab });
  };

  const changeInput = (event) => {};

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
            Input
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: data.activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Output
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={data.activeTab}>
        <TabPane tabId="1">
          <Form>
            <FormGroup>
              <textarea
                value={""}
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
                {data.output.split("\n").map((line, index) => (
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
