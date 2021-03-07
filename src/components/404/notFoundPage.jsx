import React from "react";
import { Link } from "react-router-dom";
import "./notFoundPage.css";
const NotFoundPage = () => {
  return (
    <div className="container bg-light">
      <p className="font-weight-bold text-center">
        404! Page not found. Go back to <Link to="/"> Home.</Link>
      </p>
    </div>
  );
};
export default NotFoundPage;
