import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./Login.scss";
import LoginForm from "../../shared/form-login/LoginForm";
import { connect } from "react-redux";
import * as userActions from "../../actions/user";

export class Login extends Component {
  handleLogin = values => {
    console.log(values);
    this.props.submitLogin(values);
  };

  render() {
    if (this.props.isLogin) {
      return <Redirect to="/chat" />;
    }
    return (
      <div className="app-login row">
        <div className="col-sm-6 text-center">
          <div className="p-login-left">
            <div className="p-intro">
              <div className="p-login-img">
                <img src="/img/bg-1.png" alt="" />
              </div>
              <div className="pig-text">Happy app ^^</div>
              <div className="normal-text"> make us closer together!</div>
            </div>
            <div className="p-regis">
              <div className="p-ques-regis">Do you have an account ?</div>
              <Button
                variant="primary"
                type="submit"
                onClick={() => this.props.history.push("/register")}
              >
                Register now
              </Button>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="p-login-right">
            <div className="f-login">
              <div className="big-text-login">Login</div>
              <LoginForm onSubmit={this.handleLogin} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.authenUser.isLogin
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    submitLogin: user => {
      dispatch(userActions.submitLogin(user));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
