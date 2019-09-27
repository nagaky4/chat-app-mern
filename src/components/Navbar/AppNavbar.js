import React from "react";
import { connect } from "react-redux";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
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
      </Nav>
      <Nav className="ml-auto ">
        {props.isLogin ? (
          <>
            <div className="img-avatar">
              <img src="/img/user1.jpg" alt="" />
            </div>
            <NavDropdown className="my-nav-dropdown">
              <NavLink
                className="dropdown-item"
                exact
                activeClassName="active"
                to="/profile"
              >
                Profile
              </NavLink>

              <NavLink
                className="dropdown-item"
                exact
                activeClassName="active"
                to="/logout"
              >
                Logout
              </NavLink>
            </NavDropdown>
          </>
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
