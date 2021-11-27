import { ReactNode } from "react";
import "./ChatBubble.css";

export const ChatBubble = ({
  children = null,
  isTyping = false,
  from,
}: {
  children: ReactNode;
  from: "me" | "you";
  isTyping?: boolean;
}): JSX.Element => {
  return (
    <>
      {children !== null && <div className={`bubble ${from}`}>{children}</div>}
      {isTyping && (
        <div className="bubble you">
          <div className="dot one"></div>
          <div className="dot two"></div>
          <div className="dot three"></div>
        </div>
      )}
    </>
  );
};
