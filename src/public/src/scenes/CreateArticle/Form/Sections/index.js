import React from "react";
import 'whatwg-fetch'; 

export default class Sections extends React.Component {


  render() {
    let createWritableArea = (id, i) => {
      return (
        <div key={i} id={"section-container-" + (i+1)}>
          <input id={'section-' + (i+1)} onChange={this.props.handleTitleChange} value={this.props.sections[i].sectionTitle}placeholder="Section Title..." className="section-title"></input>
          <span onClick={this.props.handleRemove} id={'section-' + (i+1)} className="section-remove">Remove</span>
          <textarea id={'section-' + (i+1)} onChange={this.props.handleSectionChange} value={this.props.sections[i].value} className="section" id={'section-' + (i+1)}></textarea>
        </div>
      );
    }
    return (
      <div className="section-container">
        {this.props.sections.map(createWritableArea, 0)}
        <br></br>
        <button onClick={this.props.handleClick} className="add">Add Section</button>
      </div>
    )
  }
}
