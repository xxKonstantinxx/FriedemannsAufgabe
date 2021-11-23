import React from "react";
import "./app.css";
import LogIn from "./components/login/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainBoard from "./components/main-board/main-board";
import NewAd from "./components/ads/new-ad";
import RouteHandler from "./components/route-handler/route-handler";



function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <RouteHandler/>
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/home">
            <MainBoard />
          </Route>
          <Route path="/newad">
          <NewAd />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
