import React from "react";
import Featured from "./Featured";
import Masonry from 'react-masonry-component';
import Article from "./Article";;


let masonryOptions = {
    transitionDuration: 100
};


export default class ArticleContainer extends React.Component {
  render() {
    let childElements = function(article, i) {
      return (
        <Article desc={article.desc} key={i} articleid={article._id} height={article.height} tag={article.tag} backgroundColor={article.hoverColor} background={article.bgImagePath} title={article.title}></Article>
      );
    };

    if (this.props.isFetched) {
      return (
        <div className="container article-container">
          <Featured></Featured>
          <Masonry className={'masonry-container'} elementType={'ul'} options={masonryOptions} disableImagesLoaded={false} updateOnEachImageLoad={false}>
            {this.props.filtered.map(childElements)}
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
