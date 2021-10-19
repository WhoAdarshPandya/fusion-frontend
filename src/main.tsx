import { render } from "preact";
import { App } from "./App";
import "./index.css";
import { StrictMode } from "preact/compat";
import { BrowserRouter } from "react-router-dom";

render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>,
  document.getElementById("app")!
);
