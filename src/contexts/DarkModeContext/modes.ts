import { createTheme, responsiveFontSizes } from "@material-ui/core";

export const lightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      type: "light",
    },
  })
);

export const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#BB86FC",
        dark: "#825db0",
        light: "#c89efc",
        contrastText: "#fff",
      },
      secondary: {
        main: "#03DAC5",
        dark: "#029889",
        light: "#35e1d0",
        contrastText: "#fff",
      },
    },
  })
);
