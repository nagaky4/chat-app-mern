import React from "react";
import { connect } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import "./AppNavbar.css";
const AppNavbar = props => {
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
        {props.isLogin ? (
          <NavLink className="nav-link" to="/logout" activeClassName="active">
            Logout
          </NavLink>
        ) : (
          <NavLink className="nav-link" to="/login" activeClassName="active">
            Login
          </NavLink>
        )}
      </Nav>
    </Navbar>
  );
};

const mapStateToProps = state => {
  return {
    isLogin: state.authenUser.isLogin
  };
};

export default connect(
  mapStateToProps,
  null
)(AppNavbar);
