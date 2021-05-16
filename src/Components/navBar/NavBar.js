import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { NavBarStyledd } from "./NavBarStyled";

const NavBar = () => {
  return (
    <NavBarStyledd>
      <ul className="list">
        <li className="listItem">
          <NavLink className="link" activeClassName="activeLink" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="link" activeClassName="activeLink" to="/movies">
            Movies
          </NavLink>
        </li>
      </ul>
    </NavBarStyledd>
  );
};

export default withRouter(NavBar);
