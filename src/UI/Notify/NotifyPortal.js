import React, { Component } from "react";

import ReactDom from "react-dom";

import * as classes from "./NotifyPortal.module.css";

class NotifyPortal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
  }
  timer = null;
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({
        isOpen: false
      });
    }, this.props.time || 2000);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    if (this.state.isOpen)
      return ReactDom.createPortal(
        <div className={classes.NotifyPortalContainer}>
          <div
            className={
              this.props.className
                ? this.props.className
                : "alert alert-success"
            }
            role="alert"
          >
            {this.props.message}
            <span className="fa fa-check" style={{ fontSize: "30px" }}></span>
          </div>
        </div>,
        document.getElementById("notify-portal")
      );
    else return null;
  }
}

export default NotifyPortal;
