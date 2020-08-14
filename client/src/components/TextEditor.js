import React from "react";
import { ControlledEditor } from "@monaco-editor/react";
import { socket } from "../socket.js";

const TextEditor = (props) => {
  // const setCode = (code) => props.setCode(code);

  const handleEdiorChange = (ev, value) => {
    socket.emit("editCode", value);
    props.setCode(value);
  };

  return (
    <>
      <ControlledEditor
        height="87vh"
        language="cpp"
        value={props.code}
        theme="dark"
        width="100%"
        onChange={handleEdiorChange}
      />
    </>
  );
};

export default TextEditor;
