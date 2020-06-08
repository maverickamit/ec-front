import React from "react";
import ReactDOM from "react-dom";
import "mobx-react/batchingForReactDom";

import "./index.css";
import App from "./App";
import UserRegistration from "./components/registration/registration";
import * as serviceWorker from "./serviceWorker";
import { UserStore } from "./store";
const userStore = new UserStore();

ReactDOM.render(
  <React.StrictMode>
    <App userStore={userStore} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
