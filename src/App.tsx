import { Routes, Route } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { useDarkMode, useDigitalWellBeing } from "./hooks";
import { Home, Login, PrivateRoute, Signup } from "./components";
import { useAuth } from "./hooks/useAuth";
import "./App.css";

export function App() {
  const { themeToggler } = useDarkMode();
  const { makeUserLogin, isLoggedIn } = useAuth();
  const { isTurnedOn, toggler } = useDigitalWellBeing();

  console.log(isLoggedIn);
  console.log(isTurnedOn);
  return (
    <Paper className="parent">
      <Paper
        onDoubleClick={() => {
          themeToggler();
        }}
        elevation={7}
        className="app-container"
      >
        <Routes>
          <PrivateRoute path="/" element={<Home />} />
          <PrivateRoute path="/:tab" element={<Home />} />
          <PrivateRoute path="/discover/:tab" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Paper>
    </Paper>
  );
}
