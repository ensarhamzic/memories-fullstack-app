import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>ReactMemories</div>

      <div className={styles.linksDiv}>
        <ul>
          <li>
            <NavLink activeClassName={styles.activeLink} to="/login">
              Log In
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.activeLink} to="/signup">
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.activeLink} to="/memory-books">
              My Memory Books
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
