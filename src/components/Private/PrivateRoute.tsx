import { RouteProps } from "react-router";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const PrivateRoute = (props: RouteProps): JSX.Element => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn === true ? <Route {...props} /> : <Navigate to="/login" />;
};
