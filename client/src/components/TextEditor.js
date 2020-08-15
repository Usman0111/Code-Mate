import React, { useState, useEffect, useReducer, useRef } from "react";
import { ControlledEditor } from "@monaco-editor/react";
import { socket } from "../socket.js";

const TextEditor = (props) => {
  const [code, setCode] = useState("");

  useEffect(() => {
    socket.on("ChangedCode", (change) => {
      setCode(change);
    });
  }, []);

  useEffect(() => console.log("render"), []);

  const handleEditorChange = (ev, value) => {
    //socket.emit("editCode", value);
  };

  return (
    <>
      <ControlledEditor
        height="87vh"
        language="cpp"
        value={code}
        theme="dark"
        width="100%"
        onChange={handleEditorChange}
      />
    </>
  );
};

export default TextEditor;
