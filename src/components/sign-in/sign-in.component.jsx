import React, { useState } from "react";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.js";
import FormInput from "../form-input/form-input.jsx";
import "./sign-in.styles.scss";
import Button from "../button/button.jsx";

const initialValues = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [values, setValues] = useState(initialValues);
  const { email, password } = values;

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
  const onSignIn = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      const userDocRef = await createUserDocumentFromAuth(user);
      resetForm();
      console.log(userDocRef);
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          alert("User Does Not Exist, Create New Account");
          break;
        case "auth/wrong-password":
          alert("Incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with user");
          break;
        default:
          console.log(error);
      }
    }
  };
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div className="sign-up-container">
      <h2>Already Have An Account?</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={onSignIn}>
        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={onChangeHandler}
          name="email"
          required
        />

        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={onChangeHandler}
          name="password"
          required
        />
        <div className="buttons-container">
          <Button children="Sign In" type="submit" />
          <Button
            type ='button'
            children="Sign in with Google"
            buttonType="google"
            onClick={signInWithGoogle}
          />
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
