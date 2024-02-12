import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/add-movie">Add Movie</Link>
      </div>
    </nav>
  );
};

export default Navbar;
