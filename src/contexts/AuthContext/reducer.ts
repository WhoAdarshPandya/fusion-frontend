import { LOGOUT, LOGIN } from ".";
import { AuthContextReducerType } from "./AuthContext";

export let reducer: AuthContextReducerType = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true };
    case LOGOUT:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};
