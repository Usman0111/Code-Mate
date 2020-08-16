import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { socket } from "../socket";

const TextEditor = () => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const valueGetter = useRef();
  const [code, setCode] = useState("const a;");

  useEffect(() => {
    socket.on("changedCode", (newCode) => {
      //console.log("receiveCode");
      setCode(newCode);
    });
  }, []);

  const logKey = (e) => {
    //console.log("emitCode");
    socket.emit("editCode", valueGetter.current());
  };

  const handleEditorDidMount = (_valueGetter) => {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
    document.addEventListener("keydown", logKey);
    document.addEventListener("keyup", logKey);
  };

  return (
    <>
      <Editor
        height="90vh"
        language="javascript"
        value={code}
        editorDidMount={handleEditorDidMount}
      />
    </>
  );
};

export default TextEditor;
