import React from "react";
import Navbar from "./Navbar";
import Logo from "./Logo";
import ConnectBtn from "./ConnectBtn"
import ArticleContainer from "./ArticleContainer";
import UserSettings from "./UserSettings";
import { Link } from "react-router";
import 'whatwg-fetch'; 

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      isFetched : false,
      fetchedTotal : 0
    }
    fetch(`/api/article?token=${sessionStorage.token}&amount=0`, {method: 'get'})
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      let amount = this.state.fetchedTotal + 10;
      this.setState({
        articles: json,
        filtered: json,
        isFetched : true,
        fetching: false,
        fetchedTotal: amount
      })
    })
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(e) {
    let a = [];
    for (let i = 0; i < this.state.articles.length; i++) {
      if (this.state.articles[i].tag == e.target.id || e.target.id == 'all') {
        a.push(this.state.articles[i]);
      }
    }
    (a);
    this.setState({
      filtered: a,
    })
  }

  render() {
    const tags = ['all','new','gaming','world','food','dev'];
    if (this.state.isFetched) {
      return (
        <div className="home">
          <Logo></Logo>
          <ConnectBtn></ConnectBtn>
          <Navbar handleFilter={this.handleFilter} tags={tags}></Navbar>
          <ArticleContainer isFetched={this.state.isFetched} filtered={this.state.filtered}></ArticleContainer>
          <UserSettings></UserSettings>
        </div>
      )
    } else {
      return (
        <div className="home">
          <Logo></Logo>
          <ConnectBtn></ConnectBtn>
          <Navbar handleFilter={this.handleFilter} tags={tags}></Navbar>
        </div>
      )
    }
  }
}
