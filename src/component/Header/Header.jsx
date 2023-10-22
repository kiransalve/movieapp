import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <span className="header_logo">Movies</span>
      </Link>
      <div className="headerLeft">
        <Link to="/movies/popular" className="headerLink">
          <span>Popular</span>
        </Link>
        <Link to="/movies/top_rated" className="headerLink">
          <span>Top Rated</span>
        </Link>
        <Link to="/movies/upcoming" className="headerLink">
          <span>Upcoming</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
