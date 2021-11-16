// import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useAuth, useSnackbarHelper } from "../../hooks";
import { getLoginSvgs } from "../../utils";
import { Suspense, lazy } from "react";
import "./Login.css";

const Button = lazy(() => import("@material-ui/core/Button"));
const Paper = lazy(() => import("@material-ui/core/Paper"));
const TextField = lazy(() => import("@material-ui/core/TextField"));
const Typography = lazy(() => import("@material-ui/core/Typography"));

export const Login = (): JSX.Element => {
  const arr = getLoginSvgs();
  const { makeUserLogin } = useAuth();
  const { snackbarInjector } = useSnackbarHelper();
  snackbarInjector("success", "login success", false, "5000");
  return (
    <Suspense fallback={<p>loading...</p>}>
      <Paper elevation={0} className="login-container">
        <div className="features">
          <div className="feature-svg">
            <div className="sqaure">
              <img src={arr[0]} className="svg-image" alt="hero-img" />
              <Typography color="textSecondary" align="justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                animi molestias enim accusantium nemo nam, suscipit laudantium
                fuga ex saepe quibusdam fugit quisquam delectus? Vel
                consequuntur aliquam fugiat est facere.
              </Typography>
            </div>
          </div>
          <div className="feature-svg2">
            <div className="sqaure reverse">
              <img src={arr[1]} className="svg-image" alt="hero-img" />
              <Typography color="textSecondary" align="justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                animi molestias enim accusantium nemo nam, suscipit laudantium
                fuga ex saepe quibusdam fugit quisquam delectus? Vel
                consequuntur aliquam fugiat est facere.
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
              value=""
              variant="outlined"
              label="Email"
              className="text-feilds"
            />

            <TextField
              type="password"
              value=""
              variant="outlined"
              label="Password"
              className="text-feilds"
            />

            <Button
              onClick={() => {
                makeUserLogin();
              }}
              variant="contained"
              color="primary"
              className="text-feilds"
            >
              login
            </Button>

            <Link to="/signup" className="links">
              <Typography color="textSecondary" variant="subtitle1">
                not a user? signup here
              </Typography>
            </Link>
          </div>
        </div>
      </Paper>
    </Suspense>
  );
};
