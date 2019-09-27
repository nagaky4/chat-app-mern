import React, { Component } from "react";
import { Tabs, Tab, Form, Row, Col, Button } from "react-bootstrap";

import "./Profile.scss";

import Dropzone from "../../shared/dropzone/Dropzone";
const API = "http://localhost:3001/api/user/avatar";
export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "infor",
      isUpdateAvatar: false
    };
  }
  render() {
    return (
      <div className="profile-page">
        <div className="profi-left">
          {this.state.isUpdateAvatar ? (
            <Dropzone api={API} paramName="userAvatar" />
          ) : (
            <div className="pf-l--avatar">
              <img alt="avatar" src="/img/user1.jpg" />
            </div>
          )}
          <div className="pf-l--button">
            {this.state.isUpdateAvatar ? (
              <button
                type="button"
                className="btn btn-warning"
                onClick={() =>
                  this.setState({
                    ...this.state,
                    isUpdateAvatar: !this.state.isUpdateAvatar
                  })
                }
              >
                cancel
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  this.setState({
                    ...this.state,
                    isUpdateAvatar: !this.state.isUpdateAvatar
                  })
                }
              >
                change
              </button>
            )}
          </div>
        </div>
        <div className="profi-right">
          <Tabs
            activeKey={this.state.key}
            onSelect={k => this.setState({ ...this.state, key: k })}
          >
            <Tab eventKey="infor" title="Infor">
              <Form>
                <Form.Group as={Row} controlId="formPlaintextFistName">
                  <Form.Label column sm="4">
                    First Name :
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control plaintext readOnly defaultValue="Lisa" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextLastName">
                  <Form.Label column sm="4">
                    Last Name :
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control plaintext readOnly defaultValue="Manik" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextGender">
                  <Form.Label column sm="4">
                    Gender :
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control plaintext readOnly defaultValue="Female" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextGender">
                  <Form.Label column sm="4">
                    Gender :
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control plaintext readOnly defaultValue="Female" />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextBtnEdit">
                  <Button className="btn-edit" variant="primary" type="button">
                    Edit
                  </Button>
                </Form.Group>
              </Form>
            </Tab>
            <Tab eventKey="security" title="Security">
              <Form>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                  <Form.Label column sm="6">
                    Password :
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control type="password" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextNewPass">
                  <Form.Label column sm="6">
                    New Password :
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control type="password" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextConfirmNewPass">
                  <Form.Label column sm="6">
                    Confirm New Password :
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control type="password" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextBtnSubmit">
                  <Button
                    className="btn-change-pass"
                    variant="primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Profile;
