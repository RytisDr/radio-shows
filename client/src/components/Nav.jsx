import React from "react";
import { NavLink } from "react-router-dom";

const Nav = ({ isAuth, logout }) => {
  return (
    <nav>
      <NavLink exact to="/">
        Search
      </NavLink>
      {isAuth ? (
        <>
          <NavLink to="/my-shows">My Shows</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <a onClick={() => logout()} href="/">
            Logout
          </a>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </>
      )}
    </nav>
  );
};

export default Nav;
