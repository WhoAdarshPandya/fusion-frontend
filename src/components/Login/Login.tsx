import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks";
import {
  getIsLoggedIn,
  getLoginSvgs,
  getToken,
  loginReq,
  setIsLoggedIn,
  setToken,
} from "../../utils";
import { useState, useEffect } from "preact/hooks";
// import { Suspense, lazy } from "react";
import "./Login.css";
import { useSnackbarHelper } from "../../hooks/";
import { useNavigate } from "react-router-dom";
import { Loader } from "..";
// const Button = lazy(() => import("@material-ui/core/Button"));
// const Paper = lazy(() => import("@material-ui/core/Paper"));
// const TextField = lazy(() => import("@material-ui/core/TextField"));
// const Typography = lazy(() => import("@material-ui/core/Typography"));

export const Login = (): JSX.Element => {
  const arr = getLoginSvgs();
  const navigate = useNavigate();
  const { makeUserLogin, makeUserLogout, isLoggedIn } = useAuth();
  const { snackbarInjector } = useSnackbarHelper();
  // ⚛ experimental
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const submitLoginReq = async () => {
    console.log("clicked");
    setIsLoading(true);
    if (email !== "" && password !== "") {
      console.log("n");
      const resp = await loginReq(email, password);
      console.log(resp);
      if (resp.success && resp.result.success) {
        console.log("ok");
        console.log(resp);
        makeUserLogin(resp.result.token, resp.result.userData.user_id);
        snackbarInjector("success", resp.result.msg, false, "5000");
      } else {
        console.log("nok");
        setToken("");
        setIsLoggedIn(false);
        snackbarInjector("error", resp.result.msg, false, "5000");
      }
    }
    setIsLoading(false);
    // console.log(resp);

    // setIsLoading(false);
  };
  return (
    <Paper elevation={0} className="login-container">
      <Loader isOpen={isLoading} />
      <div className="features" onClick={() => setOpen(true)}>
        <div className="feature-svg">
          <div className="sqaure">
            <img src={arr[0]} className="svg-image" alt="hero-img" />
            <Typography color="textSecondary" align="justify">
              Fusion is build with minimal footprint libraries. hence it loades
              7x more faster than regular social network. sort your work, chat
              with your work collegues and give your contribution in work
            </Typography>
          </div>
        </div>
        <div className="feature-svg2">
          <div className="sqaure reverse">
            <img src={arr[1]} className="svg-image" alt="hero-img" />
            <Typography color="textSecondary" align="justify">
              with enjoyable work environment fusion delivers elegant and simple
              ui with all accessibility criterias. managing the workspace won't
              be an issue for you once you get familiar with fusion thanks to
              it's super easy workflow
            </Typography>
          </div>
        </div>
      </div>
      <div className="renderer">
        <div className="login-items-container">
          <img
            className="logo"
            src="https://res.cloudinary.com/dvi7v1uqh/image/upload/v1635440539/svgs/vite_lknxsn.svg"
            alt="logo"
          />
          <TextField
            value={email}
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
            variant="outlined"
            label="Email"
            className="text-feilds"
          />

          <TextField
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
            type="password"
            value={password}
            variant="outlined"
            label="Password"
            className="text-feilds"
          />

          <Button
            onClick={submitLoginReq}
            variant="contained"
            color="primary"
            className="text-feilds"
          >
            login
          </Button>

          <Link to="/signup" className="links">
            <Typography
              align="center"
              color="textSecondary"
              variant="subtitle1"
            >
              not a user? signup here
            </Typography>
          </Link>
        </div>
      </div>
    </Paper>
  );
};
