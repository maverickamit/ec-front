import { observable, action, decorate } from "mobx";
import { persist } from "mobx-persist";

class UserStore {
  user = [];
  token = [];
  loggedIn = false;

  setUser(user) {
    this.user = user;
  }
  setToken(token) {
    this.token = token;
  }
  setLoggedIn(loggedIn) {
    this.loggedIn = loggedIn;
  }
}

UserStore = decorate(UserStore, {
  user: [observable],
  loggedIn: [persist, observable],
  token: [persist("object"), observable],
  setUser: action,
  setLoggedIn: action,
  setToken: action,
});

export { UserStore };
