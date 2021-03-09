import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "./auth-context";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  rootElement
);
