import { Divider, Paper, Switch } from "@material-ui/core";
import Cookies from "js-cookie";
import { useState } from "react";
import { ChatList, ChatInfoBar, ChatMainWindow } from "..";
import { useUser } from "../../hooks";
import { getAllChatsReq } from "../../utils";
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
  return (
    <Paper elevation={0} className="chat-container transition-class">
      <div className="chat-flexbox">
        <div className="chat-friends">
          <ChatList onChatClick={handleChatClick} />
        </div>
        <div className="chat-window">
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
        </div>
      </div>
    </Paper>
  );
};
