import React from "react";
import { Field, reduxForm } from "redux-form";
import { Form, Button, Col, Row } from "react-bootstrap";
import Spiner from "../spiner/Spiner";

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

  if (!values.repassword) {
    errors.repassword = "Required";
  } else if (values.password !== values.repassword) {
    errors.repassword = "password not match";
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

const RegisterForm = props => {
  const { handleSubmit, valid, reset } = props;
  if (props.registerSucces) {
    reset();
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row}>
        <Field
          name="email"
          type="email"
          component={renderField}
          label="email"
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

      <Form.Group as={Row}>
        <Field
          name="repassword"
          type="password"
          component={renderField}
          label="repassword"
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={!valid}>
        Submit {props.isLoading && <Spiner />}
      </Button>
    </Form>
  );
};

export default reduxForm({
  form: "form-register",
  validate
})(RegisterForm);
