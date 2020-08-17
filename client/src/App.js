import React from "react";
import AppNavbar from "./components/AppNavbar";
import Room from "./pages/Room";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import DataContextProvider from "./dataContext";

function App() {
  return (
    <Router>
      <AppNavbar />
      <Route path="/" component={Home} exact />
      <DataContextProvider>
        <Route path="/room" component={Room} />
      </DataContextProvider>
    </Router>
  );
}

export default App;
