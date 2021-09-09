import { userActions } from "./userSlice";
import axios from "axios";

export const verifyTokenOnRefresh = (token) => {
  return async (dispatch) => {
    try {
      await axios.post("/users/verify", null, {
        headers: {
          authorization: token,
        },
      });
      dispatch(userActions.login({ token }));
    } catch (e) {
      dispatch(userActions.logout());
    }
  };
};
