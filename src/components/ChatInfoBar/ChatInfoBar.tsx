import {
  Avatar,
  IconButton,
  Typography,
  Paper,
  Popover,
} from "@material-ui/core";
import PaletteIcon from "@material-ui/icons/Palette";
import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";
import { useDarkMode, useUser } from "../../hooks";
import { useEffect, useState } from "preact/hooks";
import "./ChatInfoBar.css";
import { getChatTheme, setChatTheme } from "../../utils";

interface ChatUserProp {
  user: any;
  onAnonymousClick: () => void;
  anonymousChat: boolean;
}

export const ChatInfoBar = ({
  user,
  onAnonymousClick,
  anonymousChat,
}: ChatUserProp): JSX.Element => {
  // console.log("info bar", user);
  const { currentTheme } = useDarkMode();
  const [themePopOver, setThemePopOver] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { getUserTheme } = useUser();

  useEffect(() => {
    setChatTheme(getChatTheme()!);
  }, []);

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
        {user !== null && user !== undefined && (
          <>
            <Avatar src={user.user_profile} alt="user-photo" />
            <Typography className="user-name" variant="body1">
              {user.name ? user.name : "user name"}
            </Typography>
          </>
        )}
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
        {anonymousChat ? (
          <IconButton onClick={onAnonymousClick} color="primary">
            <OfflineBoltIcon />
          </IconButton>
        ) : (
          <IconButton onClick={onAnonymousClick}>
            <OfflineBoltIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};
