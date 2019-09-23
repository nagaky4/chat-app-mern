import React, { Component } from "react";

import { Form, Button, Col, Row } from "react-bootstrap";

import "./Login.scss";
export class Login extends Component {
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
              <div className="p-ques-regis">
                Do you have account ?{" "}
                <span className="p-text-highlight"> register </span> now
              </div>
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
              <Form>
                <Form.Group as={Row} controlId="formPlaintextEmail">
                  <Form.Label column sm="2">
                    Email
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      defaultValue="email@example.com"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextPassword">
                  <Form.Label column sm="2">
                    Password
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="password" placeholder="Password" />
                  </Col>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
