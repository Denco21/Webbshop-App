import React from "react";
import {Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import {
  required,
  maxLength20,
  minLength8,
  maxLengthMobileNo,
  minLengthMobileNo,
  digit,
} from "../../helpers/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg";
import { useFormik } from 'formik';
import Axios from 'axios';
import * as Yup from 'yup'

const SignupSchema = Yup.object({
  Email: Yup.string().email().required('Please enter your email'),
  Password: Yup.string().min(6).required('Please enter your password'),
});



const SignInForm = (props) => {

  const navigate = useNavigate();
  const { submitting } = props;

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      Email: '',
      Password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: (values, action) => {
      Axios.post('http://127.0.0.1:8090/api/login', {
        Email: values.Email,
        Password: values.Password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        if (res.data.recordset.length > 0) {
          if (res.data.recordset[0].Role === 'Admin') {
            navigate("/account/admin");
            alert("LoggedIn as a Admin")
          } else if (res.data.recordset[0].Role === 'User') {
            navigate("/");
            alert("LoggedIn as a User")
          }
        } else {
          res.send('Username and/or Password not found');
        }
      });
      action.resetForm();
    },
  });
  return (
    <form
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <Field
          name="Email"
          id="Email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.Email}
          type="string"
          label="Email"
          component={renderFormGroupField}
          placeholder="Email"
          icon={IconPhone}
          validate={[required, maxLengthMobileNo, minLengthMobileNo, digit]}
          required={true}
        />
        {
          errors.Email && touched.Email ? (
            <p className="text-danger position-absolute">{errors.Email}</p>
          ) : null
        }
      </div>
      <div className="mb-5">
        <Field
          name="Password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.Password}
          id="Password"
          type="password"
          label="Password"
          component={renderFormGroupField}
          placeholder="Password"
          icon={IconShieldLock}
          validate={[required, maxLength20, minLength8]}
          required={true}
          maxLength="20"
          minLength="6"
        />
        {
          errors.Password && touched.Password ? (
            <p className="text-danger position-absolute">{errors.Password}</p>
          ) : null
        }
      </div>
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary mb-3"
          disabled={submitting}
        >
          Log In
        </button>
      </div>
      <Link className="float-start" to="/account/signup" title="Sign Up">
        Create your account
      </Link>
      <Link
        className="float-end"
        to="/account/forgotpassword"
        title="Forgot Password"
      >
        Forgot password?
      </Link>
      <div className="clearfix"></div>
      <hr></hr>
      <div className="row">
        <div className="col- text-center">
          <p className="text-muted small">Or you can join with</p>
        </div>
        <div className="col- text-center">
          <Link to="/" className="btn btn-light text-white bg-twitter me-3">
            <FontAwesomeIcon icon={faTwitter} />
          </Link>
          <Link to="/" className="btn btn-light text-white me-3 bg-facebook">
            <FontAwesomeIcon icon={faFacebookF} className="mx-1" />
          </Link>
          <Link to="/" className="btn btn-light text-white me-3 bg-google">
            <FontAwesomeIcon icon={faGoogle} className="mx-1" />
          </Link>
        </div>
      </div>
    </form>
  );
};

export default compose(
  reduxForm({
    form: "signin",
  })
)(SignInForm);
