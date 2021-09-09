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

export default inputErrorsReducer;
