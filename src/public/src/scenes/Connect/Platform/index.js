import React from "react";
import Ink from "react-ink";

export default class Platform extends React.Component {
  render() {
    return (
      <a href={`/auth/${this.props.platform}`}  id={this.props.platform}>
        <div className="logo">
          <Ink radius={25} />
          <div className="icon">
            <i className={"fa fa-2x "+this.props.icon} aria-hidden="true"></i>
          </div>
        </div>
        <span className="platform-normal">Sign in With <b className="bold">{this.props.platform}</b></span>
      </a>
    )
  }
}
