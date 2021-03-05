import React from "react";
import ReactDOM from "react-dom";
import "mobx-react/batchingForReactDom";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { UserStore } from "./store";
import { create } from "mobx-persist";

const userStore = new UserStore();
const hydrate = create({});

hydrate("ecAppState", userStore).then(() => console.log("ecAppState hydrated"));

ReactDOM.render(
  <React.StrictMode>
    <App userStore={userStore} />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
