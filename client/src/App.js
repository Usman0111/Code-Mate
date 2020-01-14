import React from "react";
import AppNavbar from "./components/AppNavbar";
import TextEditor from "./components/TextEditor";
import IoPanel from "./components/IoPanel";
import Chat from "./components/Chat";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AppNavbar />

      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <TextEditor />
          </div>
          <div class="col-sm-6">
            <div class="row h-50 d-inline-block">
              <IoPanel />
            </div>
            <div class="row h-50 d-inline-block">
              <Chat />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
