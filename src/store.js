import { observable, action, decorate } from "mobx";

class FeedsStore {
  user = [];

  setUser(user) {
    this.user = user;
  }
}

FeedsStore = decorate(FeedsStore, {
  user: observable,
  setUser: action,
});

export { FeedsStore };
