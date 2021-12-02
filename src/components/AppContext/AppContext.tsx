import { Fragment, ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../../contexts/AuthContext";
import { DarkModeProvider } from "../../contexts/DarkModeContext";
import { WellBeingProvider } from "../../contexts/WellBeingContext";
import { SnackbarProvider } from "notistack";
import { UserContextProvider } from "../../contexts/UserContext/UserContext";

export const AppContext = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  return (
    <Fragment>
      <SnackbarProvider maxSnack={4}>
        <BrowserRouter>
          <AuthContextProvider>
            <WellBeingProvider>
              <UserContextProvider>
                <DarkModeProvider>{children}</DarkModeProvider>
              </UserContextProvider>
            </WellBeingProvider>
          </AuthContextProvider>
        </BrowserRouter>
      </SnackbarProvider>
    </Fragment>
  );
};
