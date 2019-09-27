import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import RegisterForm from "../../shared/form-register/RegisterForm";
import { BASE_URL } from "../../const/index";
import NotifyPortal from "../../UI/Notify/NotifyPortal";

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      registerSucces: false
    };
  }

  timer = null;

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  handleSubmit = values => {
    this.setState({ ...this.state, isLoading: true });
    const user = values;
    axios
      .post(`${BASE_URL}/register`, { user: user })
      .then(res => {
        if (res && res.status === 200) {
          this.setState({
            isLoading: false,
            registerSucces: true
          });
          if (this.timer) {
            clearTimeout(this.timer);
          } else {
            this.timer = setTimeout(() => {
              this.setState({
                ...this.state,
                registerSucces: false
              });
            }, 2000);
          }
        }
      })
      .catch(err => {
        console.log("errr", err);
        this.setState({
          ...this.state,
          isLoading: false
        });
      });
  };

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
            <Button
              variant="primary"
              type="submit"
              onClick={() => this.props.history.push("/login")}
            >
              Login now
            </Button>
          </div>
        </div>

        <div className="p-login-right">
          <div className="f-login">
            <div className="big-text-login">Register</div>
            <RegisterForm
              onSubmit={this.handleSubmit}
              isLoading={this.state.isLoading}
              registerSucces={this.state.registerSucces}
            />
            {this.state.registerSucces && (
              <NotifyPortal message="Đăng ký tài khoản thành công!" />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
