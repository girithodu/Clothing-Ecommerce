import React, { useState, useContext } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.js";
import FormInput from "../form-input/form-input.jsx";
import "./sign-up.styles.scss";
import Button from '../button/button.jsx';
import {UserContext} from '../../contexts/user.context';

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  displayName: "",
};

const SignUpForm = () => {
  const {setCurrentUser} = useContext(UserContext);
  const [values, setValues] = useState(initialValues);
  const { firstName, lastName, email, password, confirmPassword, displayName } =
    values;
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const resetForm = () => {
    setValues(initialValues);
  };
  const onSignUp = async (e) => {
    console.log(values);
    e.preventDefault();
    console.log("HERE");
    if (password === confirmPassword) {
      try {
        const { user } = await createAuthUserWithEmailAndPassword(
          email,
          password
        );
        const userDocRef = await createUserDocumentFromAuth(user, {
          displayName,
          firstName,
          lastName,
        });
        console.log(userDocRef);
        resetForm();
        setCurrentUser(user);
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          alert("User already exists");
        } else {
          console.log("Err in creating user", error);
        }
      }
    } else {
      alert(`Password doesn't match`);
      return;
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't Have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={(e) => onSignUp(e)}>
        <FormInput
          label="First Name"
          value={firstName}
          onChange={onChangeHandler}
          name="firstName"
          required
        />

        <FormInput
          label="Last Name"
          value={lastName}
          onChange={onChangeHandler}
          name="lastName"
          required
        />

        <FormInput
          label="Display Name"
          value={displayName}
          onChange={onChangeHandler}
          name="displayName"
          required
        />

        <FormInput
          label="Email"
          type="email"
          onChange={onChangeHandler}
          name="email"
          required
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          onChange={onChangeHandler}
          name="password"
          required
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          onChange={onChangeHandler}
          name="confirmPassword"
          required
          value={confirmPassword}
        />
        <Button children= 'Sign Up' type ='submit'/>

      </form>
    </div>
  );
};
export default SignUpForm;
