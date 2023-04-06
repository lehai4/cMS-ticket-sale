import React from "react";
import { ContextProvider } from "./contexts/ContextProvider";
import { registerLicense } from "@syncfusion/ej2-base";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./sass/index.scss";
import reportWebVitals from "./reportWebVitals";

registerLicense(
  "Mgo+DSMBaFt+QHFqVkNrWU5AaV1CX2BZf1N8QWtTfltgFChNYlxTR3ZbQllhSn9VdEJmW3xe"
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);

reportWebVitals();
