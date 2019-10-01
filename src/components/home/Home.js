import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import "./Home.scss";

export class Home extends Component {
  render() {
    return (
      <div className="app-home row">
        <div className="page-left col-sm-8">
          <div className="big-text m-auto">
            {" "}
            {this.props.user && this.props.user.email
              ? `Hello ${this.props.user.email}, Nice to meet you ^^`
              : "Wellcome ^^"}{" "}
          </div>
          <Button
            className="let-chat"
            variant="primary"
            onClick={() => this.props.history.push("/login")}
          >
            Let's chat now
          </Button>
        </div>
        <div className="page-right col-sm-4">
          <div className="phone ">
            <div className="p-media row">
              <div className="p-camera"></div>
              <div className="p-mic"></div>
              <div className="p-sensor"></div>
            </div>
            <div className="p-head col-sm-12">
              <div className="icon-head">
                <i className="fa fa-wifi"></i>
                <i className="fa fa-battery-half icon-battery"></i>
                <span> 13:42 PM</span>
              </div>
              <div className="lemon">nanako</div>
              <div className="icon-call">
                <i className="fa fa-phone"></i>
              </div>
            </div>
            <div className="p-body col-sm-12">
              <div className="p-chat-item-left">
                <div className="img-item">
                  <img src="/img/user1.jpg" alt="" />
                </div>
                <p className="p-chat-text">Hello how are you today</p>
                <div className="per-name">Lisa</div>
              </div>

              <div className="p-chat-item-right">
                <div className="img-item">
                  <img src="/img/user2.jpg" alt="" />
                </div>
                <p className="p-chat-text">i'm ok thanks</p>
                <div className="per-name">nanako</div>
              </div>

              <div className="p-chat-item-left">
                <div className="img-item">
                  <img src="/img/user1.jpg" alt="" />
                </div>
                <p className="p-chat-text">Have a nice day nanako</p>
                <div className="per-name">Lisa</div>
              </div>

              <div className="p-chat-item-right">
                <div className="img-item">
                  <img src="/img/user2.jpg" alt="" />
                </div>
                <p className="p-chat-text">You too !</p>
                <div className="per-name">nanako</div>
              </div>
            </div>

            <div className="p-footer">
              <div className="fo-input"></div>
              <div className="fo-send">
                <i className="fa fa-paper-plane"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.authen.isLogin,
    user: state.authen.token
  };
};

export default connect(
  mapStateToProps,
  null
)(Home);
