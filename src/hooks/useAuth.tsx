import { useContext } from "preact/hooks";
import { AuthContext, LOGOUT, LOGIN } from "../contexts/AuthContext";
import { setIsLoggedIn, setToken, setUserId } from "../utils";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../contexts/UserContext";

export const useAuth = (): {
  isLoggedIn: boolean;
  makeUserLogin: (token: string, user_id: string) => void;
  makeUserLogout: () => void;
} => {
  const { state, dispatch } = useContext(AuthContext);
  const { dispatch: userDispatcher } = useContext(UserContext);
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
    userDispatcher({ type: "RESET_USER", payload: {} });
    setToken("");
    setIsLoggedIn(false);
    Cookies.set("chat_id", "");
    setUserId("");
    dispatch({ type: LOGOUT });
    navigate("/login");
  };
  return { isLoggedIn, makeUserLogin, makeUserLogout };
};
