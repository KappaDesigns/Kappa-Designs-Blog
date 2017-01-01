import React from "react";
import config from "../../../../../config";
import crypto from "crypto"
import { hashHistory } from "react-router"

export default class UserSettings extends React.Component {
  constructor() {
    super();
    this.state = {
      displayList: false,
      loggedIn: false
    };
    fetch(`/auth/user`, {method: 'get', credentials: 'same-origin'})
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      this.setState({
        loggedIn: true,
        user: json,
        original: json.username,
        pass:'',
        retype: '',
        password: ''
      })
    })
    .catch((err) => {
      this.setState({
        loggedIn: false
      })
    })
    this.handleClick = this.handleClick.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleRetypePassword = this.handleRetypePassword.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayError = this.displayError.bind(this);
    this.displaySuccess = this.displaySuccess.bind(this);
    this.signout = this.signout.bind(this);
  }

  handleClick() {
    if (!this.state.displayList) {
      this.setState({
        displayList: true
      })
    } else {
      this.setState({
        errClass: 'none',
        displayList: false
      })
    }
  }

  handleUsername(e) {
    let user = this.state.user;
    user.username = e.target.value;
    this.setState({
      user:user
    })
  }

  handleEmail(e) {
    let user = this.state.user;
    user.email = e.target.value;
    this.setState({
      user:user
    })
  }

  handleFirstName(e) {
    let user = this.state.user;
    user.firstName = e.target.value;
    this.setState({
      user:user
    })
  }

  handleLastName(e) {
    let user = this.state.user;
    user.lastName = e.target.value;
    this.setState({
      user:user
    })
  }

  handlePassword(e) {
    this.setState({
      pass: e.target.value
    })
  }

  handleRetypePassword(e) {
    this.setState({
      retype: e.target.value
    })
  }

  handleImage(e) {
    let user = this.state.user;
    user.imgUrl = e.target.value;
    this.setState({
      user:user
    })
  }

  handleSubmit(e) {
    if (this.state.user.username != '') {
      if (this.state.user.email != '' && this.state.user.email.includes('@')) {
        if (this.state.user.firstName != '') {
          if (this.state.user.lastName != '') {
            if (this.state.user.imgUrl != '') {
              if (this.state.pass == this.state.retype) {
                if (this.state.pass == '') {
                  this.state.password = this.state.user.password;
                } else {
                  this.state.password = this.state.pass
                }
                if (this.state.user.username != this.state.original) {
                  fetch(`/api/user/${this.state.user.username}?token=${sessionStorage.token}`, {method:'get'})
                  .then((res) => {
                    return res.json();
                  })
                  .then((json) => {
                    if (JSON.stringify(json) == '[]') {
                      if (this.state.pass != '') {
                        crypto.pbkdf2(this.state.password, config.secret, 100, 512, 'sha512', (err, key) => {
                          fetch(`/api/user/${this.state.user._id}?token=${sessionStorage.token}`, {
                            method: 'put',
                            body: JSON.stringify({
                              username: this.state.user.username,
                              email: this.state.user.email,
                              firstName: this.state.user.firstName,
                              lastName: this.state.user.lastName,
                              imgUrl: this.state.user.imgUrl,
                              password: key.toString('hex')
                            }),
                            headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                            }
                          })
                          .then((res) => {
                            return res.json();
                          })
                          .then((json) => {
                          })
                          this.setState({
                            displayList: false
                          })
                          this.displaySuccess();
                        })
                      } else {
                        fetch(`/api/user/${this.state.user._id}?token=${sessionStorage.token}`, {
                          method: 'put',
                          body: JSON.stringify({
                            username: this.state.user.username,
                            email: this.state.user.email,
                            firstName: this.state.user.firstName,
                            lastName: this.state.user.lastName,
                            imgUrl: this.state.user.imgUrl,
                          }),
                          headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          }
                        })
                        .then((res) => {
                          return res.json();
                        })
                        .then((json) => {

                        })
                        this.setState({
                          displayList: false
                        })
                        this.displaySuccess();
                      }
                    } else {
                      this.displayError('Username Is Taken')
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  })
                } else {
                  if (this.state.pass != '') {
                    crypto.pbkdf2(this.state.password, config.secret, 100, 512, 'sha512', (err, key) => {
                      fetch(`/api/user/${this.state.user._id}?token=${sessionStorage.token}`, {
                        method: 'put',
                        body: JSON.stringify({
                          username: this.state.user.username,
                          email: this.state.user.email,
                          firstName: this.state.user.firstName,
                          lastName: this.state.user.lastName,
                          imgUrl: this.state.user.imgUrl,
                          password: key.toString('hex')
                        }),
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        }
                      })
                      .then((res) => {
                        return res.json();
                      })
                      .then((json) => {

                      })
                      this.setState({
                        displayList: false
                      })
                      this.displaySuccess();
                    })
                  } else {
                    fetch(`/api/user/${this.state.user._id}?token=${sessionStorage.token}`, {
                      method: 'put',
                      body: JSON.stringify({
                        username: this.state.user.username,
                        email: this.state.user.email,
                        firstName: this.state.user.firstName,
                        lastName: this.state.user.lastName,
                        imgUrl: this.state.user.imgUrl,
                      }),
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      }
                    })
                    .then((res) => {
                      return res.json();
                    })
                    .then((json) => {

                    })
                  }
                  this.setState({
                    displayList: false
                  })
                  this.displaySuccess();
                }
              }
            } else {
              this.displayError('Missing Image Url')
            }
          } else {
            this.displayError('Missing Last Name');
          }
        } else {
          this.displayError("Missing First Name");
        }
      } else {
        this.displayError('Invalid Email');
      }
    } else {
      this.displayError('You Need A Username')
    }
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
        error: 'Profile Updated',
        errClass: 'success'
      })
    }.bind(this), 0);
    setTimeout(function () {
      this.setState({
        error: '',
        errClass: 'none'
      })
    }.bind(this), 2000);
  }

  signout() {
    console.log("here");
    fetch(`/auth/logout`, {method:'get', credentials:'same-origin'})
    .then((res) => {
      hashHistory.push('/login')
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <div className={this.state.errClass}>{this.state.error}</div>
      )
    } else if (!this.state.displayList && this.state.loggedIn && this.state.user.provider == 'local') {
      return (
        <div onClick={this.handleClick} className="user-settings">
          <div className={this.state.errClass}>{this.state.error}</div>
          <i onClick={this.handleClick} class="fa fa-cogs fa-4x" aria-hidden="true"></i>
        </div>
      )
    } else if (this.state.displayList && this.state.loggedIn && this.state.user.provider == 'local') {
      return (
        <div>
          <div className={this.state.errClass}>{this.state.error}</div>
          <div onClick={this.handleClick} className="user-settings">
            <i onClick={this.handleClick} class="fa fa-cogs fa-4x" aria-hidden="true"></i>
          </div>
          <div className="user-profile">
            <h3>{this.state.user.username + "'s Profile"}</h3>
            <input onChange={this.handleUsername} value={this.state.user.username} placeholder="Username..."></input>
            <br></br>
            <input onChange={this.handleEmail} value={this.state.user.email} placeholder="Email..."></input>
            <br></br>
            <input onChange={this.handleFirstName} value={this.state.user.firstName} placeholder="First Name..."></input>
            <br></br>
            <input onChange={this.handleLastName} value={this.state.user.lastName} placeholder="Last Name..."></input>
            <br></br>
            <input type="password" onChange={this.handlePassword} value={this.state.pass} placeholder="New Password..."></input>
            <input type="password" onChange={this.handleRetypePassword} value={this.state.retype} placeholder="Retype Password..."></input>
            <br></br>
            <input onChange={this.handleImage} value={this.state.user.imgUrl} placeholder="Image URL"></input>
            <br></br>
            <span onClick={this.signout} className="sign-out">Logout</span>
            <button onClick={this.handleSubmit} className="update">Update</button>
          </div>
        </div>
      )
    } else {
      return (
        <div className={this.state.errClass}>{this.state.error}</div>
      )
    }
  }
}
