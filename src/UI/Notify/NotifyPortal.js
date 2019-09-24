import React, { Component } from "react";

import ReactDom from "react-dom";

import * as classes from "./NotifyPortal.module.css";

class NotifyPortal extends Component {
  render() {
    return ReactDom.createPortal(
      <div className={classes.NotifyPortalContainer}>
        <div className="alert alert-success" role="alert">
          {this.props.message}
          <span className="fa fa-check" style={{ fontSize: "30px" }}></span>
        </div>
      </div>,
      document.getElementById("notify-portal")
    );
  }
}

export default NotifyPortal;
