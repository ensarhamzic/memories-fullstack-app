import React, { useReducer, useRef, useState } from "react";
import styles from "./SignupPage.module.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import FormCard from "../../components/FormCard/FormCard";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import FormError from "../../components/FormError/FormError";

const initialInputErrorsState = {
  fullNameError: null,
  emailError: null,
  usernameError: null,
  passwordError: null,
};

const inputErrorsReducer = (state, action) => {
  switch (action.type) {
    case "fullNameError":
      return {
        fullNameError: action.payload.errorMessage,
        emailError: state.emailError,
        usernameError: state.usernameError,
        passwordError: state.passwordError,
      };
    case "emailError":
      return {
        fullNameError: state.fullNameError,
        emailError: action.payload.errorMessage,
        usernameError: state.usernameError,
        passwordError: state.passwordError,
      };
    case "usernameError":
      return {
        fullNameError: state.fullNameError,
        emailError: state.emailError,
        usernameError: action.payload.errorMessage,
        passwordError: state.passwordError,
      };
    case "passwordError":
      return {
        fullNameError: state.fullNameError,
        emailError: state.emailError,
        usernameError: state.usernameError,
        passwordError: action.payload.errorMessage,
      };
    case "fullNameValid":
      return {
        fullNameError: null,
        emailError: state.emailError,
        usernameError: state.usernameError,
        passwordError: state.passwordError,
      };
    case "emailValid":
      return {
        fullNameError: state.fullNameError,
        emailError: null,
        usernameError: state.usernameError,
        passwordError: state.passwordError,
      };
    case "usernameValid":
      return {
        fullNameError: state.fullNameError,
        emailError: state.emailError,
        usernameError: null,
        passwordError: state.passwordError,
      };
    case "passwordValid":
      return {
        fullNameError: state.fullNameError,
        emailError: state.emailError,
        usernameError: state.usernameError,
        passwordError: null,
      };
    default:
      return state;
  }
};

let error = false;

function SignupPage() {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const history = useHistory();
  const dispatchRedux = useDispatch();
  const [inputErrors, dispatchInputErrors] = useReducer(
    inputErrorsReducer,
    initialInputErrorsState
  );
  const [signupError, setSignupError] = useState(null);
  const fullNameRef = useRef();
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const signupHandler = async (e) => {
    e.preventDefault();
    setIsSigningUp(true);
    setSignupError(null);
    error = false;
    const enteredData = {
      fullName: fullNameRef.current.value,
      email: emailRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    if (!enteredData.fullName) {
      error = true;
      dispatchInputErrors({
        type: "fullNameError",
        payload: { errorMessage: "Full Name cannot be empty" },
      });
    } else if (enteredData.fullName.length > 30) {
      error = true;
      dispatchInputErrors({
        type: "fullNameError",
        payload: {
          errorMessage: "Full Name must be less than 30 characters long",
        },
      });
    } else {
      dispatchInputErrors({
        type: "fullNameValid",
      });
    }

    if (!enteredData.email) {
      error = true;
      dispatchInputErrors({
        type: "emailError",
        payload: { errorMessage: "Email cannot be empty" },
      });
    } else if (
      !enteredData.email.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    ) {
      error = true;
      dispatchInputErrors({
        type: "emailError",
        payload: { errorMessage: "Invalid email format" },
      });
    } else {
      dispatchInputErrors({
        type: "emailValid",
      });
    }

    if (!enteredData.username) {
      error = true;
      dispatchInputErrors({
        type: "usernameError",
        payload: { errorMessage: "Username cannot be empty" },
      });
    } else if (enteredData.username.length < 3) {
      error = true;
      dispatchInputErrors({
        type: "usernameError",
        payload: {
          errorMessage: "Username must be more than 2 characters long",
        },
      });
    } else if (enteredData.username.length > 20) {
      error = true;
      dispatchInputErrors({
        type: "usernameError",
        payload: {
          errorMessage: "Username must be less than 20 characters long",
        },
      });
    } else {
      dispatchInputErrors({
        type: "usernameValid",
      });
    }

    if (!enteredData.password) {
      error = true;
      dispatchInputErrors({
        type: "passwordError",
        payload: { errorMessage: "Password cannot be empty" },
      });
    } else if (enteredData.password.length < 5) {
      error = true;
      dispatchInputErrors({
        type: "passwordError",
        payload: {
          errorMessage: "Password must be more than 4 characters long",
        },
      });
    } else if (enteredData.password.length > 30) {
      error = true;
      dispatchInputErrors({
        type: "passwordError",
        payload: {
          errorMessage: "Password must be less than 30 characters long",
        },
      });
    } else {
      dispatchInputErrors({
        type: "passwordValid",
      });
    }

    if (error) {
      setIsSigningUp(false);
      return;
    }
    try {
      const response = await axios.post("/users/signup", {
        fullName: enteredData.fullName,
        email: enteredData.email,
        username: enteredData.username,
        password: enteredData.password,
      });
      dispatchRedux(userActions.login({ token: response.data.token }));
      history.replace("memory-books");
    } catch (e) {
      setSignupError(e.response.data.error);
      setIsSigningUp(false);
    }
  };

  return (
    <>
      <FormCard title="Make new account" onSubmit={signupHandler}>
        <Input
          id="fullName"
          title="Full name"
          type="text"
          placeholder="Full name"
          ref={fullNameRef}
          error={inputErrors.fullNameError}
        />
        <Input
          id="email"
          title="Email"
          type="text"
          placeholder="Email"
          ref={emailRef}
          error={inputErrors.emailError}
        />
        <Input
          id="username"
          title="Username"
          type="text"
          placeholder="Username"
          ref={usernameRef}
          error={inputErrors.usernameError}
        />
        <Input
          id="password"
          title="password"
          type="password"
          placeholder="Password"
          ref={passwordRef}
          error={inputErrors.passwordError}
        />
        <FormError error={signupError} />
        <Button type="submit" disabled={isSigningUp}>
          {isSigningUp ? "Waiting..." : "Create Account"}
        </Button>
      </FormCard>
      <p className={styles.loginLink}>
        <Link to="/login">
          Already have an account? <span>Login</span>
        </Link>
      </p>
    </>
  );
}

export default SignupPage;
