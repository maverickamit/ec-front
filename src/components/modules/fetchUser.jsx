import { prodUrl } from "../urls";

const fetchUser = ({ userStore }) => {
  fetch(prodUrl + "/users/me", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userStore.token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return "unable to login";
      }
    })
    .then((data) => {
      if (data === "unable to login") {
        userStore.setLoggedIn(false);
        userStore.setNotification("Session is expired.Please login again.");
        userStore.setIsNotification(true);
      } else {
        userStore.setUser(data);
      }
    });
};

export default fetchUser;
