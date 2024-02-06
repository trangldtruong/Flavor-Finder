import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Header = () => {
  const isAuthenticated = Auth.loggedIn();

  return (
    <header>
      <h1>
        <Link to="/">Recipe Platform</Link>
      </h1>
      <nav>
        {isAuthenticated ? (
          <ul className="flex-row">
            <li className="mx-1">
              <Link to="/aboutUs">About Us</Link>
            </li>
            <li className="mx-1">
              <Link to="/">Home</Link>
            </li>
            <li className="mx-1">
              <Link to="/categories">Categories</Link>
            </li>
            <li className="mx-1">
              <Link to="/myRecipes">My Recipes</Link>
            </li>
            <li className="mx-1">
              <Link to="/search">Search</Link>
            </li>
            <li className="mx-1">
              <a href="/" onClick={() => Auth.logout()}>
                Logout
              </a>
            </li>
          </ul>
        ) : (
          <ul className="flex-row">
            <li className="mx-1">
              <Link to="/aboutUs">About Us</Link>
            </li>
            <li className="mx-1">
              <Link to="/signup">Signup</Link>
            </li>
            <li className="mx-1">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
