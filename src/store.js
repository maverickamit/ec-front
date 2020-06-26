import { observable, action, decorate } from "mobx";
import { persist } from "mobx-persist";

class UserStore {
  user = [];
  loggedIn = false;

  setUser(user) {
    this.user = user;
  }
  setLoggedIn(loggedIn) {
    this.loggedIn = loggedIn;
  }
}

UserStore = decorate(UserStore, {
  user: [persist("object"), observable],
  loggedIn: [persist, observable],
  setUser: action,
  setLoggedIn: action,
});

export { UserStore };
