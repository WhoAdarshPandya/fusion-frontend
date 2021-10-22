import {
  Avatar,
  Badge,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { SettingsList } from "..";
import "./Settings.css";

export const Settings = (): JSX.Element => {
  return (
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
              <IconButton className="bg-primary">
                <EditOutlinedIcon
                  color="action"
                  className="white"
                  fontSize="small"
                />
              </IconButton>
            }
          >
            <Avatar
              src={"https://randomuser.me/api/portraits/men/4.jpg"}
              className="large-profile"
            />
          </Badge>

          <div className="user-details">
            <Typography variant="h6" color="primary">
              Sharan shah
            </Typography>
            <Typography variant="body1" color="textSecondary">
              @bhangisamaj
            </Typography>
          </div>
        </div>
        <div>
          <IconButton color="primary">
            <EditOutlinedIcon />
          </IconButton>
        </div>
      </Paper>
      <br />
      <SettingsList />
      <br />
    </Paper>
  );
};
