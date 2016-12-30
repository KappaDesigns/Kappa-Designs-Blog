import React from "react";

export default class DropDown extends React.Component {

  render () {
    let mask = this.props.handleClick;
    let mapTags = function (tag, i) {
      return (<li onClick={mask} key={i} id={tag} className="menu-option">{tag}</li>);
    }
    let showMenu = function (tags, state, handleExit) {
      if (state) {
        return (
          <ul onMouseLeave={handleExit} className="options">
            {tags.map(mapTags, 0)}
          </ul>
        )
      } else {
        return;
      }
    }

    return (
      <div className="dropdown">
        <div onMouseEnter={this.props.handleEnter} className="selected">
          {this.props.selected}
        </div>
        {showMenu(this.props.tags, this.props.isHover, this.props.handleExit)}
      </div>
    )
  }
}
