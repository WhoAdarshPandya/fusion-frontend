import { Divider, Paper, Switch } from "@material-ui/core";
import Cookies from "js-cookie";
import { useEffect } from "preact/hooks";
import { useState } from "react";
import { ChatList, ChatInfoBar, ChatMainWindow, ChatBeforeAnimation } from "..";
import { useSnackbarHelper, useUser } from "../../hooks";
import { getAllChatsReq, getSocket, getUserId } from "../../utils";
import "./Chat.css";

export const Chat = (): JSX.Element => {
  const [currentFriendForChat, setCurrentFriendForChat] = useState({
    date: "",
    friendship_id: "",
    name: "",
    time: "",
    user_id: "",
    user_name: "",
    user_profile: "",
    _id: "",
  });
  const [anonymousMode, setAnonymousMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const { snackbarInjector } = useSnackbarHelper();
  const { getUserNotificationStatus } = useUser();
  console.log(messages);
  const getChatsU = async () => {
    const data = await getAllChatsReq(Cookies.get("chat_id")!);
    if (data.success) {
      setMessages(data.result.data.result);
    } else {
      alert("error occured");
    }
  };
  const handleChatClick = async (user: any) => {
    console.log(user);
    setCurrentFriendForChat(user);
    await getChatsU();
  };

  const toggleAnonymousMode = () => {
    setAnonymousMode((prev) => !prev);
  };

  const handleSetMsgs = async (chat: any) => {
    // await getChatsU();
    // @ts-ignore
    setMessages((prev: any) => [...prev, chat]);
  };
  let nft = getUserNotificationStatus();
  useEffect(() => {
    setTimeout(() => {
      // nft = getUserNotificationStatus();
      console.log(nft);
      if (nft === false) {
        console.log("nft", nft);
        getSocket().on(
          `new_incoming_msg${getUserId()}`,
          ({ msg, sender_id, chat_id, friendship_id, name }) => {
            // const nft = getUserNotificationStatus() as boolean;
            // nft === false &&
            snackbarInjector("info", `${name} : ${msg}`, true, "5000");
          }
        );
      } else {
        console.log("removed");
        // getSocket().off(`new_incoming_msg${getUserId()}`, () => {});
        getSocket().removeAllListeners(`new_incoming_msg${getUserId()}`);
        getSocket().on(
          `new_incoming_msg${getUserId()}`,
          ({ msg, sender_id, chat_id, friendship_id, name }) => {
            console.log("object");
            // const nft = getUserNotificationStatus() as boolean;
            // nft === false &&
            // snackbarInjector("info", `${name} : ${msg}`, true, "5000");
          }
        );
      }
    }, 2000);
  }, [nft]);

  return (
    <Paper elevation={0} className="chat-container transition-class">
      <div className="chat-flexbox">
        <div className="chat-friends">
          <ChatList onChatClick={handleChatClick} />
        </div>
        <div className="chat-window">
          {currentFriendForChat.user_id === "" ? (
            <ChatBeforeAnimation />
          ) : (
            <>
              <ChatInfoBar
                anonymousChat={anonymousMode}
                onAnonymousClick={toggleAnonymousMode}
                user={currentFriendForChat}
              />
              <ChatMainWindow
                setMessages={handleSetMsgs}
                messages={messages}
                anonymousMode={anonymousMode}
                user={currentFriendForChat}
              />
            </>
          )}
        </div>
      </div>
    </Paper>
  );
};
