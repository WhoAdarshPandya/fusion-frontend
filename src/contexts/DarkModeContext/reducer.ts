import { LIGHT_THEME, DARK_THEME } from "./actions";
import { DarkModeReducerType } from "./DarkModeContext";

export const reducer: DarkModeReducerType = (state, action) => {
  switch (action.type) {
    case LIGHT_THEME:
      return { ...state, currentTheme: LIGHT_THEME };
    case DARK_THEME:
      return { ...state, currentTheme: DARK_THEME };
    default:
      return state;
  }
};
