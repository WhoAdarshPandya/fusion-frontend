import { Divider, Paper, Switch } from "@material-ui/core";
import { ChatList, ChatInfoBar, ChatMainWindow } from "..";
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
          <ChatInfoBar />
          <ChatMainWindow />
        </div>
      </div>
    </Paper>
  );
};
