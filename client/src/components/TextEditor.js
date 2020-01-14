import React from "react";
import Editor from "@monaco-editor/react";

const TextEditor = () => {
  return (
    <>
      <Editor
        height="85vh"
        language="cpp"
        value={
          '#include <iostream>\r\nusing namespace std;\r\nint main()\r\n{\r\n    cout << "Hello World" << endl;\r\n    return 0;\r\n}\r\n'
        }
        theme="dark"
        width="100%"
      />
    </>
  );
};

export default TextEditor;
