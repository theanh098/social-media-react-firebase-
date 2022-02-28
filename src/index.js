import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./store/AuthProvider";
import { AppProvider } from "./store/AppProvider";
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
