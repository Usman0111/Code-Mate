import React, { useRef, useEffect, useContext } from "react";
import Editor from "@monaco-editor/react";
import { socket } from "../socket";
import { DataContext } from "../dataContext";

const TextEditor = () => {
  const { data, dispatch } = useContext(DataContext);
  const dataRef = useRef(data);
  dataRef.current = data;
  const valueGetter = useRef();

  useEffect(() => {
    socket.on("changedCode", (newCode) => {
      dispatch({ type: "EDIT_CODE", newCode });
    });
  }, [dispatch]);

  const logKey = (e) => {
    dispatch({ type: "EDIT_CODE", newCode: valueGetter.current() });
    socket.emit("editCode", valueGetter.current());
  };

  const handleEditorDidMount = (_valueGetter) => {
    valueGetter.current = _valueGetter;
    document.addEventListener("keydown", logKey);
    document.addEventListener("keyup", logKey);
  };

  return (
    <>
      <Editor
        height="90vh"
        language={data.language}
        value={data.code}
        editorDidMount={handleEditorDidMount}
      />
    </>
  );
};

export default TextEditor;
