import { createContext, useReducer } from "preact/compat";
import { reducer } from "./reducer";
import { ReactNode, Dispatch } from "react";
import { lightTheme, darkTheme } from "./modes";
import { ThemeProvider } from "@material-ui/core";

export type DarkModeReducerType = (
  state: DarkModeState,
  action: DarkModeAction
) => DarkModeState;

export interface DarkModeState {
  currentTheme: "light" | "dark";
}

interface DarkModeAction {
  type: "light" | "dark";
}

let initialState: DarkModeState = { currentTheme: "light" };

export const DarkModeContext = createContext<{
  state: DarkModeState;
  dispatch: Dispatch<DarkModeAction>;
}>({ state: initialState, dispatch: () => {} });

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DarkModeContext.Provider value={{ state, dispatch }}>
      <ThemeProvider
        theme={state.currentTheme === "light" ? lightTheme : darkTheme}
      >
        {children}
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
};
