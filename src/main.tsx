import { render } from "preact";
import { App } from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  createAction,
} from "kbar";
import { StrictMode } from "preact/compat";
import { DarkModeProvider } from "./contexts/DarkModeContext/DarkModeContext";
import { AuthContextProvider } from "./contexts/AuthContext";

const searchStyle = {
  padding: "12px 16px",
  fontSize: "16px",
  width: "100%",
  boxSizing: "border-box" as React.CSSProperties["boxSizing"],
  outline: "none",
  border: "none",
  background: "#fff",
  color: "var(--foreground)",
};

const animatorStyle = {
  maxWidth: "600px",
  width: "100%",
  background: "var(--background)",
  color: "var(--foreground)",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "var(--shadow)",
};

const actions = [
  {
    id: "homeAction",
    name: "Home",
    shortcut: ["h"],
    keywords: "back",
    section: "Navigation",
    subtitle: "Subtitles can help add more context.",
    perform: () => (window.location.pathname = "/"),
  },
  {
    id: "about",
    name: "About",
    shortcut: ["a"],
    keywords: "about section",
    perform: () => (window.location.pathname = "about"),
  },
  {
    id: "contact",
    name: "Contact",
    shortcut: ["c"],
    keywords: "email",
    perform: () => (window.location.pathname = "contact"),
  },
  {
    id: "twitterAction",
    name: "Twitter",
    shortcut: ["t"],
    keywords: "social contact dm",
    section: "Navigation",
    perform: () => window.open("https://twitter.com/timcchang", "_blank"),
  },
];

render(
  // <KBarProvider actions={actions}>
  //   <KBarPortal>
  //     <KBarPositioner>
  //       <KBarAnimator style={animatorStyle}>
  //         <KBarSearch
  //           style={searchStyle}
  //           placeholder="Type a command or search…"
  //         />
  //         <KBarResults />
  //       </KBarAnimator>
  //     </KBarPositioner>
  //   </KBarPortal> */}
  <SnackbarProvider maxSnack={4}>
    <BrowserRouter>
      <AuthContextProvider>
        <DarkModeProvider>
          <App />
        </DarkModeProvider>
      </AuthContextProvider>
    </BrowserRouter>
    ,
  </SnackbarProvider>,
  // </KBarProvider>,
  document.getElementById("app")!
);
