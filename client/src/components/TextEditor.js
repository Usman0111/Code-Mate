import React, { useRef, useEffect, useContext } from "react";
import Editor from "@monaco-editor/react";
import { socket } from "../socket";
import { DataContext } from "../dataContext";

const TextEditor = () => {
  //const [isEditorReady, setIsEditorReady] = useState(false);
  const { data, dispatch } = useContext(DataContext);
  const valueGetter = useRef();

  useEffect(() => {
    socket.on("changedCode", (newCode) => {
      //console.log("receiveCode")
      dispatch({ type: "EDIT_CODE", newCode });
    });
  }, [dispatch]);

  const logKey = (e) => {
    //console.log("emitCode");
    dispatch({ type: "EDIT_CODE", newCode: valueGetter.current() });
    socket.emit("editCode", valueGetter.current());
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
        language="cpp"
        value={data.code}
        editorDidMount={handleEditorDidMount}
      />
    </>
  );
};

export default TextEditor;
