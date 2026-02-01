import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppDataProvider } from "./context/AppDataContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppDataProvider>
      <App />
    </AppDataProvider>
  </BrowserRouter>
);
