import React from "react";
import Featured from "./Featured";
import Main from "./Main";

export default class ArticleContainer extends React.Component {
  render() {
    return (
      <div className="container">
        <Featured></Featured>
        <Main></Main>
      </div>
    )
  }
}
