import React from "react";
import Ink from "react-ink";

export default class Platform extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log(this.props);
    switch(this.props.platform) {
      case 'Facebook':
        window.location.href = "auth/facebook";
        break;
      case 'Google':
        window.location.href = "auth/google";
        break;
      case 'Twitter':
        window.location.href = "auth/twitter";
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div onClick={this.handleClick} id={this.props.platform}>
        <div className="logo">
          <Ink radius={25} />
          <div className="icon">
            <i className={"fa fa-2x "+this.props.icon} aria-hidden="true"></i>
          </div>
        </div>
        <span className="platform-normal">Sign in With <b className="bold">{this.props.platform}</b></span>
      </div>
    )
  }
}
