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
    this.displayError = this.displayError.bind(this);
    this.displaySuccess = this.displaySuccess.bind(this);
  }

  passwordChange(e) {
    this.setState({password: e.target.value});
  }

  usernameChange(e) {
    this.setState({username: e.target.value});
  }

  displayError(err) {
    this.setState({
      error: err,
      errClass: 'error'
    })
    setTimeout(function () {
      this.setState({
        error: '',
        errClass: 'none'
      })
    }.bind(this), 2000);
  }

  displaySuccess() {
    setTimeout(function () {
      this.setState({
        error: 'Successfully Logged In',
        errClass: 'success'
      })
    }.bind(this), 0);
    setTimeout(function () {
      this.setState({
        error: '',
        errClass: 'none'
      })
      hashHistory.push('/');
    }.bind(this), 2000);
  }

  handleSubmit(e) {
    crypto.pbkdf2(this.state.password, config.secret, 100, 512, 'sha512', (err, key) => {
      if (err) throw err;
      fetch('/auth/login?username='+this.state.username+'&password='+key.toString('hex'), {
         method: 'POST',
         credentials: 'same-origin',
      }).then((res) => {
        return res.json();
      })
      .then((d) => {
        if (d.success) {
          this.displaySuccess();
        } else {
          this.displayError('Incorrect Username Or Password')
        }
      })
    })
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <div className={this.state.errClass}>{this.state.error}</div>
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
