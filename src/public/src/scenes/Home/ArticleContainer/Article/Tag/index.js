import React from "react";
import 'whatwg-fetch'; 

export default class Tag extends React.Component {
  render() {
    return (
      <img className="tag" src={'../../../../../../images/tag-'+this.props.tag+'.svg'}></img>
    )
  }
}
