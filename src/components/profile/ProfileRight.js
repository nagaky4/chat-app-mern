import React, { Component } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { connect } from "react-redux";

import * as userActions from "../../actions/user";
import FormUpdateUser from "./form-update/FormUpdateUser";
import FormChangePass from "./form-update/FormChangePass";
export class ProfileRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "infor"
     
    };
  }

  submitForm = values => {
    const user = {
      profile: {
        firstName: values.firstName,
        lastName: values.lastName,
        age: values.age,
        avatar: values.avatar,
        gender: values.gender
      },
      email: values.email
    };
    this.props.updateUser(user);
  };

  submitChangePass = values => {
    const { user } = this.props;
    const data = {
      email: user.email,
      password: values.password,
      newpassword: values.newpassword
    };
    this.props.changePassUser(data);
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
            <FormUpdateUser
              onSubmit={this.submitForm}
              initialValues={{ ...user.profile, email: user.email }}
            />
          </Tab>
          <Tab eventKey="security" title="Security">
            <FormChangePass onSubmit={this.submitChangePass} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => {
      dispatch(userActions.updateUser(user));
    },
    changePassUser: user => {
      dispatch(userActions.changePassUser(user));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ProfileRight);
