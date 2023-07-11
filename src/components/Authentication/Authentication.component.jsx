import { useEffect } from "react";
import { getRedirectResult } from 'firebase/auth';
import {
  auth,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.js";
import SignUpForm from "../sign-up/sign-up.component.jsx";
import SignInForm from '../sign-in/sign-in.component.jsx';
import './authentication.styles.scss';


const Authentication = () => {
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


  return (
    <div className="authentication-container">
      <SignInForm />
      {/* <button onClick={logGoogleUser}>Sign in with Google Popup</button> */}
      {/* <Button children='Sign in with Google Redirect' buttonType='google' onClick={signInWithGoogleRedirect}/> */}

      <SignUpForm />
    </div>
  );
};

export default Authentication;
