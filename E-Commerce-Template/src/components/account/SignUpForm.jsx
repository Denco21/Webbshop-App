import React from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { Link } from "react-router-dom";
import renderFormField from "../../helpers/renderFormField";
import { useNavigate } from "react-router-dom";
// import renderFormRadio from "../../helpers/renderFormRadio";
import {
  required,
  maxLength20,
  minLength6,
  maxLengthMobileNo,
  minLengthMobileNo,
  digit,
  name,
} from "../../helpers/validation";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg";
import { useFormik } from 'formik';
import Axios from 'axios';


const SignUpForm = (props) => {

  const navigate = useNavigate();
  const { submitting } = props;

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      Name: '',
      Email: '',
      Number: '',
      Password: '',
      Confirm_Password: '',
      Role: '',
    },
    onSubmit: (values, action) => {
      Axios.post('http://127.0.0.1:8090/api/register', {
        Name: values.Name,
        Email: values.Email,
        Number: values.Number,
        Password: values.Password,
        Role: values.Role
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        if(res){
          navigate("/account/signin")
        }
      });
      action.resetForm();
    },
  });


  return (
    <form
      onSubmit={handleSubmit}
    >
      <Field
        name="Name"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.Name}
        id="Name"
        type="text"
        label="Name"
        component={renderFormField}
        placeholder="Name"
        validate={[required, name]}
        required={true}
        aria-describedby="Name"
      />
      <Field
        name="Email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.Email}
        id="Email"
        type="email"
        label="Email"
        component={renderFormField}
        placeholder="Email"
        validate={[required, name]}
        required={true}
        aria-describedby="Email"
      />
      <Field
        name="Number"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.Number}
        id="Number"
        type="number"
        label="Mobile No."
        component={renderFormField}
        placeholder="Mobile No."
        icon={IconPhone}
        validate={[required, maxLengthMobileNo, minLengthMobileNo, digit]}
        required={true}
        max="999999999999999"
        min="9999"
        aria-describedby="Number"
        className="mb-2"
      />
      <Field
        name="Password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.Password}
        id="Password"
        type="password"
        label="Password"
        component={renderFormField}
        placeholder="Password"
        icon={IconShieldLock}
        validate={[required, maxLength20, minLength6]}
        required={true}
        maxLength="20"
        minLength="6"
        className="mb-2"
      />
      <Field
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        component={renderFormField}
        placeholder="Confirm Password"
        icon={IconShieldLock}
        validate={[required, maxLength20, minLength6]}
        required={true}
        maxLength="20"
        minLength="6"
        className="mb-2"
      />
      <div>
        <label className="mb-2 ">SignUp as a :- </label>
        <div className="d-flex flex-row mb-2">
          <div className="me-5">
            <label>
              <Field
                name="Role"
                onChange={handleChange}
                component="input"
                type="radio"
                value="Admin"
              />
              Admin
            </label>
          </div>
          <div>
            <label>
              <Field
                onChange={handleChange}
                name="Role"
                component="input"
                type="radio"
                value="User"
              />
              User
            </label>
          </div>
        </div>
      </div>
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary mb-3"
          disabled={submitting}
        >
          Create
        </button>
      </div>
      <Link className="float-start" to="/account/signin" title="Sign In">
        Sign In
      </Link>
      <Link
        className="float-end"
        to="/account/forgotpassword"
        title="Forgot Password"
      >
        Forgot password?
      </Link>
    </form>
  );
};

export default compose(
  reduxForm({
    form: "signup",
  })
)(SignUpForm);
