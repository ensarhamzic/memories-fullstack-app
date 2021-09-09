import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import { memoryBooksActions } from "../../store/memoryBooksSlice";

function NavBar({ isAuth }) {
  const dispatchRedux = useDispatch();
  const logoutHandler = () => {
    dispatchRedux(userActions.logout());
    dispatchRedux(memoryBooksActions.clear());
  };
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>ReactMemories</div>

      <div className={styles.linksDiv}>
        <ul>
          {!isAuth && (
            <li>
              <NavLink activeClassName={styles.activeLink} to="/login">
                Log In
              </NavLink>
            </li>
          )}
          {!isAuth && (
            <li>
              <NavLink activeClassName={styles.activeLink} to="/signup">
                Sign Up
              </NavLink>
            </li>
          )}
          {isAuth && (
            <li>
              <NavLink activeClassName={styles.activeLink} to="/memory-books">
                My Memory Books
              </NavLink>
            </li>
          )}
          {isAuth && (
            <li>
              <button onClick={logoutHandler} type="button">
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
