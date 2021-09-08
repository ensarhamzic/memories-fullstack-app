import React, { useRef, useState } from "react";
import styles from "./LoginPage.module.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { userActions } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import FormCard from "../../components/FormCard/FormCard";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import FormError from "../../components/FormError/FormError";

let error = false;

function LoginPage() {
  const [isLoggingin, setIsLoggingin] = useState(false);
  const history = useHistory();
  const dispatchRedux = useDispatch();
  const [signinError, setSigninError] = useState(null);
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
    setSigninError(null);
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
      setSigninError("Check credentials and try again");
      setIsLoggingin(false);
    }
  };

  return (
    <>
      <FormCard
        title="Sign in to your account"
        onSubmit={signinHandler}
        error={signinError}
      >
        <Input
          id="emailOrUsername"
          title="Email or username"
          type="text"
          placeholder="Email or username"
          ref={emailOrUsernameRef}
          error={emailOrUsernameError}
        />
        <Input
          id="password"
          title="Password"
          type="password"
          placeholder="Password"
          ref={passwordRef}
          error={passwordError}
        />
        <FormError error={signinError} />
        <Button type="submit" disabled={isLoggingin}>
          {isLoggingin ? "Waiting..." : "Sign in"}
        </Button>
        <p className={styles.signupLink}>
          <Link to="/signup">
            Don't have account? <span>Sign up</span>
          </Link>
        </p>
      </FormCard>
    </>
  );
}

export default LoginPage;
