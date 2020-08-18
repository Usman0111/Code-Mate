import React, { useRef, useEffect, useContext } from "react";
import Editor from "@monaco-editor/react";
import { socket } from "../socket";
import { DataContext } from "../dataContext";

const TextEditor = () => {
  //const [isEditorReady, setIsEditorReady] = useState(false);
  const { data, dispatch } = useContext(DataContext);
  const dataRef = useRef(data);
  dataRef.current = data;
  const valueGetter = useRef();

  useEffect(() => {
    socket.on("changedCode", (info) => {
      //console.log("receiveCode")
      //if (info.language === data.language) {
      dispatch({ type: "EDIT_CODE", newCode: info.code });
      //}
    });
  }, [dispatch, data.language]);

  const logKey = (e) => {
    //console.log("emitCode");

    dispatch({ type: "EDIT_CODE", newCode: valueGetter.current() });
    socket.emit("editCode", {
      code: valueGetter.current(),
      //language: dataRef.current.language,
    });
  };

  const handleEditorDidMount = (_valueGetter) => {
    //setIsEditorReady(true);
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
