import React from "react";
import { Field, reduxForm } from "redux-form";
import { Form, Col, Button, Row } from "react-bootstrap";

const validate = values => {
  const errors = {};
  if (!values.password) {
    errors.password = "Required";
  }
  if (!values.newpassword) {
    errors.newpassword = "Required";
  }
  if (!values.confimpassword) {
    errors.confimpassword = "Required";
  }
  if (values.newpassword !== values.confimpassword) {
    errors.confimpassword = "confirm password not match";
  }
  return errors;
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <>
    <Form.Label column sm="6">
      {label} :
    </Form.Label>
    <Col sm="6">
      <Form.Control {...input} type={type} />
      {touched &&
        (error && (
          <span className="m-auto" style={{ color: "red" }}>
            {error}
          </span>
        ))}
    </Col>
  </>
);

const FormChangePass = props => {
  const { handleSubmit, valid } = props;

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <Form.Group as={Row} controlId="formPlaintextPassword">
        <Field
          label="Password"
          name="password"
          type="password"
          component={renderField}
        />
      </Form.Group>

      <Form.Group as={Row} controlId="formPlaintextNewPass">
        <Field
          label="New Password"
          name="newpassword"
          type="password"
          component={renderField}
        />
      </Form.Group>

      <Form.Group as={Row} controlId="formPlaintextConfirmNewPass">
        <Field
          label="Confirm New Password"
          name="confimpassword"
          type="password"
          component={renderField}
        />
      </Form.Group>

      <Form.Group as={Row} controlId="formPlaintextBtnSubmit">
        <Button
          disabled={!valid}
          className="btn-change-pass"
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
};

export default reduxForm({
  form: "form-change-pass",
  validate
})(FormChangePass);
