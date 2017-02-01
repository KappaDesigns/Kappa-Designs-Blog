import React from "react";
import { Link } from "react-router";
import 'whatwg-fetch'; 

export default class Logo extends React.Component {
  render() {
    return (
      <img className="logo-main" src="../../../../images/logo.png"></img>
    )
  }
}
