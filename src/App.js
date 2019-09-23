import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import {} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyRoute from "./router/MyRoute";
import AppNavbar from "./components/Navbar/AppNavbar";

function App() {
  return (
    <Router>
      <div className="container">
        <AppNavbar />

        <MyRoute />
      </div>
    </Router>
  );
}

export default App;
