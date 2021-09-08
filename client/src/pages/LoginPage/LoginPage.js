import React, { useRef, useState } from "react";
import styles from "./LoginPage.module.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { userActions } from "../../store/userSlice";
import { useDispatch } from "react-redux";

let error = false;

function LoginPage() {
  const [isLoggingin, setIsLoggingin] = useState(false);
  const history = useHistory();
  const dispatchRedux = useDispatch();
  const [signinError, setSigninError] = useState(false);
  const [emailOrUsernameError, setEmailOrUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const emailOrUsernameRef = useRef();
  const passwordRef = useRef();

  const signinHandler = async (e) => {
    e.preventDefault();
    setIsLoggingin(true);
    error = false;
    setEmailOrUsernameError(null);
    setPasswordError(null);
    setSigninError(false);
    const enteredData = {
      emailOrUsername: emailOrUsernameRef.current.value,
      password: passwordRef.current.value,
    };
    if (!enteredData.emailOrUsername) {
      setEmailOrUsernameError("Cannot be empty");
      error = true;
    }
    if (!enteredData.password) {
      setPasswordError("Cannot be empty");
      error = true;
    }

    if (error) {
      setIsLoggingin(false);
      return;
    }

    try {
      const response = await axios.post("/users/signin", {
        emailOrUsername: enteredData.emailOrUsername,
        password: enteredData.password,
      });
      dispatchRedux(userActions.login({ token: response.data.token }));
      history.replace("memory-books");
    } catch (e) {
      setSigninError(true);
      setIsLoggingin(false);
    }
  };

  return (
    <div className={styles.container}>
      <h3>Sign in to your account</h3>
      <form onSubmit={signinHandler}>
        <div>
          <label htmlFor="emailOrUsername">Email or username</label>
          <input
            ref={emailOrUsernameRef}
            type="text"
            placeholder="Email"
            id="emailOrUsername"
          />
          {emailOrUsernameError && (
            <p className={styles.error}>{emailOrUsernameError}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            id="password"
          />
          {passwordError && <p className={styles.error}>{passwordError}</p>}
        </div>
        {signinError && (
          <p className={styles.signinError}>Check credentials and try again</p>
        )}
        <button type="submit" disabled={isLoggingin}>
          {isLoggingin ? "Waiting..." : "Sign in"}
        </button>
      </form>
      <p className={styles.signupLink}>
        <Link to="/signup">
          Don't have account? <span>Sign up</span>
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
