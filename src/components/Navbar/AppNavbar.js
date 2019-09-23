import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import "./AppNavbar.css";
export default function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark">
      <NavLink
        className="navbar-brand nav-link"
        to="/"
        activeClassName="active"
      >
        Chatapp
      </NavLink>
      <Nav className="m-auto ">
        <NavLink className="nav-link" to="/" exact activeClassName="active">
          Home
        </NavLink>
        <NavLink className="nav-link" to="/login" activeClassName="active">
          Login
        </NavLink>
        {/* <NavLink className="nav-link" to="/logout" activeClassName="active">
          Logout
        </NavLink> */}
      </Nav>
    </Navbar>
  );
}
