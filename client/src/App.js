import React, { useRef } from "react";
import AppNavbar from "./components/AppNavbar";
import TextEditor from "./components/TextEditor";
import IoPanel from "./components/IoPanel";
import Chat from "./components/Chat";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const valueGetter = useRef();

  return (
    <div className="App">
      <AppNavbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <TextEditor valueGetter={valueGetter} />
          </div>
          <div className="col-sm-6">
            <div className="row h-50 d-inline-block">
              <IoPanel valueGetter={valueGetter} />
            </div>
            <div className="row h-50 d-inline-block">
              <Chat />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
