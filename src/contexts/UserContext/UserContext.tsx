import { createContext, useReducer } from "preact/compat";
import { ReactNode, Dispatch } from "react";
import { User } from "../../utils";
import { reducer } from "./reducer";

export type UserContextReducerType = (
  state: UserState,
  action: UserAction
) => UserState;

export interface UserState extends User {}

export interface UserAction {
  type:
    | "SET_USER"
    | "GET_USER"
    | "SET_DND"
    | "SET_NOTIFICATION"
    | "SET_PROFILE_URL"
    | "SET_NAME"
    | "SET_EMAIL"
    | "SET_USERNAME"
    | "RESET_USER";
  payload: any;
}

let initialState: UserState = {
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

export const UserContext = createContext<{
  state: UserState;
  dispatch: Dispatch<UserAction>;
}>({ state: initialState, dispatch: () => {} });

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
