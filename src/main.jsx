import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";

import { store } from "./stores/store.ts";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider>
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
