import { IconButton, InputBase, Paper, Popover } from "@material-ui/core";
import EmojiEmotionsRounded from "@material-ui/icons/EmojiEmotionsRounded";
import SendRounded from "@material-ui/icons/SendRounded";
import { useEffect, useRef, useState } from "preact/hooks";
import { useDarkMode } from "../../hooks";
// import { Suspense, lazy } from "react";
import { Suspense, lazy } from "react";
// import Picker from "emoji-picker-react";
import { ChatBubble, ChatDetails } from "..";
import "./ChatMainWindow.css";

const Picker = lazy(() => import("emoji-picker-react"));

export const ChatMainWindow = (): JSX.Element => {
  // console.log(Picker.toString());
  const { currentTheme } = useDarkMode();
  const [emojiPopOver, setEmojiPopOver] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // ⚛ experimental
  const messageEl = useRef<HTMLDivElement>(null);
  messageEl.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, []);
  // ⚛ experimental
  const scrollToBottom = () => {
    messageEl.current?.scrollIntoView({ behavior: "smooth" });
  };
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
        <div className="chat-playground" id="playground">
          {/* ⚛experimental */}
          <ChatDetails DayAndDate={"Monday, 24 November"} />
          <div className="bubble you">So, how's your new phone?</div>
          <div className="bubble you">You finally have a smartphone :D</div>
          <ChatDetails DayAndDate={"Monday, 24 November"} />
          <div className="bubble me">Drake?</div>
          <div className="bubble me">Why aren't you answering?</div>
          <div className="bubble me">Why aren't you answering?</div>
          <div className="bubble me">Why aren't you answering?</div>
          <div className="bubble me">Why aren't you answering?</div>
          <div className="bubble me">Why aren't you answering?</div>
          <div className="bubble me">Why aren't you answering?</div>
          <div className="bubble me">Why aren't you answering?</div>
          <ChatBubble from="you">hello ji</ChatBubble>
          <ChatBubble from="me">ha bol</ChatBubble>
          <ChatBubble from="you">su bhay</ChatBubble>
          <ChatBubble from="you">brbr?</ChatBubble>
          <ChatBubble from="you">
            adkjfl sadaf;lk ;lksajflsdkjf lasjfljsdjfl ;sjakfjlasjfd sdkjsajflsj
            sklfj;ajf;sjlsdl asdj;fljdsaf lkjjl sdjf;af;jsdfj dkjfask
          </ChatBubble>
          <ChatBubble from="me">
            adkjfl sadaf;lk ;lksajflsdkjf lasjfljsdjfl ;sjakfjlasjfd sdkjsajflsj
            sklfj;ajf;sjlsdl asdj;fljdsaf lkjjl sdjf;af;jsdfj dkjfask
          </ChatBubble>
          <ChatBubble isTyping={true} from="me">
            {null}
          </ChatBubble>
          <div className="bottom-ref" ref={messageEl}></div>
          {/* ⚛experimental */}
        </div>
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
