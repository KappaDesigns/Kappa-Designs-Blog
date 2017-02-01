import React from "react";
import { Link } from "react-router";
import 'whatwg-fetch'; 

export default class Tabs extends React.Component {
  render() {
    return (
      <div className="tabs">
        <Link className="tab" id="tab-1" to="/login">
          <h2>Login</h2>
        </Link>
        <Link className="tab" id="tab-2" to="/register">
          <h2>Register</h2>
        </Link>
      </div>
    )
  }
}
