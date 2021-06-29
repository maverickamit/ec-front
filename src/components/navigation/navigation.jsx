import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import "./navigation.css";
import styles from "./navigation.module.css";

const NavigationBar = ({ userStore }) => {
  const handleLogout = () => {
    userStore.setLoggedIn(false);
    userStore.setUser([]);
  };
  if (userStore.loggedIn) {
    return (
      <div className="container-fluid">
        <div className="row">
          <nav
            className={
              "navbar left-nav navbar-expand-lg navbar-light col-md-2 " +
              styles.loggedNavbar
            }
          >
            <p className="navbar-brand" href="/#">
              <Link to="/"> EverChange</Link>
            </p>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </nav>
          <div className="navbar right-nav navbar-expand-lg col-md-10">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <a className="nav-link">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handleLogout}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      Logout
                    </button>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <p className="navbar-brand" href="#">
        <Link to="/"> EverChange</Link>
      </p>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <p className="nav-link">
              <Link to="/">Login</Link>
            </p>
          </li>
          <li className="nav-item">
            <p className="nav-link" href="#">
              <Link to="/registration">Sign Up</Link>
            </p>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default observer(NavigationBar);
