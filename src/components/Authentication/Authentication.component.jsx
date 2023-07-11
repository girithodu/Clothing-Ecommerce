import { useEffect, useState } from "react";
import { getRedirectResult } from 'firebase/auth';
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils.js";
import SignUpForm from "../sign-up/sign-up.component.jsx";
import Button from '../button/button.jsx';
import FormInput from '../form-input/form-input.jsx';

const initialValues = {
  email:'',
  password: ''
}

const Authentication = () => {
  const [values, setValues] = useState(initialValues);
  const {email, password} = values;

  useEffect(() => {
    const getResult = async () => {
      const response = await getRedirectResult(auth);
      if(response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
        console.log('All Good');
      }
    }
    getResult();
  }, [])
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };


  const defaultSignIn = async (e) => {
    e.preventDefault();
    try{
      const { user } = await signInAuthUserWithEmailAndPassword(email, password);
      const userDocRef = await createUserDocumentFromAuth(user);
      resetForm();
      console.log(userDocRef);
    } catch(error) {
      if(error.code === 'auth/invalid-email'){
        alert('User Does Not Exist, Create New Account');
      } else {
        console.log("Err in creating user");
      }
    }
  }
  const resetForm = () => {
    setValues(initialValues);
  };

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]:value
    });
  };

  return (
    <div>
      <h2>Already Have An Account?</h2>
      <h2>Sign In Page</h2>
      <form onSubmit={defaultSignIn}>
        <FormInput
          label = 'Email'
          type = 'email'
          onChange = {onChangeHandler}
          name='email'
          value={email}
          required
        />
        <FormInput
          label = 'Password'
          type = 'password'
          onChange = {onChangeHandler}
          name='password'
          value={password}
          required
        />
        <Button type ='submit' children='Sign In' onClick={defaultSignIn}/>
      </form>
      <Button children ='Sign in with Google' buttonType = 'google' onClick={logGoogleUser} />
      {/* <button onClick={logGoogleUser}>Sign in with Google Popup</button> */}
      <Button children='Sign in with Google Redirect' buttonType='google' onClick={signInWithGoogleRedirect}/>

      <SignUpForm />
    </div>
  );
};

export default Authentication;
