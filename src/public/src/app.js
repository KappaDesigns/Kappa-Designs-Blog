import React from "react";
import ReactDom from "react-dom";
import Login from "./scenes/Connect/Login";
import Register from "./scenes/Connect/Register";
import Home from "./scenes/Home";
import CreateArticle from "./scenes/CreateArticle";
import Article from "./scenes/Articles"
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import crypto from "crypto";

import config from "../../config.js";
import "./styles/css/main.css";

class App extends React.Component {
  constructor() {
    super();
    this.setStorage = this.setStorage.bind(this);
    this.post = this.post.bind(this);
    this.setStorage();
  }

  setStorage() {
    crypto.pbkdf2(config.guestPassword, config.secret, 100, 512, 'sha512', (err, key) => {
      this.post(`/authenticate?username=guest&password=${key.toString('hex')}`, (value) => {
        sessionStorage.setItem("token", value);
      });
    })
  }

  post(url, callback) {
    fetch(url, {method:'POST'}).then((res) => {
      res.json().then((obj) => {
        callback(obj.token);
      })
    })
  }

  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Home}></Route>
        <Route path="login" component={Login}></Route>
        <Route path="register" component={Register}></Route>
        <Route path="article/:id" component={Article}></Route>
        <Route path="create" component={CreateArticle}></Route>
      </Router>
    );
  }
}

const app = document.getElementById('root');
ReactDom.render(<App/>, app);
