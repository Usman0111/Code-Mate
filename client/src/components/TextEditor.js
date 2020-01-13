import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";

const TextEditor = () => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const valueGetter = useRef();

  const handleEditorDidMount = _valueGetter => {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  };

  const handleShowValue = () => {
    console.log(valueGetter.current());
  };

  return (
    <>
      <button
        style={{ float: "right" }}
        onClick={handleShowValue}
        disabled={!isEditorReady}
      >
        Show value
      </button>

      <Editor
        height="85vh"
        language="cpp"
        value={
          '#include <iostream>\r\nusing namespace std;\r\nint main()\r\n{\r\n    cout << "Hello World" << endl;\r\n    return 0;\r\n}\r\n'
        }
        theme="dark"
        width="50%"
        editorDidMount={handleEditorDidMount}
      />
    </>
  );
};

export default TextEditor;
