import { useContext } from "preact/hooks";
import { AuthContext, LOGOUT, LOGIN } from "../contexts/AuthContext";
import { setIsLoggedIn, setToken, setUserId } from "../utils";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const useAuth = (): {
  isLoggedIn: boolean;
  makeUserLogin: (token: string, user_id: string) => void;
  makeUserLogout: () => void;
} => {
  const { state, dispatch } = useContext(AuthContext);
  const isLoggedIn = state.isLoggedIn;
  const navigate = useNavigate();

  const makeUserLogin = (token: string, user_id: string) => {
    setIsLoggedIn(true);
    setToken(token); // logic to get token value here
    setUserId(user_id);
    dispatch({ type: LOGIN });
    navigate("/workspace");
  };

  const makeUserLogout = () => {
    setToken("");
    setIsLoggedIn(false);
    Cookies.set("chat_id", "");
    setUserId("");
    dispatch({ type: LOGOUT });
    navigate("/login");
  };
  return { isLoggedIn, makeUserLogin, makeUserLogout };
};
