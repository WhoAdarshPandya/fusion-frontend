import { useContext } from "preact/hooks";
import { AuthContext, LOGOUT, LOGIN } from "../contexts/AuthContext";
import { setIsLoggedIn, setToken } from "../utils";

export const useAuth = (): {
  isLoggedIn: boolean;
  makeUserLogin: () => void;
  makeUserLogout: () => void;
} => {
  const { state, dispatch } = useContext(AuthContext);
  const isLoggedIn = state.isLoggedIn;
  const makeUserLogin = () => {
    setIsLoggedIn(true);
    dispatch({ type: LOGIN });
  };

  const makeUserLogout = () => {
    setToken("");
    setIsLoggedIn(false);
    dispatch({ type: LOGOUT });
  };
  return { isLoggedIn, makeUserLogin, makeUserLogout };
};
