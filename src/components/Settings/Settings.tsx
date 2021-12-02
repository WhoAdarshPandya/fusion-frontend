import {
  Avatar,
  Badge,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { CustomDialog, SettingsList } from "..";
import { useUser } from "../../hooks";
import { useEffect, useState } from "preact/hooks";
import "./Settings.css";
import { imageUploader, updateUserInfo, updateUserProfile } from "../../utils";

export const Settings = (): JSX.Element => {
  const {
    getUserUserName,
    getUserName,
    getUserEmail,
    getUserProfileUrl,
    setUserProfile,
    setUserEmail,
    setUserUserName,
    setUserName: sun,
  } = useUser();
  const name = getUserName();
  const user_name = getUserUserName();
  const url = getUserProfileUrl();
  const email = getUserEmail();
  const [profile, setProfile] = useState(null);
  const [imgUrl, setImgUrl] = useState(url);
  const [Iname, setName] = useState(name);
  const [Iusername, setUsername] = useState(user_name);
  const [Iemail, setEmail] = useState(email);
  const [isUpdateInfoOpen, setIsUpdateInfoOpen] = useState(false);
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
    setTimeout(async () => {
      const formData = new FormData();
      formData.append("ProfileImage", e.target.files[0]);
      const data = await imageUploader(formData);
      if (data.success) {
        const url = data.result.url;
        console.log(data.result);
        setUserProfile(url);
        const upload = await updateUserProfile(url);
        if (!upload.success) {
          alert("error updating profile, try again later");
        }
      }
    }, 2000);
  };

  const handleUpdateInfo = () => {
    setIsUpdateInfoOpen(true);
  };

  const handleUpdateInfoClose = () => {
    setIsUpdateInfoOpen(false);
  };

  const handleUpdate = async () => {
    if (Iname !== "" && Iemail !== "" && Iusername !== "") {
      const data = await updateUserInfo(Iname, Iusername, Iemail);
      if (data.success) {
        // calls for internal context update
        console.log(data);
        setUserEmail(Iemail !== "" ? Iemail : email);
        setUserUserName(Iusername !== "" ? Iusername : user_name);
        sun(Iname !== "" ? Iname : name);
        setIsUpdateInfoOpen(false);
        alert("updated");
        // setName("");
        // setEmail("");
        // setUsername("");
      } else {
        alert("error occured 77");
      }
    } else {
      alert("one or more feilds are empty");
    }
  };

  return (
    <>
      <Paper elevation={0} className="settings-container transition-class">
        <br />
        <Paper variant="outlined" className="profile-row transition-class">
          <div className="profile-container">
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
                src={imgUrl !== "" ? imgUrl : url}
                className="large-profile"
                alt="user-photo"
              />
            </Badge>

            <div className="user-details">
              <Typography variant="h6" color="primary">
                {Iname !== "" ? Iname : name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {Iusername !== "" ? Iusername : user_name}
              </Typography>
            </div>
          </div>
          <div>
            <IconButton color="primary" onClick={handleUpdateInfo}>
              <EditOutlinedIcon />
            </IconButton>
          </div>
        </Paper>
        <br />
        <SettingsList />
        <br />
      </Paper>
      <CustomDialog
        open={isUpdateInfoOpen}
        onClose={handleUpdateInfoClose}
        cancelButton={false}
        onOkClick={handleUpdateInfoClose}
        positiveButtonName="cancel"
        title="Profile Info"
        containsContent={false}
      >
        <TextField
          variant="outlined"
          label="name"
          value={Iname === "" ? name : Iname}
          onChange={(e: any) => {
            setName(e.target.value);
          }}
          className="full-width"
        />
        <br />
        <br />
        <TextField
          variant="outlined"
          label="user name"
          value={Iusername === "" ? user_name : Iusername}
          onChange={(e: any) => {
            setUsername(e.target.value);
          }}
          className="full-width"
        />
        <br />
        <br />
        <TextField
          variant="outlined"
          label="email"
          value={Iemail === "" ? email : Iemail}
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}
          className="full-width"
        />
        <br />
        <br />
        <Button
          onClick={handleUpdate}
          variant="contained"
          className="full-width"
          color="primary"
        >
          update info
        </Button>
      </CustomDialog>
    </>
  );
};
