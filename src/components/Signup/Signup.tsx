import {
  Avatar,
  Badge,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { getSignupSvgs, imageUploader, signupUserReq } from "../../utils";
import ArrowRightAltSharpIcon from "@material-ui/icons/ArrowRightAltSharp";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useState } from "preact/hooks";
import { useNavigate } from "react-router-dom";
import { useSnackbarHelper } from "../../hooks";
import { Loader } from "..";
import "./Signup.css";

export const Signup = (): JSX.Element => {
  const arr = getSignupSvgs();
  const { snackbarInjector } = useSnackbarHelper();
  const navigate = useNavigate();
  const [isNext, setIsNext] = useState(false);
  const [profile, setProfile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  // const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleProfile = (e: any) => {
    const selected = ["image/png", "image/jpeg"];
    if (selected.includes(e.target.files[0].type)) {
      setProfile(e.target.files[0]);
      setImgUrl(URL.createObjectURL(e.target.files[0]));
      console.log(e.target.files[0]);
      console.log(profile);
    } else {
      // enqueueSnackbar("provide valid image", { variant: "error" });
      setProfile(null);
    }
  };

  const handleFirst = () => {
    // ? validation
    if (
      name !== "" &&
      name !== null &&
      email !== "" &&
      email !== null &&
      username !== "" &&
      username !== null
    ) {
      setIsNext(true);
    } else {
      // enqueueSnackbar("one or more fields are empty...", { variant: "error" });
      setIsNext(false);
    }
  };

  const handleSubmit = async () => {
    // let mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (profile) {
      const formData = new FormData();
      formData.append("ProfileImage", profile);
      // ⚛ experimental
      // const data = await imageUploader(formData);
      // console.log(data);
      // ⚛ experimental
      if (
        password !== "" &&
        confirm_password !== "" &&
        password !== null &&
        confirm_password !== null
      ) {
        if (password === confirm_password) {
          // setIsLoading(true);
          const data = await imageUploader(formData);
          if (data.success) {
            const url = data.result.url;
            console.log(data.result);
            const resData = await signupUserReq(
              name,
              username,
              url,
              password,
              email
            );
            if (resData.result.success) {
              snackbarInjector("success", "signup success", false, "5000");
              navigate("/login");
            } else {
              console.log(resData.result);
              snackbarInjector("error", resData.result.msg!, false, "5000");
            }
            // setIsLoading(false);
          } else {
            snackbarInjector("error", data.err!, false, "5000");
          }
        } else {
          snackbarInjector("error", "passwords must be same", false, "5000");
        }
      } else {
        snackbarInjector("error", "passwords must not be empty", false, "5000");
      }
    } else {
      snackbarInjector(
        "info",
        "it's always a good option to put a profile :)",
        false,
        "5000"
      );
    }
  };

  return (
    <Paper elevation={0} className="login-container">
      {/* <Loader isOpen={isLoading} /> */}
      <div className="features">
        <div className="feature-svg">
          <div className="sqaure reverse">
            <img src={arr[0]} className="svg-image" alt="hero-img" />
            <Typography color="textSecondary" align="justify">
              chat real time with work colleagues. send real time messages
              without a single refresh. we built fusion in a way so you have to
              download less or no ammount of bundle again and again. so it
              becomes more faster ,simpler and easier.
            </Typography>
          </div>
        </div>
        <div className="feature-svg2">
          <div className="sqaure ">
            <img src={arr[1]} className="svg-image" alt="hero-img" />
            <Typography color="textSecondary" align="justify">
              fusion is secure and cares about your privacy- means that all the
              data you provide us will be secured and never read by someone
              else. we've worked hard and ensured that there are 100% securiy
              measures in your workspace.
            </Typography>
          </div>
        </div>
      </div>
      <div className="renderer">
        <div className="login-items-container">
          {isNext ? (
            <>
              <Badge
                className="resp-badge"
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={
                  <IconButton className="bg-primary" component="label">
                    <EditOutlinedIcon
                      color="action"
                      className="white"
                      fontSize="small"
                    />
                    <input
                      type="file"
                      onChange={(e: any) => {
                        handleProfile(e);
                      }}
                      style={{ display: "none" }}
                    />
                  </IconButton>
                }
              >
                <Avatar
                  className="main-avatar"
                  src={imgUrl}
                  alt="user avatar"
                />
              </Badge>
              <TextField
                type="password"
                value={password}
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
                variant="outlined"
                label="Password"
                className="text-feilds"
              />
              <TextField
                type="password"
                value={confirm_password}
                onChange={(e: any) => {
                  setConfirmPassword(e.target.value);
                }}
                variant="outlined"
                label="Confirm Password"
                className="text-feilds"
              />
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                className="text-feilds"
              >
                signup
              </Button>
              <Link to="/login" className="links">
                <Typography
                  align="center"
                  color="textSecondary"
                  variant="subtitle1"
                >
                  already a user? login from here
                </Typography>
              </Link>
              <IconButton
                className="align-left"
                onClick={() => {
                  setIsNext(false);
                }}
                color="primary"
              >
                <KeyboardBackspaceIcon />
              </IconButton>
            </>
          ) : (
            <>
              <img
                className="logo"
                src="https://res.cloudinary.com/dvi7v1uqh/image/upload/v1635440539/svgs/vite_lknxsn.svg"
                alt="logo"
              />
              <TextField
                value={name}
                onChange={(e: any) => {
                  setName(e.target.value);
                }}
                variant="outlined"
                label="Let's start with your name"
                className="text-feilds"
              />
              <TextField
                type="email"
                value={email}
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
                variant="outlined"
                label="Email"
                className="text-feilds"
              />
              <TextField
                value={username}
                onChange={(e: any) => {
                  setUsername(e.target.value);
                }}
                variant="outlined"
                label="User name"
                className="text-feilds"
              />
              <IconButton
                className="align-right"
                onClick={handleFirst}
                color="primary"
              >
                <ArrowRightAltSharpIcon />
              </IconButton>
            </>
          )}
        </div>
      </div>
    </Paper>
  );
};
