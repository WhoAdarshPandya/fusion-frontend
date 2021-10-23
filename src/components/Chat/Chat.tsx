import {
  Avatar,
  Divider,
  IconButton,
  Paper,
  Switch,
  Typography,
} from "@material-ui/core";
import { ChatList } from "..";
import PaletteIcon from "@material-ui/icons/Palette";
import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";
import "./Chat.css";

export const Chat = (): JSX.Element => {
  return (
    <Paper elevation={0} className="chat-container transition-class">
      <div className="chat-flexbox">
        <div className="chat-friends">
          <Switch /> <span>DND</span>
          <Divider />
          <ChatList />
        </div>
        <div className="chat-window">
          <div className="chat-info-bar">
            <div className="chat-info-profile">
              <Avatar
                src="
          https://randomuser.me/api/portraits/men/4.jpg
          "
              />
              <Typography className="user-name" variant="body1">
                Sharan Shah
              </Typography>
            </div>
            <div className="chat-info-buttons">
              <IconButton color="primary">
                <PaletteIcon />
              </IconButton>
              <IconButton color="primary">
                <OfflineBoltIcon />
              </IconButton>
            </div>
          </div>

          <div className="chat-main-window"></div>
        </div>
      </div>
    </Paper>
  );
};
