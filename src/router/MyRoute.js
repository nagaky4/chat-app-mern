import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/home/Home";
import Login from "../components/login/Login";
import Logout from "../components/logout/Logout";

import Register from "../components/register/Register";
import Chat from "../components/chat/Chat";
import WithAuth from "../HOC/WithAuth";
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
        </WithAuth>
      </Switch>
    </>
  );
}
