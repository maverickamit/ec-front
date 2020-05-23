import React from "react";
import "./App.css";
import UserRegistration from "./components/registration/registration";
import UserLogin from "./components/login/login";
import NavigationBar from "./components/navigation/navigation";
import { Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
        <NavigationBar />
        <Route path="/" exact component={(props) => <UserLogin {...props} />} />
        <Route
          path="/registration"
          exact
          component={(props) => <UserRegistration {...props} />}
        />
      </div>
    </Router>
  );
}

export default App;
