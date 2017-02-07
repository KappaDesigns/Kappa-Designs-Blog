import React from "react";
import Ink from "react-ink";
import { Link, hashHistory } from "react-router";
import crypto from "crypto";
import config from "../../../../../../config.js";
import 'whatwg-fetch';

export default class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      username:'',
      email:'',
      firstName:'',
      lastName:'',
      password:'',
      retypedPassword:'',
      provider:'local'
    }

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRetypedPasswordChange = this.handleRetypedPasswordChange.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.displayError = this.displayError.bind(this);
    this.displaySuccess = this.displaySuccess.bind(this);
  }

  displaySuccess() {
    setTimeout(function () {
      this.setState({
        error: 'Successfully Registered',
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


  handleRegistration(e) {
    e.preventDefault();
    if (this.state.username !== '' && /^[a-zA-Z0-9_]*$/.test(this.state.username)) {
      if (this.state.email !== '' && this.state.email.includes('@') && this.state.email.includes('.')) {
        if (this.state.firstName !== '') {
          if (this.state.lastName !== '') {
            if (this.state.password !== '' && this.state.retypedPassword !== '' && !this.state.password.includes(' ') && this.state.password == this.state.retypedPassword) {
              crypto.pbkdf2(this.state.password, config.secret, 100, 512, 'sha512', (err, key) => {
                let t = sessionStorage.getItem('token');
                this.displayError({})
                fetch(`/api/user?username=${this.state.username}&email=${this.state.email}&firstName=${this.state.firstName}&lastName=${this.state.lastName}&provider=${this.state.provider}&token=${t}&password=${key.toString('hex')}`, { method:'POST'});
                this.displaySuccess();
              })
            } else {
              if (this.state.password == '')
                this.displayError({error: 'Password is required'})
              else if (this.state.retypedPassword == '')
                this.displayError({error: 'Verified password is required'})
              else if (this.state.password.includes(' '))
                this.displayError({error: 'Password can not include spaces'})
              else
                this.displayError({error: 'Passwords do not match'})
            }
          } else {
            this.displayError({error: 'Last name is required'})
          }
        } else {
          this.displayError({error: 'First name is required'})
        }
      } else {
        if (this.state.email == '')
          this.displayError({error: 'Email is required'})
        else
          this.displayError({error: 'Not a vaild email'})
      }
    } else {
      if (this.state.username == '')
        this.displayError({error: 'Username is required'});
      else
        this.displayError({error: 'Username must be alphanumeric'});
    }
  }



  displayError(err) {
    this.setState({
      error: err.error,
      errClass: 'error'
    })
    setTimeout(function () {
      this.setState({
        error: '',
        errClass: 'none'
      })
    }.bind(this), 2000);
  }

  handleUserChange(e) {
    this.setState({
      username:e.target.value
    })
  }

  handleEmailChange(e) {
    this.setState({
      email:e.target.value
    })
  }

  handleFirstNameChange(e) {
    this.setState({
      firstName:e.target.value
    })
  }

  handleLastNameChange(e) {
    this.setState({
      lastName:e.target.value
    })
  }

  handlePasswordChange(e) {
    this.setState({
      password:e.target.value
    })
  }

  handleRetypedPasswordChange(e) {
    this.setState({
      retypedPassword:e.target.value
    })
  }

  render() {
    return (
      <form onSubmit={this.handleRegistration}>
        <div className={this.state.errClass}>{this.state.error}</div>
        <h4 className="kicker">Enter your personal details to <b>create an acount</b></h4>
        <div className="input-container-2">
          <div className="input-container">
            <span className="label">First Name</span>
            <input onChange={this.handleFirstNameChange} value={this.state.firstName} placeholder="First Name..." className="username"></input>
          </div>
          <div className="input-container" id="input-2">
            <span className="label">Last Name</span>
            <input onChange={this.handleLastNameChange} value={this.state.lastName} placeholder="Last Name..." className="username"></input>
          </div>
        </div>
        <div className="input-container">
          <span className="label">Email</span>
          <input onChange={this.handleEmailChange} value={this.state.email} placeholder="Email..." className="username"></input>
        </div>
        <div className="input-container">
          <span className="label">Username</span>
          <input onChange={this.handleUserChange} value={this.state.username} placeholder="Username..." className="username"></input>
        </div>
        <div className="input-container-2">
          <div className="input-container">
            <span className="label">Password</span>
            <input onChange={this.handlePasswordChange} value={this.state.password} type="password" placeholder="Password..." className="username"></input>
          </div>
          <div className="input-container" id="input-2">
            <span className="label">Re-enter Password</span>
            <input onChange={this.handleRetypedPasswordChange} value={this.state.retypedPassword} type="password" placeholder="Password..." className="username"></input>
          </div>
        </div>
        <div className="submit-container">
          <span className="terms">By creating an account you agree to our <span className="term"><Link to="/terms">Terms & Privacy</Link></span></span>
          <button className="submit-btn"><Ink radius={25}/>Register</button>
        </div>
      </form>
    )
  }
}
