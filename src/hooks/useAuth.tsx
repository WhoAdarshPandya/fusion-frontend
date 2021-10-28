import { useContext } from "preact/hooks";
import { AuthContext, LOGOUT, LOGIN } from "../contexts/AuthContext";
import { setIsLoggedIn, setToken } from "../utils";
import { useNavigate } from "react-router-dom";

export const useAuth = (): {
  isLoggedIn: boolean;
  makeUserLogin: () => void;
  makeUserLogout: () => void;
} => {
  const { state, dispatch } = useContext(AuthContext);
  const isLoggedIn = state.isLoggedIn;
  const navigate = useNavigate();

  const makeUserLogin = () => {
    setIsLoggedIn(true);
    dispatch({ type: LOGIN });
    navigate("/workspace");
  };

  const makeUserLogout = () => {
    setToken("");
    setIsLoggedIn(false);
    dispatch({ type: LOGOUT });
  };
  return { isLoggedIn, makeUserLogin, makeUserLogout };
};
