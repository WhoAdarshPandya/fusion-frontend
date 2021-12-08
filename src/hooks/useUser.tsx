import { useContext } from "preact/hooks";
import {
  SET_USER,
  UserContext,
  SET_DND,
  SET_NOTIFICATION,
  SET_EMAIL,
  SET_USERNAME,
  SET_NAME,
} from "../contexts/UserContext";
import { User } from "../utils";

export const useUser = (): {
  getUserData: () => User;
  setUserData: (user: User) => void;
  setUserDnd: (dnd: boolean) => void;
  setUserNotification: (notification: boolean) => void;
  setUserProfile: (url: string) => void;
  setUserName: (name: string) => void;
  setUserUserName: (user_name: string) => void;
  setUserEmail: (email: string) => void;
  getUserName: () => string;
  getUserID: () => string;
  getUserUserName: () => string;
  getUserTheme: () => string;
  getUserChatID: () => string;
  getUserRequestID: () => String;
  getUserTodoID: () => string;
  getUserDndStatus: () => Boolean;
  getUserNotificationStatus: () => boolean;
  getUserJoinedAt: () => string;
  getUserEmail: () => string;
  getUserFriendID: () => string;
  getUserProfileUrl: () => string;
} => {
  const { dispatch, state } = useContext(UserContext);
  const getUserData = (): User => {
    return state;
  };

  const setUserData = (user: User): void => {
    dispatch({ type: SET_USER, payload: user });
  };

  const setUserName = (name: string): void => {
    dispatch({ type: SET_NAME, payload: name });
  };

  const setUserUserName = (user_name: string): void => {
    dispatch({ type: SET_USERNAME, payload: user_name });
  };

  const setUserEmail = (email: string): void => {
    dispatch({ type: SET_EMAIL, payload: email });
  };
  const setUserDnd = (dnd: boolean): void => {
    dispatch({ type: SET_DND, payload: { dnd } });
  };

  const setUserNotification = (notification: boolean): void => {
    dispatch({ type: SET_NOTIFICATION, payload: { notification } });
  };

  const setUserProfile = (url: string): void => {
    dispatch({ type: "SET_PROFILE_URL", payload: { profile_url: url } });
  };

  const getUserName = (): string => state.name;
  const getUserID = (): string => state.user_id;
  const getUserUserName = (): string => state.user_name;
  const getUserTheme = (): string => state.theme;
  const getUserChatID = (): string => state.chat_id;
  const getUserRequestID = (): String => state.request_id;
  const getUserTodoID = (): string => state.todo_id;
  const getUserDndStatus = (): Boolean => state.dnd;
  const getUserNotificationStatus = (): boolean => state.notification;
  const getUserJoinedAt = (): string => state.joined_at;
  const getUserEmail = (): string => state.email;
  const getUserFriendID = (): string => state.friend_id;
  const getUserProfileUrl = (): string => state.profile_url;

  return {
    getUserData,
    setUserData,
    setUserDnd,
    setUserNotification,
    getUserChatID,
    getUserDndStatus,
    getUserEmail,
    getUserFriendID,
    getUserID,
    getUserJoinedAt,
    getUserName,
    getUserNotificationStatus,
    getUserProfileUrl,
    getUserRequestID,
    getUserTheme,
    getUserTodoID,
    getUserUserName,
    setUserProfile,
    setUserEmail,
    setUserName,
    setUserUserName,
  };
};
