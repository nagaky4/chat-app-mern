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

  handleSubmit = values => {
    this.setState({ ...this.state, isLoading: true });
    const user = values;
    console.log(user);
    axios
      .post(`${BASE_URL}/user`, { user: user })
      .then(res => {
        if (res && res.status === 200) {
          console.log("insert success");
          this.setState({
            isLoading: false,
            registerSucces: true
          });
          setTimeout(() => {
            this.setState({
              ...this.state,
              registerSucces: false
            });
          }, 2000);
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
              <Button
                variant="primary"
                type="submit"
                onClick={() => this.props.history.push("/login")}
              >
                Login now
              </Button>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
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
      </div>
    );
  }
}

export default Register;
