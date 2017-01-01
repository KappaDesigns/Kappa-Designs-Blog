import React from "react";
import { Link } from "react-router";
import Ink from "react-ink";

export default class ConnectBtn extends React.Component {

  constructor() {
    super();
    this.state = {
      admin: false,
      fetched: false,
    };
  }

  componentDidMount() {
    fetch(`/auth/user/`, {method: 'get',credentials: 'same-origin',})
    .then((res) => {
      if (res.status == 403) {
        this.setState({
          loggedIn: false
        })
        return {};
      } else {
        this.setState({
          loggedIn: true
        })
        return res.json();
      }
    })
    .then((json) => {
      this.setState({
        user:json,
        fetched: true
      })
      if (this.state.user.securityLevel > 0) {
        this.setState({
          admin: true
        })
      }
    });
  }

  render() {
    if (this.state.admin) {
      return (
        <div>
          <div className="btn-container">
            <div className="button" id="login-btn">
              <Link className="login-btn" to="/login"><Ink radius={25}></Ink>Login</Link>
              <div className="login-arrow"></div>
            </div>
            <div className="button" id="register-btn">
              <div className="register-arrow"></div>
              <Link className="register-btn" to="/register"><Ink radius={25}></Ink>Register</Link>
            </div>
          </div>
          <div className="create-container">
            <div className="create-arrow-a"></div>
            <Link className="create-btn" to="/admin">Admin</Link>
            <div className="create-arrow-b"></div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="btn-container">
          <div className="button" id="login-btn">
            <Link className="login-btn" to="/login"><Ink radius={25}></Ink>Login</Link>
            <div className="login-arrow"></div>
          </div>
          <div className="button" id="register-btn">
            <div className="register-arrow"></div>
            <Link className="register-btn" to="/register"><Ink radius={25}></Ink>Register</Link>
          </div>
        </div>
      )
    }
  }
}
