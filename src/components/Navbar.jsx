import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar sticky-top z-1 bg-dark">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand text-white fw-bold">
        <box-icon name='droplet' type='solid' color='#00a3ff' ></box-icon>
          WaterMS
        </Link>
        <div className="d-flex text-uppercase fw-light">
          <a href="#about" className="nav-link text-white me-5 px-3">About</a>
          <a href="#contact" className="nav-link text-white me-5 px-3">Contact</a>
          <Link to="/login" className="nav-link text-white px-3">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
