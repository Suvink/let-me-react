import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./screens/HomePage";
import LoginPage from "./screens/LoginPage";
import AboutUsPage from "./screens/AboutUsPage";
import NavBar from "./common/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/about" exact>
          <AboutUsPage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
