import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormGroup
} from "reactstrap";

import classnames from "classnames";

const IoPanel = props => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink>Run</NavLink>
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
              <textarea rows="8" cols="102"></textarea>
            </FormGroup>
          </Form>
        </TabPane>
        <TabPane tabId="2">
          <div>
            <div class="card">
              <div
                class="card-body"
                style={{ height: "200px", width: "750px" }}
              >
                Press Run
              </div>
            </div>
          </div>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default IoPanel;
