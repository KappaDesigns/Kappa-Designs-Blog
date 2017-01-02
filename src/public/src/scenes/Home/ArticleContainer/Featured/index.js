import React from "react";
import Article from "../Article";

export default class Featured extends React.Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      fetched: false
    }
    fetch(`/api/article/featured?token=${sessionStorage.token}`, {method: 'get'})
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      this.setState({
        articles: json,
        fetched: true
      })
    })
  }

  render() {
    let getArticle = (i) => {
      let article = this.state.articles[i];
      return (
        <Article desc={article.desc} key={i} articleid={article._id} height={500} tag={article.tag} backgroundColor={article.hoverColor} background={article.bgImagePath} title={article.title}></Article>
      )
    }
    if (this.state.fetched) {
      return (
        <div className="row featured">
          <h1 className="head"><span>Featured</span></h1>
          <div className="col-md-8 recent">
            {getArticle(0)}
          </div>
          <div className="col-md-4 earlier">
            {getArticle(1)}
          </div>
        </div>
      )
    } else {
      return (
        <div className="row featured">
        </div>
      )
    }
  }
}
