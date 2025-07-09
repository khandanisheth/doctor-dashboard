import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          Doctor Profile Manager
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/doctors">
                Add Doctors
              </Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/login" onClick={() => localStorage.removeItem("auth")}>
              Logout
            </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
