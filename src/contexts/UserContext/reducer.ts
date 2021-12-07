import { SET_NAME } from "./actions";
import {
  GET_USER,
  SET_USER,
  SET_DND,
  SET_NOTIFICATION,
  SET_PROFILE_URL,
  SET_EMAIL,
  SET_USERNAME,
  RESET_USER,
} from ".";
import { UserContextReducerType } from "./UserContext";

export let reducer: UserContextReducerType = (state, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state };
    case SET_USER:
      return {
        ...state,
        chat_id: action.payload?.chat_id,
        dnd: action.payload?.dnd,
        email: action.payload?.email,
        friend_id: action.payload?.friend_id,
        joined_at: action.payload?.joined_at,
        name: action.payload?.name,
        notification: action.payload?.notification,
        password: "",
        profile_url: action.payload?.profile_url,
        request_id: action.payload?.request_id,
        theme: action.payload?.theme,
        todo_id: action.payload?.todo_id,
        user_id: action.payload?.user_id!,
        user_name: action.payload?.user_name,
      };
    case SET_DND:
      return { ...state, dnd: action.payload.dnd };
    case SET_NOTIFICATION:
      return { ...state, notification: action.payload.notification };
    case SET_PROFILE_URL:
      return { ...state, profile_url: action.payload.profile_url };
    case SET_NAME:
      return { ...state, name: action.payload.name };
    case SET_EMAIL:
      return { ...state, email: action.payload.email };
    case SET_USERNAME:
      return { ...state, user_name: action.payload.user_name };
    case RESET_USER:
      return {
        chat_id: "",
        dnd: false,
        email: "",
        joined_at: "",
        friend_id: "",
        name: "",
        user_id: "",
        user_name: "",
        profile_url: "",
        notification: false,
        password: "",
        request_id: "",
        theme: "",
        todo_id: "",
      };
    default:
      return state;
  }
};
