import { SnackbarProvider } from "notistack";
import { Fragment, ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../../contexts/AuthContext";
import { DarkModeProvider } from "../../contexts/DarkModeContext";
import { WellBeingProvider } from "../../contexts/WellBeingContext";

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
              <DarkModeProvider>{children}</DarkModeProvider>
            </WellBeingProvider>
          </AuthContextProvider>
        </BrowserRouter>
      </SnackbarProvider>
    </Fragment>
  );
};