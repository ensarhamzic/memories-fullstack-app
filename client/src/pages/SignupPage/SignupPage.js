import React, { useReducer, useRef, useState } from "react";
import styles from "./SignupPage.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

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
      return;
    }
    try {
      const response = await axios.post("/users/signup", {
        fullName: enteredData.fullName,
        email: enteredData.email,
        username: enteredData.username,
        password: enteredData.password,
      });
      console.log(response);
    } catch (e) {
      setSignupError(e.response.data.error);
    }
  };

  return (
    <div className={styles.container}>
      <h3>Make new account</h3>
      <form onSubmit={signupHandler}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            ref={fullNameRef}
            type="text"
            placeholder="Full Name"
            id="fullName"
          />
          {inputErrors.fullNameError && (
            <p className={styles.error}>{inputErrors.fullNameError}</p>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input ref={emailRef} type="text" placeholder="Email" id="email" />
          {inputErrors.emailError && (
            <p className={styles.error}>{inputErrors.emailError}</p>
          )}
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            ref={usernameRef}
            type="text"
            placeholder="Username"
            id="username"
          />
          {inputErrors.usernameError && (
            <p className={styles.error}>{inputErrors.usernameError}</p>
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
          {inputErrors.passwordError && (
            <p className={styles.error}>{inputErrors.passwordError}</p>
          )}
        </div>
        {signupError && <p className={styles.signupError}>{signupError}</p>}
        <button type="submit">Create Account</button>
      </form>
      <p className={styles.loginLink}>
        <Link to="/login">
          Already have an account? <span>Login</span>
        </Link>
      </p>
    </div>
  );
}

export default SignupPage;
