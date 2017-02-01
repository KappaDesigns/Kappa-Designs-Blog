import React from "react";
import { Link } from "react-router";
export default class Head extends React.Component {
  import 'whatwg-fetch'; 
  render() {
    return (
      <div className="logo-container">
        <Link to="/"><img className="home" src="../../../../../images/logo.png"></img></Link>
      </div>
    )
  }
}
