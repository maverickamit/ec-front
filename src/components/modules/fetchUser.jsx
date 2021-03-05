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
        console.log("running");
        userStore.setLoggedIn(false);
        userStore.setNotification("Session is expired.Please login again.");
        userStore.setIsNotification(true);
        // alert("Session Expired.Login again.");
      } else {
        userStore.setUser(data);
        console.log(userStore.user.firstName);
      }
    });
};

export default fetchUser;
