import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { observer } from "mobx-react";
import "./sidebar.css";
import styles from "./sidebar.module.css";

const SideBar = ({ userStore }) => {
  return (
    <nav className={"col-md-2 d-none d-md-block side " + styles.sidebar}>
      <div className="sidebar-sticky">
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-dark text-uppercase font-weight-bold">
          <span>Accout</span>
          <a className="d-flex align-items-center text-dark" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul className="nav flex-column">
          <li className="nav-groups">
            <Link className="nav-link" to="/profile">
              Account Summary
            </Link>
          </li>
        </ul>
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-dark text-uppercase font-weight-bold">
          <span>Contributions</span>
          <a className="d-flex align-items-center text-dark" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              <span data-feather="home"></span>
              Activity <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file"></span>
              Update Charity
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="shopping-cart"></span>
              Suggest a Charity
            </a>
          </li>
        </ul>

        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-dark text-uppercase font-weight-bold">
          <span>Settings</span>
          <a className="d-flex align-items-center text-dark" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul className="nav flex-column">
          <li className="nav-groups">
            <Link className="nav-link" to="/profile/settings">
              Update Profile
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              Link Bank Account
            </a>
          </li>
        </ul>
      </div>
      <footer className={styles.footer}>
        <div className="container">
          <a href="#" className="text-dark font-weight-bold">
            Contact Us
          </a>
        </div>
      </footer>
    </nav>
  );
};

export default observer(SideBar);
