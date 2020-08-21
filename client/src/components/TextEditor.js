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
    <div className="mt-2 mb-0 border border-white ">
      <Editor
        height="80vh"
        theme="dark"
        language={data.language}
        value={data.code}
        editorDidMount={handleEditorDidMount}
      />
    </div>
  );
};

export default TextEditor;
