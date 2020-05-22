import React from "react";
import AppNavbar from "./components/AppNavbar";
import Room from "./pages/Room";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <AppNavbar />
      <Route path="/" component={Home} exact />
      <Route path="/room" component={Room} />
    </Router>
  );
}

export default App;
