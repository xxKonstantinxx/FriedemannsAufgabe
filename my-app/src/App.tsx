import React from "react";
import "./app.css";
import LogIn from './components/login/login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import MainBoard from "./components/main-board/main-board";

function App (){
  return (<div>
    <Router>
      <Switch>
        <Route exact path="/">
          <LogIn/>
        </Route>
        <Route path="/home">
          <MainBoard/>
        </Route>
      </Switch>
    </Router>
  </div>)
}

export default App;