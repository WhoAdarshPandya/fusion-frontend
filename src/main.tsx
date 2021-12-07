import { render } from "preact";
import { App } from "./App";
import { AppContext } from "./components";
import "./index.css";
// import { registerSW } from "virtual:pwa-register";

// const updateSw = registerSW({
//   immediate: true,
//   onNeedRefresh: () => {
//     console.log("need refresh");
//     updateSw();
//   },
//   onOfflineReady: () => {
//     console.log("offline ready");
//   },
//   onRegisterError: (err: any) => {
//     console.log("error", err);
//   },
//   onRegistered: (r) => {
//     console.log("registered");
//     r &&
//       setInterval(() => {
//         r.update();
//         console.log("update happened");
//       }, 600000);
//   },
// });

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
