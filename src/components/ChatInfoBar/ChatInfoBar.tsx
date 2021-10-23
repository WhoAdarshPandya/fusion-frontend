import {
  Avatar,
  IconButton,
  Typography,
  Paper,
  Popover,
} from "@material-ui/core";
import PaletteIcon from "@material-ui/icons/Palette";
import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";
import { useDarkMode } from "../../hooks";
import { useState } from "preact/hooks";
import { CirclePicker } from "react-color";
import "./ChatInfoBar.css";
import { setChatTheme } from "../../utils";

export const ChatInfoBar = (): JSX.Element => {
  const { currentTheme } = useDarkMode();
  const [themePopOver, setThemePopOver] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
    setThemePopOver(false);
  };
  const handleClick = (event: any) => {
    setThemePopOver(true);
    setAnchorEl(event.currentTarget);
  };

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
        <IconButton id="theme-popover" onClick={handleClick} color="primary">
          <PaletteIcon />
        </IconButton>

        {/* popover */}
        <Popover
          id="theme-popover"
          open={themePopOver}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Paper className="dark-mode-chat paper-padding" elevation={0}>
            {["#ee5522", "#1597e5", "#1c7947", "#1a1b1a"].map(
              (color: string) => (
                <div
                  onClick={() => {
                    setChatTheme(color);
                  }}
                  className={`color-circles theme${color.replace("#", "")}`}
                ></div>
              )
            )}
          </Paper>
        </Popover>
        {/* popover */}
        <IconButton color="primary">
          <OfflineBoltIcon />
        </IconButton>
      </div>
    </div>
  );
};
