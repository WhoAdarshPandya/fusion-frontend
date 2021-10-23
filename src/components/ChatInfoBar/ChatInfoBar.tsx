import { Avatar, IconButton, Typography } from "@material-ui/core";
import PaletteIcon from "@material-ui/icons/Palette";
import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";
import "./ChatInfoBar.css";
import { useDarkMode } from "../../hooks";

export const ChatInfoBar = (): JSX.Element => {
  const { currentTheme } = useDarkMode();
  return (
    <div
      className={
        currentTheme === "light"
          ? "chat-info-bar"
          : "chat-info-bar dark-mode-chat"
      }
    >
      <div className="chat-info-profile">
        <Avatar src="https://randomuser.me/api/portraits/men/4.jpg" />
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
  );
};
