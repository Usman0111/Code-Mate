import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const TextEditor = props => {
  const [isEditorReady, setIsEditorReady] = useState(false);

  const handleEditorDidMount = _valueGetter => {
    setIsEditorReady(!isEditorReady);
    props.valueGetter.current = _valueGetter;
  };

  return (
    <>
      <Editor
        height="87vh"
        language="cpp"
        value={
          '#include <iostream>\r\nusing namespace std;\r\nint main()\r\n{\r\n    cout << "Hello World" << endl;\r\n    cout << "Hello World" << endl;\r\n    cout << "Hello World" << endl;\r\n    return 0;\r\n}\r\n'
        }
        theme="dark"
        width="100%"
        editorDidMount={handleEditorDidMount}
      />
    </>
  );
};

export default TextEditor;
