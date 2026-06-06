import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const audio = new Audio("/click.mp3");
    audio.volume = 0.3;
    audio.play();
  }
});


ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);