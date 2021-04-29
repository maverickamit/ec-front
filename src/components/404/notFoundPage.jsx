import React from "react";
import { Link } from "react-router-dom";
import "./notFoundPage.css";
import styles from "./notFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className="container">
      <p className={styles.error + " text-center"}>
        404! Page not found. Go back to <Link to="/"> Home.</Link>
      </p>
    </div>
  );
};
export default NotFoundPage;
