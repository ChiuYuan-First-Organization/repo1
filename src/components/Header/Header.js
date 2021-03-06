import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useCognito } from "../../hooks/cognito";

import NavbarToggler from "./NavbarToggler";

import styles from "./Header.module.css";

const Header = ({navbar, toggleNavbar, toggleCart}) => {
  const dispatch = useDispatch();
  const { signOut } = useCognito();

  const isAuth = useSelector((state) => state.auth.isAuth);
  
  const navClass = navbar ? styles.show : null;

  const logoutHandler = () => {
    signOut();
    dispatch(authActions.logout());
    alert('Logged out');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>LOGO GOES HERE</div>
      <div style={{ position: "relative" }}>
        <NavbarToggler onClick={toggleNavbar} />
        <nav
          className={`${styles.navbar} ${navClass}`}
          onClick={toggleNavbar}
        >
          <ul>
            <li>
              <NavLink
                to="/home"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/discount"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Discount
              </NavLink>
            </li>
            <li>
              <p className={styles.btn} onClick={() => toggleCart()}>
                Cart
              </p>
            </li>
            {!isAuth && (
              <li>
                <NavLink
                  to="/auth"
                  className={(navData) =>
                    navData.isActive ? styles.active : ""
                  }
                >
                  Login
                </NavLink>
              </li>
            )}
            {isAuth && (
              <li>
                <p className={styles.btn} onClick={logoutHandler}>
                  Log out
                </p>
              </li>
            )}
            <li>
              <NavLink
                to="/center"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Center
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
