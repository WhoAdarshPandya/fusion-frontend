import {
  Button,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import BlockIcon from "@material-ui/icons/Block";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SecurityOutlinedIcon from "@material-ui/icons/SecurityOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import NotificationsOffOutlinedIcon from "@material-ui/icons/NotificationsOffOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import PowerSettingsNewOutlinedIcon from "@material-ui/icons/PowerSettingsNewOutlined";
import {
  useAuth,
  useDarkMode,
  useDigitalWellBeing,
  useUser,
} from "../../hooks";
import {
  deleteAccountReq,
  updatePasswordReq,
  updateUserDndReq,
  updateUserNotificationReq,
} from "../../utils";
import { CustomDialog } from "..";
import { useState } from "preact/hooks";
import "./SettingsList.css";

export const SettingsList = (): JSX.Element => {
  const { currentTheme, themeToggler } = useDarkMode();
  const {
    getUserNotificationStatus,
    getUserDndStatus,
    setUserDnd,
    setUserNotification,
    getUserEmail,
    getUserID,
  } = useUser();

  const { makeUserLogout } = useAuth();
  const dnd = getUserDndStatus() as boolean;
  const notifications = getUserNotificationStatus() as boolean;
  const email = getUserEmail();
  const id = getUserID();
  const { isTurnedOn, toggler } = useDigitalWellBeing();
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isPassDialogOpen, setIsPassDialogOpen] = useState(false);
  const [isAccountDeleteDialogOpen, setIsAccountDeleteDialogOpen] =
    useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleNotificationChange = async (e: any) => {
    const data = await updateUserNotificationReq(e.target.checked);
    if (data.success) {
      console.log(data.result);
      setUserNotification(e.target.checked as boolean);
    } else {
      console.log(data.err);
    }
  };

  const handleDndChange = async (e: any) => {
    const data = await updateUserDndReq(e.target.checked);
    if (data.success) {
      console.log(data.result);
      setUserDnd(e.target.checked as boolean);
    } else {
      console.log(data.err);
    }
  };

  const handleListClick = (text: string): void => {
    if (text === "Logout") {
      makeUserLogout();
    }
    if (text === "About The Developer") {
      setIsAboutOpen(true);
    }
    if (text === "Change Password") {
      setIsPassDialogOpen(true);
    }
    if (text === "Delete Account") {
      setIsAccountDeleteDialogOpen(true);
    }
  };

  const handleAboutDialog = () => {
    setIsAboutOpen(false);
  };

  const handlePassDialog = () => {
    setIsPassDialogOpen(false);
  };

  const handleAccoundDeleteDialog = () => {
    setIsAccountDeleteDialogOpen(false);
  };

  const deleteAccount = async () => {
    const data = await deleteAccountReq();
    if (data.success) {
      console.log(data.result);
      makeUserLogout();
    } else {
      alert("failed to delete account");
    }
  };

  const handleChangePass = async () => {
    if (oldPassword !== "" && newPassword !== "") {
      const data = await updatePasswordReq(id, oldPassword, newPassword, email);
      if (data.success) {
        if (data.result.count > 0) {
          alert("updated");
          setNewPassword("");
          setOldPassword("");
          setIsPassDialogOpen(false);
        } else {
          alert("not updated");
          setIsPassDialogOpen(false);
        }
      } else {
        alert("not updated");
        setIsPassDialogOpen(false);
      }
    } else {
      alert("please fill passwords");
    }
  };

  return (
    <>
      {[
        {
          text: "Change Password",
          component: <SecurityOutlinedIcon />,
          hasSwitch: false,
        },
        {
          text: "Delete Account",
          component: <DeleteOutlineOutlinedIcon />,
          hasSwitch: false,
        },
        {
          text: "Change Theme",
          component: <ColorLensOutlinedIcon />,
          hasSwitch: true,
        },
        { text: "Do Not Disturb", component: <BlockIcon />, hasSwitch: true },
        {
          text: "Suspende Message Notifications",
          component: <NotificationsOffOutlinedIcon />,
          hasSwitch: true,
        },
        {
          text: "Digital Well Being",
          component: <VisibilityOutlinedIcon />,
          hasSwitch: true,
        },
        { text: "About The Developer", component: <InfoOutlinedIcon /> },
        { text: "Logout", component: <PowerSettingsNewOutlinedIcon /> },
      ].map(({ text, component, hasSwitch }) => (
        <Paper className="settings-list transition-class" variant="outlined">
          <ListItem
            button
            key={text}
            onClick={() => {
              handleListClick(text);
            }}
          >
            <ListItemIcon>{component}</ListItemIcon>
            <ListItemText primary={text} />
            <ListItemSecondaryAction>
              {hasSwitch && text === "Change Theme" && (
                <Switch
                  checked={currentTheme === "light" ? false : true}
                  onChange={themeToggler}
                />
              )}
              {hasSwitch && text === "Do Not Disturb" && (
                <Switch checked={dnd} onChange={handleDndChange} />
              )}
              {hasSwitch && text === "Digital Well Being" && (
                <Switch checked={isTurnedOn} onChange={toggler} />
              )}
              {hasSwitch && text === "Suspende Message Notifications" && (
                <Switch
                  checked={notifications}
                  onChange={handleNotificationChange}
                />
              )}
              {!hasSwitch && (
                <IconButton
                  onClick={() => {
                    handleListClick(text);
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        </Paper>
      ))}

      <CustomDialog
        open={isAboutOpen}
        onClose={handleAboutDialog}
        cancelButton={false}
        onOkClick={handleAboutDialog}
        title="About"
        containsContent={false}
      >
        <Typography>
          Fusion was designed by keeping work and social media in mind, i.e a
          place where you can work and socialize. it's quite helpful for people
          who are introvert in nature
        </Typography>
      </CustomDialog>
      <CustomDialog
        open={isPassDialogOpen}
        onClose={handlePassDialog}
        cancelButton={false}
        onOkClick={handlePassDialog}
        positiveButtonName="cancel"
        title="Password settings"
        containsContent={false}
      >
        <TextField
          type="password"
          variant="outlined"
          label="old password"
          value={oldPassword}
          onChange={(e: any) => {
            setOldPassword(e.target.value);
          }}
          className="full-width"
        />
        <br />
        <br />
        <TextField
          type="password"
          variant="outlined"
          label="new password"
          value={newPassword}
          onChange={(e: any) => {
            setNewPassword(e.target.value);
          }}
          className="full-width"
        />
        <br />
        <br />
        <Button
          onClick={handleChangePass}
          variant="contained"
          className="full-width"
          color="primary"
        >
          change password
        </Button>
      </CustomDialog>
      <CustomDialog
        open={isAccountDeleteDialogOpen}
        onClose={handleAccoundDeleteDialog}
        onCancelClick={handleAccoundDeleteDialog}
        onOkClick={deleteAccount}
        content="you are about to delete your fusion account? fusion never stores their customer's data in respect to user privacy. but you can always make new account with us."
        title="Are You Sure?"
      />
    </>
  );
};
