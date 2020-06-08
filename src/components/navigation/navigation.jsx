// import React, { useState, useEffect } from "react";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
import { BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import "./navigation.css";
import React from "react";

const NavigationBar = ({ userStore }) => {
  const handleLogout = () => {
    userStore.setLoggedIn(false);
  };
  if (userStore.loggedIn) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <Link to="/"> EverChange</Link>
        </a>
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
              <a className="nav-link">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  return (
    //     <nav className="navbar navbar-expand-sm bg-light">
    //       <ul className="navbar-nav">
    //         <li className="nav-item">
    //           <Link to="/">Login</Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link to="/registration">Sign Up</Link>
    //         </li>
    //       </ul>
    //     </nav>
    //   );

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        <Link to="/"> EverChange</Link>
      </a>
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
            <a className="nav-link">
              <Link to="/">Login</Link>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <Link to="/registration">Sign Up</Link>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default observer(NavigationBar);
