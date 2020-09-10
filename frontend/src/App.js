import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import './App.css';
import MainPage from "./views/Components/MainPage";
import ShopPage from "./views/Components/ShopPage";
import SignUp from "./views/Components/SignUp";
import SignIn from "./views/Components/SignIn";
import Admin from "./layouts/Admin";

var hist = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={hist}>
        <Switch>
          <Route path="/dashboard" component={Admin} />
          <Route path="/giris" exact component={SignIn} />
          <Route path="/uyeol" exact component={SignUp} />
          <Route path="/urunler" exact component={ShopPage} />
          <Route path="/" exact component={MainPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
