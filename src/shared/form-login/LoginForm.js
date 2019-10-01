import React from "react";
import { Field, reduxForm } from "redux-form";
import { Form, Button, Col, Row } from "react-bootstrap";

import { connect } from "react-redux";
import { compose } from "redux";
import "./LoginForm.css";

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <>
    <Form.Label column sm="2">
      {label}
    </Form.Label>
    <Col sm="10">
      <Form.Control {...input} placeholder={label} type={type} />
    </Col>
    {touched &&
      (error && (
        <span className="m-auto" style={{ color: "red" }}>
          {error}
        </span>
      ))}
  </>
);

const LoginForm = props => {
  const { handleSubmit, valid } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row}>
        <Field
          name="email"
          type="email"
          component={renderField}
          label="Email"
        />
      </Form.Group>
      <Form.Group as={Row}>
        <Field
          name="password"
          type="password"
          component={renderField}
          label="password"
        />
      </Form.Group>
      {props.errLogin && <div className="mes-err">{props.errLogin}</div>}
      <Button variant="primary" type="submit" disabled={!valid}>
        Submit
      </Button>
    </Form>
  );
};

const mapStateToProps = state => {
  return {
    errLogin: state.authen.err
  };
};

export default compose(
  reduxForm({
    form: "form-login",
    validate
  }),
  connect(
    mapStateToProps,
    null
  )
)(LoginForm);

// reduxForm({
//   form: "form-login",
//   validate
// })(LoginForm);
