import { render } from "preact";
import { App } from "./App";
import { AppContext } from "./components";
import "./index.css";
import { registerSW } from "virtual:pwa-register";

const updateSw = registerSW({
  onNeedRefresh: () => {
    alert("refresh");
  },
  onOfflineReady: () => {
    alert("offline ready");
  },
  onRegisterError: (err: any) => {
    console.log("error", err);
  },
  onRegistered: () => {
    console.log("registered");
  },
});

render(
  <AppContext>
    <App />
  </AppContext>,
  document.getElementById("app")!
);

// {
//   /* // <SnackbarProvider maxSnack={4}>
//   //   <BrowserRouter>
//   //     <AuthContextProvider>
//   //       <WellBeingProvider>
//   //         <DarkModeProvider> */
// }

// {
//   /* //         </DarkModeProvider>
//   //       </WellBeingProvider>
//   //     </AuthContextProvider>
//   //   </BrowserRouter>
//   // </SnackbarProvider > */
// }
