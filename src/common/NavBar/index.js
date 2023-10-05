import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const NavBar = () => {
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

  const navBtn = {
    href: "/login",
    label: "Log In",
  };

  return (
    <nav className="navbar is-light is-transparent" role="navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <Link to="/">
            <h1>Logo</h1>
          </Link>
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">
          {routes.map(({ href, label }, index) => (
            <Link to={href} key={index} className="navbar-item">
              {label}
            </Link>
          ))}

          {navBtn?.label && navBtn?.href && (
            <div className="navbar-item">
              <div className="buttons">
                <Link to={navBtn.href} className="button is-primary">
                  {navBtn.label}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
