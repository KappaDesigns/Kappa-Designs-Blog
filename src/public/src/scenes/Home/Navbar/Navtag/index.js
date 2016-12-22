import React from "react";
import { Link } from "react-router";

export default class Navtag extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <span className="nav-tag" id={'tag-'+this.props.tag}>{this.props.tag}</span>
    )
  }
}
