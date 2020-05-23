// import React, { useState, useEffect } from "react";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
import { BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
// import { observer } from "mobx-react";
// import { autorun } from "mobx";
import React from "react";

const NavigationBar = () => {
  return (
    //     <nav class="navbar navbar-expand-sm bg-light">
    //       <ul class="navbar-nav">
    //         <li class="nav-item">
    //           <Link to="/">Login</Link>
    //         </li>
    //         <li class="nav-item">
    //           <Link to="/registration">Sign Up</Link>
    //         </li>
    //       </ul>
    //     </nav>
    //   );

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">
        EverChange
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link">
              <Link to="/">Login</Link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <Link to="/registration">Sign Up</Link>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
