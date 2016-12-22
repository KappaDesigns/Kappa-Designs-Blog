import React from "react";
import { Link } from "react-router";
import Ink from "react-ink";

export default class ConnectBtn extends React.Component {
  render() {
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
