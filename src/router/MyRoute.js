import React from "react";
import { Route } from "react-router-dom";
import Home from "../components/home/Home";
import Login from "../components/login/Login";
import Logout from "../components/logout/Logout";

import Register from "../components/register/Register";

export default function MyRoute() {
  return (
    <>
      <Route path="/" exact component={Home} />
      <Route path="/login/" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/logout/" component={Logout} />
    </>
  );
}
