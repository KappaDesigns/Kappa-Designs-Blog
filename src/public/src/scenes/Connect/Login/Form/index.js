import React from "react";
import Ink from "react-ink";
import { hashHistory } from "react-router";
import crypto from "crypto";
import config from "../../../../../../config";

export default class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };

    this.passwordChange = this.passwordChange.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  passwordChange(e) {
    this.setState({password: e.target.value});
  }

  usernameChange(e) {
    this.setState({username: e.target.value});
  }

  handleSubmit(e) {
    crypto.pbkdf2(this.state.password, config.secret, 100, 512, 'sha512', (err, key) => {
      if (err) throw err;
      fetch('/auth/login?username='+this.state.username+'&password='+key.toString('hex'), {
         method: 'POST',
      }).then((res) => {
        if (res.status != 404) {
          hashHistory.push('/');
        } else {
          hashHistory.push('/login');
        }
      })
    })
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <img className="user-avatar" src="images/avatar.png"></img>
        <form onSubmit={this.handleSubmit}>
          <div className="input-container">
            <span className="label">Username</span>
            <input name="username" placeholder="Username..." value={this.state.username} onChange={this.usernameChange} className="username"></input>
          </div>
          <div className="input-container">
            <span className="label">Password</span>
            <input name="password" type="password" value={this.state.password} onChange={this.passwordChange}  placeholder="Password..." className="password"></input>
          </div>
          <div className="submit-container">
            <li><a className="forgot-password">Forgot Password</a></li>
            <button type="submit" className="submit-btn"><Ink radius={25} />Login</button>
          </div>
        </form>
      </div>
    )
  }
}
