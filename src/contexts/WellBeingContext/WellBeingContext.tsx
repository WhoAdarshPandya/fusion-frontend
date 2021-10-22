import { createContext, useReducer } from "preact/compat";
import { ReactNode, Dispatch } from "react";
import { reducer } from "./reducer";

export type WellBeingReducerType = (
  state: WellBeingState,
  action: WellBeingAction
) => WellBeingState;

export interface WellBeingState {
  isTurnedOn: boolean;
}

export interface WellBeingAction {
  type: "ON" | "OFF";
}

let initialState: WellBeingState = { isTurnedOn: false };

export const WellBeingContext = createContext<{
  state: WellBeingState;
  dispatch: Dispatch<WellBeingAction>;
}>({ state: initialState, dispatch: () => {} });

export const WellBeingProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <WellBeingContext.Provider value={{ state, dispatch }}>
      {children}
    </WellBeingContext.Provider>
  );
};
