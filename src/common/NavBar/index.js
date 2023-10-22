import React from "react";
import { useState } from "react";

const NavBar = () => {
  const [isActive, setisActive] = useState(false);

  const routes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/about",
      label: "About",
    },
  ];

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a href="/" className="navbar-item">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"  alt="navbar-logo"/>
        </a>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="main-navbar-hamburger"
          onClick={() => {
            setisActive(!isActive);
          }}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="main-navbar" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-start">
          {routes.map((route) => (
            <a to={route.href} className="navbar-item">
              {route.label}
            </a>
          ))}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a href="/login" className="button is-primary">
                <strong>Login</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
