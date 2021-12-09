import { IconButton, InputBase, Paper, Popover } from "@material-ui/core";
import EmojiEmotionsRounded from "@material-ui/icons/EmojiEmotionsRounded";
import SendRounded from "@material-ui/icons/SendRounded";
import { useEffect, useRef, useState } from "preact/hooks";
import { useDarkMode, useSnackbarHelper, useUser } from "../../hooks";
// import { Suspense, lazy } from "react";
import { Suspense, lazy } from "react";
// import Picker from "emoji-picker-react";
import { ChatBubble, ChatDetails, Loader } from "..";
import "./ChatMainWindow.css";
import {
  getAllChatsReq,
  getSocket,
  getToken,
  getUserData,
  getUserId,
} from "../../utils";
import Cookies from "js-cookie";

const Picker = lazy(() => import("emoji-picker-react"));

interface ChatUserProp {
  user: any;
  anonymousMode: boolean;
  messages: { sender_id: string; chat_id: string; msg: string }[];
  setMessages: (chat: any) => void;
}

export const ChatMainWindow = ({
  user,
  anonymousMode,
  messages,
  setMessages,
}: ChatUserProp): JSX.Element => {
  // console.log(Picker.toString());
  const { currentTheme } = useDarkMode();
  const [emojiPopOver, setEmojiPopOver] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [msgText, setMsgText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState("");
  // const [messages, setMessages] = useState([
  //   { chat_id: "", sender_id: "", msg: "" },
  // ]);
  const { snackbarInjector } = useSnackbarHelper();
  // ⚛ experimental
  const { getUserNotificationStatus, getUserName } = useUser();
  const messageEl = useRef<HTMLDivElement>(null);
  // messageEl.current?.scrollIntoView({ behavior: "smooth" });

  // const getChatsU = async () => {
  //   const data = await getAllChatsReq(Cookies.get("chat_id")!);
  //   if (data.success) {
  //     // console.log("data chat", data.result);
  //     let pure_data = data.result.data.result.filter(
  //       (chatItem: any) => chatItem.friendship_id === user.friendship_id
  //     );
  //     setMessages(pure_data);
  //     setIsLoading(false);
  //   } else {
  //     alert("error occured");
  //   }
  // };
  const name = getUserName();
  useEffect(() => {
    scrollToBottom();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     await getChatsU();
  //   })();
  // }, [user]);

  useEffect(() => {
    // getSocket().emit('join_room',)
    // (async () => {
    //   await getChatsU();
    // })();
    getSocket().on(
      `new_incoming_msg${getUserId()}`,
      ({ msg, sender_id, chat_id, friendship_id, name }) => {
        // getChatsU();
        setMessages({ msg, sender_id, chat_id, friendship_id });
        scrollToBottom();
        // const nft = getUserNotificationStatus() as boolean;
        // console.log(messages);
        // console.log(msg);
        // console.log(nft);
        // nft === false &&
        // snackbarInjector("info", `${name} : ${msg}`, true, "5000");
      }
    );

    getSocket().on(`loadChat${getUserId()}`, ({ updateChat }) => {
      // getChatsU();
      console.log(messages);
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  // ⚛ experimental
  const scrollToBottom = () => {
    console.log("called");
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
    setMsgText((prev) => prev + emoji.emoji);
  };

  const handleSend = async () => {
    const another_chat_id = await (
      await getUserData(user.user_id)
    ).result.data.result[0].chat_id;
    console.log(another_chat_id);
    if (msgText !== "") {
      getSocket().emit("new_msg", {
        token: getToken()!,
        chat_id: Cookies.get("chat_id"),
        another_chat_id,
        msg: msgText,
        sender_id: getUserId(),
        receiver_id: user.user_id,
        friendship_id: user.friendship_id,
        date: "",
        time: "",
        anonymousMode,
        name,
      });
      // setMessages({ msg, sender_id, chat_id });

      setMessages({
        msg: msgText,
        sender_id: getUserId(),
        chat_id: Cookies.get("chat_id"),
        friendship_id: user.friendship_id,
      });
      scrollToBottom();
      setMsgText("");
    } else {
      snackbarInjector("error", "no empty msgs", true, "5000");
    }
  };
  const handleKeyP = (e: any) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };
  return (
    <Suspense fallback={<p>loading...</p>}>
      <div className="hidden-picker">
        <Picker onEmojiClick={onEmojiClick} />
      </div>
      <div className="chat-main-window">
        <div className="chat-playground" id="playground">
          {/* ⚛experimental */}
          {user === undefined && (
            <>
              <br />
              <ChatBubble from="you">hello ji</ChatBubble>
              <ChatBubble from="me">ha bol</ChatBubble>
              <ChatBubble from="you">su bhay</ChatBubble>
              <ChatBubble from="you">brbr?</ChatBubble>
              <ChatBubble from="you">
                adkjfl sadaf;lk ;lksajflsdkjf lasjfljsdjfl ;sjakfjlasjfd
                sdkjsajflsj sklfj;ajf;sjlsdl asdj;fljdsaf lkjjl sdjf;af;jsdfj
                dkjfask
              </ChatBubble>
              <ChatBubble from="me">
                adkjfl sadaf;lk ;lksajflsdkjf lasjfljsdjfl ;sjakfjlasjfd
                sdkjsajflsj sklfj;ajf;sjlsdl asdj;fljdsaf lkjjl sdjf;af;jsdfj
                dkjfask
              </ChatBubble>
              <ChatBubble isTyping={true} from="me">
                {null}
              </ChatBubble>
              {/* <div className="bottom-ref" ref={messageEl}></div> */}
            </>
          )}
          {user !== null && user !== undefined && (
            <>
              {messages.map(
                (msg: any) =>
                  msg.friendship_id === user.friendship_id && (
                    <>
                      <ChatBubble
                        from={msg.sender_id === getUserId() ? "me" : "you"}
                      >
                        {msg.msg}
                      </ChatBubble>
                      <br />
                      <br />
                      {/* <div className="bottom-ref" ref={messageEl}></div> */}
                    </>
                  )
              )}
              <br />
              <br />
              <div className="bottom-ref" ref={messageEl}></div>
            </>
          )}
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
            <InputBase
              value={msgText}
              onKeyPress={(e) => handleKeyP(e)}
              onChange={(e) => {
                setMsgText(e.target.value);
              }}
              className="msg-input"
              placeholder="Send a message..."
            />

            <IconButton onClick={handleSend}>
              <SendRounded />
            </IconButton>
          </div>
        </div>
      </div>
    </Suspense>
  );
};
