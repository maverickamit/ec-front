import { observable, action, decorate } from "mobx";

class UserStore {
  user = [];

  setUser(user) {
    this.user = user;
  }
}

UserStore = decorate(UserStore, {
  user: observable,
  setUser: action,
});

export { UserStore };
