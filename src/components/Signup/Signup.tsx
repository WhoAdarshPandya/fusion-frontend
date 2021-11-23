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
import { getBaseUrl, getSignupSvgs, imageUploader } from "../../utils";
import ArrowRightAltSharpIcon from "@material-ui/icons/ArrowRightAltSharp";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useState } from "preact/hooks";
import axios from "axios";
import "./Signup.css";

export const Signup = (): JSX.Element => {
  const arr = getSignupSvgs();
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
    let mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (profile) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("ProfileImage", profile);
      // console.log("before", formData);
      // const data = await imageUploader(formData);
      // console.log(data);
      await axios
        .post(`http://localhost:2002/api/v1/uploadimage`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res.data);
        });
      // firebase
      //     if (
      //       name !== "" &&
      //       email !== "" &&
      //       username !== "" &&
      //       pass !== "" &&
      //       cpass !== ""
      //     ) {
      //       // ? check mail
      //       if (mailRegex.test(email)) {
      //         if (pass === cpass) {
      //           // ! api call
      //           let data = await SignupApiCall({
      //             name: name.trim().toLowerCase(),
      //             email: email.trim().toLowerCase(),
      //             user_name: username.trim().toLowerCase(),
      //             password: pass,
      //             profile: getImageDownloadUrl(),
      //           });

      //           // ?debug
      //           console.log(data);
      //           if (data.success) {
      //             enqueueSnackbar("Signup Successful", { variant: "success" });
      //             // navigate('/login')
      //           } else {
      //             enqueueSnackbar(data.msg, { variant: "error" });
      //           }
      //         } else {
      //           enqueueSnackbar(
      //             "please provide same password in password and confirm password",
      //             { variant: "error" }
      //           );
      //         }
      //       } else {
      //         enqueueSnackbar("please provide valid mail", {
      //           variant: "error",
      //         });
      //       }
      //     } else {
      //       enqueueSnackbar("one or more fields are empty...", {
      //         variant: "error",
      //       });
      //     }
      //   } else {
      //     enqueueSnackbar("profile upload error", { variant: "error" });
      //   }
      // };
    } else {
      // enqueueSnackbar("it's always a good option to put a profile :)", {
      //   variant: "info",
      // });
    }
  };

  return (
    <Paper elevation={0} className="login-container">
      <div className="features">
        <div className="feature-svg">
          <div className="sqaure reverse">
            <img src={arr[0]} className="svg-image" alt="hero-img" />
            <Typography color="textSecondary" align="justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              animi molestias enim accusantium nemo nam, suscipit laudantium
              fuga ex saepe quibusdam fugit quisquam delectus? Vel consequuntur
              aliquam fugiat est facere.
            </Typography>
          </div>
        </div>
        <div className="feature-svg2">
          <div className="sqaure ">
            <img src={arr[1]} className="svg-image" alt="hero-img" />
            <Typography color="textSecondary" align="justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              animi molestias enim accusantium nemo nam, suscipit laudantium
              fuga ex saepe quibusdam fugit quisquam delectus? Vel consequuntur
              aliquam fugiat est facere.
            </Typography>
          </div>
        </div>
      </div>
      <div className="renderer">
        <div className="login-items-container">
          {isNext ? (
            <>
              <Badge
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
                <Typography color="textSecondary" variant="subtitle1">
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
