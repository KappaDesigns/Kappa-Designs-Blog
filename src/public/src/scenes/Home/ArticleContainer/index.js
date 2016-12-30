import React from "react";
import Featured from "./Featured";
import Main from "./Main";
import Masonry from 'react-masonry-component';
import Article from "./Article";;


let masonryOptions = {
    transitionDuration: 100
};


export default class ArticleContainer extends React.Component {
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
        isFetched : true,
        fetching: false,
        fetchedTotal: amount
      })
    })
  }

  render() {
    let childElements = function(article, i) {
      return (
        <Article key={i} articleid={article._id} height={article.height} tag={article.tag} backgroundColor={article.hoverColor} background={article.bgImagePath} title={article.title}></Article>
      );
    };

    if (this.state.isFetched) {
      return (
        <div className="container article-container">
          <Featured></Featured>
          <Masonry className={'masonry-container'} elementType={'ul'} options={masonryOptions} disableImagesLoaded={false} updateOnEachImageLoad={false}>
            {this.state.articles.map(childElements)}
          </Masonry>
        </div>
      );
    } else {
      return (
        <div className="container article-container">
          <Featured></Featured>
          <Masonry className={'masonry-container'} elementType={'ul'} options={masonryOptions} disableImagesLoaded={false} updateOnEachImageLoad={false}>
          </Masonry>
        </div>
      );
    }
  }
}
