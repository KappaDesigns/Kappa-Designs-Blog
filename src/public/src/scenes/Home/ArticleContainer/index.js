import React from "react";

export default class ArticleContainer extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-7">1</div>
          <div className="col-md-5">2</div>
        </div>
        <div className="row">
          <div className="col-md-4">1</div>
          <div className="col-md-4">2</div>
          <div className="col-md-4">3</div>
        </div>
      </div>
    )
  }
}
