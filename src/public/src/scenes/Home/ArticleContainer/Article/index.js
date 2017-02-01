import React from "react";
import Tag from "./Tag";
import { Link } from "react-router";
import 'whatwg-fetch'; 

export default class Article extends React.Component {
  constructor() {
    super();
    this.state = {
      hover: false,
      fetched: false
    }
    this.handleEnter = this.handleEnter.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  handleEnter(e) {
    e.preventDefault();
    this.setState({hover:true})
  }

  handleExit(e) {
    e.preventDefault();
    this.setState({hover:false})
  }

  render() {
    let background = "";
    let style = {
      article: {
        display: 'block',
        backgroundImage: `url(${this.props.background})`,
        backgroundSize: 'cover',
        height: this.props.height
      },
      overlay: {
        backgroundColor: 'inherit'
      }
    }
    if (this.state.hover) {
      style.overlay.backgroundColor = `${this.props.backgroundColor}`;
    }
    return (
      <Link to={`/article/${this.props.articleid}`} style={style.article} className="article">
        <div style={style.overlay} onMouseEnter={this.handleEnter} onMouseLeave={this.handleExit} className="article-overlay">
          <Tag tag={this.props.tag}></Tag>
          <h1 className="article-title">{this.props.title}</h1>
          <div className="article-hover">
            <p className="article-desc">{this.props.desc}</p>
          </div>
        </div>
      </Link>
    )
  }
}
