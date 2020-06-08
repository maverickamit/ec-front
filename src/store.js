import { observable, action, decorate } from "mobx";

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
  user: observable,
  loggedIn: observable,
  setUser: action,
  setLoggedIn: action,
});

export { UserStore };
