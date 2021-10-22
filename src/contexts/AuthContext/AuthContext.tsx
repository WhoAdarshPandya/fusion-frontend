import { createContext, useReducer } from "preact/compat";
import { ReactNode, Dispatch } from "react";
import { reducer } from "./reducer";

export type AuthContextReducerType = (
  state: AuthState,
  action: AuthAction
) => AuthState;

export interface AuthState {
  isLoggedIn: boolean;
}

export interface AuthAction {
  type: "LOGIN" | "LOGOUT";
}

let initialState: AuthState = { isLoggedIn: true };

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}>({ state: initialState, dispatch: () => {} });

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
