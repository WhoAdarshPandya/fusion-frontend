import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
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

export const SettingsList = (): JSX.Element => {
  return (
    <>
      {[
        { text: "Change Password", component: <SecurityOutlinedIcon /> },
        { text: "Delete Account", component: <DeleteOutlineOutlinedIcon /> },
        { text: "Change Theme", component: <ColorLensOutlinedIcon /> },
        { text: "Do Not Disturb", component: <BlockIcon /> },
        {
          text: "Suspende Message Notifications",
          component: <NotificationsOffOutlinedIcon />,
        },
        { text: "Digital Well Being", component: <VisibilityOutlinedIcon /> },
        { text: "About The Developer", component: <InfoOutlinedIcon /> },
        { text: "Logout", component: <PowerSettingsNewOutlinedIcon /> },
      ].map(({ text, component }) => (
        <Paper className="settings-list transition-class" variant="outlined">
          <ListItem button key={text}>
            <ListItemIcon>{component}</ListItemIcon>
            <ListItemText primary={text} />
            <ListItemSecondaryAction>
              <IconButton>
                <ChevronRightIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Paper>
      ))}
    </>
  );
};
