import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/home/Home";
import Login from "../components/login/Login";
import Logout from "../components/logout/Logout";

import WithAuth from "../HOC/WithAuth";

import Register from "../components/register/Register";
import Chat from "../components/chat/Chat";
import Profile from "../components/profile/Profile";

export default function MyRoute() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/logout" exact component={Logout} />

        <WithAuth>
          <Route path="/chat" exact={true} component={Chat} />
          <Route path="/profile" exact={true} component={Profile} />
        </WithAuth>
        <Route path="/**" component={Login} />
      </Switch>
    </>
  );
}
