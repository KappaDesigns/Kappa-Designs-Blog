import React from "react";
import { Link } from "react-router";
import 'whatwg-fetch'; 

export default class Navtag extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <span onClick={this.props.handleClick} className="nav-tag" id={this.props.tag}>{this.props.tag}</span>
    )
  }
}
