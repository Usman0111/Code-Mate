import React from "react";
import AppNavbar from "./components/AppNavbar";
import TextEditor from "./components/TextEditor";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <TextEditor />
    </div>
  );
}

export default App;
