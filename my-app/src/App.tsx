import React from "react";
import "./App.css";
import LogIn from './components/LogIn/LogIn'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import MainBoard from "./components/MainBoard/MainBoard";

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