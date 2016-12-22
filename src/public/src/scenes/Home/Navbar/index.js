import React from "react";
import Navtag from "./Navtag";
import { Link } from "react-router";

export default class Navbar extends React.Component {
  render() {
    let createNavTag = (tag, i) => {
      return (<Navtag key={i} tag={tag}>{tag}</Navtag>)
    }

    return (
      <div className="navbar">{this.props.tags.map(createNavTag, 0)}</div>
    )
  }
}
