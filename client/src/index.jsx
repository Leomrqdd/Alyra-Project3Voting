import React from "react";
import ReactDOM from "react-dom/client";
import { VotingProvider } from "./contexts/VotingContext";
import App from "./App";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <VotingProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </VotingProvider>
);
