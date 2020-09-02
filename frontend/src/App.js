import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import './App.css';
import Components from "./views/Components/Components.js";

var hist = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={hist}>
        <Switch>
          
          <Route path="/" component={Components} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
