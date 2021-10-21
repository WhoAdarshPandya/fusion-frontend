import {
  DarkModeContext,
  LIGHT_THEME,
  DARK_THEME,
} from "../contexts/DarkModeContext";
import { useContext } from "preact/hooks";

export const useDarkMode = (): {
  currentTheme: string;
  setItDark: () => void;
  setItLight: () => void;
  themeToggler: () => void;
} => {
  const { state, dispatch } = useContext(DarkModeContext);
  const currentTheme = state.currentTheme;
  const setItDark = () => dispatch({ type: DARK_THEME });
  const setItLight = () => dispatch({ type: LIGHT_THEME });
  const themeToggler = () =>
    dispatch({
      type: state.currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME,
    });
  return { currentTheme, setItDark, setItLight, themeToggler };
};
