import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";

const validate = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }
  if (!values.age) {
    errors.age = "Required";
  }
  if (typeof parseInt(values.age) !== "number" || parseInt(values.age) <= 0) {
    errors.age = "Age is not valid";
  }
  if (!values.gender) {
    errors.gender = "Required";
  }

  return errors;
};

const renderField = ({
  input,
  label,
  type,
  disabled,
  meta: { touched, error }
}) => (
  <>
    <Form.Label column sm="4">
      {label} :
    </Form.Label>
    <Col sm="8">
      <Form.Control {...input} type={type} disabled={disabled} />
      {!disabled &&
        touched &&
        (error && (
          <span className="m-auto" style={{ color: "red" }}>
            {error}
          </span>
        ))}
    </Col>
  </>
);

const FormUpdateUser = props => {
  const [isEdit, setIsEdit] = useState(false);

  const { handleSubmit, valid, reset } = props;
  const onEdit = () => {
    setIsEdit(true);
  };
  const onCancel = () => {
    setIsEdit(false);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <Form.Group as={Row} controlId="formPlaintextFistName">
        <Field
          name="firstName"
          label="FirstName"
          type="input"
          component={renderField}
          disabled={isEdit ? false : true}
        />
      </Form.Group>

      <Form.Group as={Row} controlId="formPlaintextLastName">
        <Field
          name="lastName"
          label="LastName"
          type="input"
          component={renderField}
          disabled={isEdit ? false : true}
        />
      </Form.Group>
      <Form.Group as={Row} controlId="formPlaintextAge">
        <Field
          name="age"
          label="Age"
          component={renderField}
          type="number"
          placeholder="Age"
          disabled={isEdit ? false : true}
        />
      </Form.Group>
      <Form.Group as={Row} controlId="formPlaintextGender">
        <Form.Label column sm="4">
          Gender :
        </Form.Label>
        <Col sm="8">
          <Field
            className="form-control"
            name="gender"
            label="Gender"
            component="select"
            disabled={isEdit ? false : true}
          >
            <option value="">Choose gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="another">Another</option>
          </Field>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formPlaintextGender">
        <Field
          name="email"
          label="Email"
          type="input"
          disabled
          component={renderField}
        />
      </Form.Group>
      <Form.Group as={Row} controlId="formPlaintextBtnEdit">
        <Button
          className="btn-edit"
          type="submit"
          variant="primary"
          disabled={!valid}
          style={isEdit ? {} : { display: "none" }}
        >
          submit
        </Button>
        {isEdit ? (
          <>
            <Button
              className="btn-edit"
              variant="warning"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              className="btn-edit"
              variant="warning"
              type="button"
              onClick={onEdit}
            >
              Edit
            </Button>
          </>
        )}
      </Form.Group>
    </Form>
  );
};

export default reduxForm({
  form: "form-update-user",
  validate
})(FormUpdateUser);
