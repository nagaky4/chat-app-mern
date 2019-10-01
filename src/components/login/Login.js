import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./Login.scss";
import LoginForm from "../../shared/form-login/LoginForm";
import { connect } from "react-redux";
import * as authenActions from "../../actions/authen";

export class Login extends Component {
  handleLogin = values => {
    this.props.submitLogin(values);
  };

  componentDidMount() {
    if (this.props && this.props.isLogin) {
      this.props.history.push("/chat");
    }
  }

  componentDidUpdate() {
    if (this.props && this.props.isLogin) {
      this.props.history.push("/chat");
    }
  }

  render() {
    return (
      <div className="app-login row">
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
        <div className="p-login-right">
          <div className="f-login">
            <div className="big-text-login">Login</div>
            <LoginForm onSubmit={this.handleLogin} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.authen.isLogin
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    submitLogin: user => {
      dispatch(authenActions.submitLogin(user));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
