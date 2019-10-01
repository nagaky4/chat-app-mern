import React, { Component } from "react";
import { Tabs, Tab, Form, Row, Col, Button } from "react-bootstrap";

export class ProfileRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "infor",
      isEditForm: false,
      formUser: {
        firstName: props.user.profile.firstName || "",
        lastName: props.user.profile.lastName || "",
        gender: props.user.profile.gender || ""
      }
    };
  }

  onHandleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      ...this.state,
      formUser: {
        ...this.state.formUser,
        [name]: value
      }
    });
  };

  editFrom = (e) => {
    e.preventDefault();
    this.setState({ ...this.state, isEditForm: true });
  };

  submitForm = e => {
    e.preventDefault();
    console.log(this.state.formUser);
    this.setState({
      ...this.state,
      isEditForm: false
    });
  };

  render() {
    const { user } = this.props;
    return (
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
                  <Form.Control
                    readOnly={this.state.isEditForm ? false : true}
                    name="firstName"
                    onChange={this.onHandleChange}
                    value={this.state.formUser.firstName}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextLastName">
                <Form.Label column sm="4">
                  Last Name :
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    readOnly={this.state.isEditForm ? false : true}
                    name="lastName"
                    onChange={this.onHandleChange}
                    value={this.state.formUser.lastName}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextGender">
                <Form.Label column sm="4">
                  Gender :
                </Form.Label>
                <Col sm="8">
                  <Form.Control
                    readOnly={this.state.isEditForm ? false : true}
                    name="gender"
                    onChange={this.onHandleChange}
                    value={this.state.formUser.gender}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextGender">
                <Form.Label column sm="4">
                  Email :
                </Form.Label>
                <Col sm="8">
                  <Form.Control readOnly value={user.email} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextBtnEdit">
                {this.state.isEditForm ? (
                  <Button
                    className="btn-edit"
                    type="submit"
                    variant="primary"
                    onClick={this.submitForm}
                  >
                    submit
                  </Button>
                ) : (
                  <Button
                    className="btn-edit"
                    variant="warning"
                    type="button"
                    onClick={this.editFrom}
                  >
                    Edit
                  </Button>
                )}
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
    );
  }
}

export default ProfileRight;
