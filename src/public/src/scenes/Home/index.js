import React from "react";
import Navbar from "./Navbar";
import Logo from "./Logo";
import ConnectBtn from "./ConnectBtn"
import ArticleContainer from "./ArticleContainer";
import { Link } from "react-router";

export default class Home extends React.Component {
  render() {
    const tags = ['new','test','test2','test3','test4','test5'];
    return (
      <div className="home">
        <Logo></Logo>
        <ConnectBtn></ConnectBtn>
        <Navbar tags={tags}></Navbar>
        <ArticleContainer></ArticleContainer>
      </div>
    )
  }
}
