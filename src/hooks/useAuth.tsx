import { useContext } from "preact/hooks";
import { AuthContext, LOGOUT, LOGIN } from "../contexts/AuthContext";

export const useAuth = (): {
  isLoggedIn: boolean;
  makeUserLogin: () => void;
  makeUserLogout: () => void;
} => {
  const { state, dispatch } = useContext(AuthContext);
  const isLoggedIn = state.isLoggedIn;
  const makeUserLogin = () => dispatch({ type: LOGIN });
  const makeUserLogout = () => dispatch({ type: LOGOUT });
  return { isLoggedIn, makeUserLogin, makeUserLogout };
};
