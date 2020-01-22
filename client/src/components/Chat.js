import React from "react";
import { Input } from "reactstrap";

const Example = props => {
  return (
    <div>
      <h3 className="text-secondary">Chat Room</h3>
      <div className="card">
        <div className="card-body" style={{ height: "240px", width: "750px" }}>
          Place Holder for the chat Room
        </div>
        <Input />
      </div>
    </div>
  );
};

export default Example;
