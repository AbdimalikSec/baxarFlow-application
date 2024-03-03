import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { InputProvider } from "./context/context.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <InputProvider>
        <App />
      </InputProvider>
    </BrowserRouter>
  </React.StrictMode>
);
