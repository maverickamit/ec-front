import { observable, action, decorate } from "mobx";
import { persist } from "mobx-persist";

class UserStore {
  user = [];
  token = [];
  loggedIn = false;
  isLoading = false;
  isNotification = false;
  notification = "";

  setUser(user) {
    this.user = user;
  }
  setToken(token) {
    this.token = token;
  }
  setLoggedIn(loggedIn) {
    this.loggedIn = loggedIn;
  }
  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }
  setNotification(notification) {
    this.notification = notification;
  }
  setIsNotification(isNotification) {
    this.isNotification = isNotification;
  }
}

UserStore = decorate(UserStore, {
  user: [observable],
  loggedIn: [persist, observable],
  token: [persist("object"), observable],
  isLoading: [observable],
  isNotification: [observable],
  notification: [observable],
  setIsLoading: action,
  setUser: action,
  setLoggedIn: action,
  setToken: action,
  setIsNotification: action,
  setNotification: action,
});

export { UserStore };
