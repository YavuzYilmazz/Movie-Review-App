import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/add-movie">Add Movie</Link>
      </div>
      <div className="design-credit">
        <a
          href="https://github.com/YavuzYilmazz/Movie-Review-App"
          target="_blank"
          rel="noopener noreferrer"
        >
          Developed by Yavuz Yılmaz
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
