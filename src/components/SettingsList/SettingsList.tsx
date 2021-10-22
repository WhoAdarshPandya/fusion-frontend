import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Switch,
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

import "./SettingsList.css";
import { useDarkMode, useDigitalWellBeing } from "../../hooks";

export const SettingsList = (): JSX.Element => {
  const { currentTheme, themeToggler } = useDarkMode();
  const { isTurnedOn, toggler } = useDigitalWellBeing();
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
          <ListItem button key={text}>
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
                <Switch
                  checked={currentTheme === "light" ? false : true}
                  onChange={themeToggler}
                />
              )}
              {hasSwitch && text === "Digital Well Being" && (
                <Switch checked={isTurnedOn} onChange={toggler} />
              )}
              {hasSwitch && text === "Suspende Message Notifications" && (
                <Switch
                  checked={currentTheme === "light" ? false : true}
                  onChange={themeToggler}
                />
              )}
              {!hasSwitch && (
                <IconButton>
                  <ChevronRightIcon />
                </IconButton>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        </Paper>
      ))}
    </>
  );
};
