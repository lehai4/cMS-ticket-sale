import React from "react";
import { ContextProvider } from "./contexts/ContextProvider";
import ReactDOM from "react-dom/client";
import store from "./redux/store";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import "./sass/index.scss";
import "react-toastify/dist/ReactToastify.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ContextProvider>
  </React.StrictMode>
);

reportWebVitals();
