import { Routes, Route } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { useDarkMode } from "./hooks";
import "./App.css";
import { Home, PrivateRoute } from "./components";
import { Link } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

export function App() {
  const { themeToggler } = useDarkMode();
  const { makeUserLogin, isLoggedIn } = useAuth();
  console.log(isLoggedIn);
  console.log(import.meta.env.MODE);
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
          <Route
            path="/login"
            element={
              <>
                <p onClick={makeUserLogin}>login</p>
                <Link to="/workspace">click here to go to /workspace</Link>
              </>
            }
          />
          <Route path="/signup" element={<p>signup</p>} />
        </Routes>
      </Paper>
    </Paper>
  );
}
