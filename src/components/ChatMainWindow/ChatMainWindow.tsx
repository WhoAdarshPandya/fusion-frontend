import { IconButton, InputBase, Paper, Popover } from "@material-ui/core";
import EmojiEmotionsRounded from "@material-ui/icons/EmojiEmotionsRounded";
import SendRounded from "@material-ui/icons/SendRounded";
import { useState } from "preact/hooks";
import { useDarkMode } from "../../hooks";
// import { Suspense, lazy } from "react";
import { Suspense, lazy } from "react";
// import Picker from "emoji-picker-react";
import "./ChatMainWindow.css";
import "preact/debug";

const Picker = lazy(() => import("emoji-picker-react"));

export const ChatMainWindow = (): JSX.Element => {
  // console.log(Picker.toString());
  const { currentTheme } = useDarkMode();
  const [emojiPopOver, setEmojiPopOver] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
    setEmojiPopOver(false);
  };
  const handleClick = (event: any) => {
    setEmojiPopOver(true);
    setAnchorEl(event.currentTarget);
  };

  const onEmojiClick = (event: any, emoji: any) => {
    console.log(emoji);
  };

  return (
    <Suspense fallback={<p>loading...</p>}>
      <div className="hidden-picker">
        <Picker onEmojiClick={onEmojiClick} />
      </div>
      <div className="chat-main-window">
        <div className="chat-playground" id="playground"></div>
        <div className="msg-bar">
          <div
            className={
              currentTheme === "light"
                ? "msg-bar-item-container"
                : "msg-bar-item-container dark-mode-chat"
            }
          >
            <IconButton onClick={handleClick} aria-describedby="emoji-popover">
              <EmojiEmotionsRounded />
            </IconButton>
            {/* popover */}
            <Popover
              id="emoji-popover"
              open={emojiPopOver}
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
              className="emoji-window"
            >
              <Paper className="dark-mode-chat" elevation={0}>
                <Picker onEmojiClick={onEmojiClick} />
              </Paper>
            </Popover>
            {/* popover */}
            <InputBase className="msg-input" placeholder="Send a message..." />

            <IconButton>
              <SendRounded />
            </IconButton>
          </div>
        </div>
      </div>
    </Suspense>
  );
};
