import React from "react";
import marked from "marked"

export default class Article extends React.Component {
  constructor() {
    super();
    this.state = {
      fetched: false,
      comment: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    fetch(`/api/article/${this.props.params.id}?token=${sessionStorage.token}`, {method: 'get'})
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      this.setState({
        article:json,
        fetched:true
      })
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let a = this.state.article.commentIDS;
    a.push({
      id: this.state.article.commentIDS.length,
      comment: this.state.comment,
      date: new Date(),
      replies: []
    })
    fetch(`/api/article/${this.state.article._id}?token=${sessionStorage.token}`, {
      method:'put',
      body: JSON.stringify({
        commentIDS: a
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    this.setState({
      commentPosted: true
    })
    setTimeout(this.reset, 1000);
  }

  reset() {
    this.setState({
      commentPosted: false
    })
  }

  handleChange(e) {
    this.setState({
      comment: e.target.value
    })
  }

  render() {
    let style = {

    }

    if (this.state.fetched) {
      style.backgroundImage = `url(${this.state.article.bgImagePath})`;
    }

    let getMarkdown = function (value) {
      let md = marked(value, {sanitize: true});
      return { __html: md };
    }

    let writeSections = function (section, i) {
      return (
        <div className="section container" key={i} id={`section-${i}`}>
          <h2 className="section-title">{section.sectionTitle}</h2>
          <div dangerouslySetInnerHTML={getMarkdown(section.value)}>
          </div>
        </div>
      )
    }

    let createComments = function (comment, i) {
      return (
        <div key={i} id={`comment-${comment.id}`} className="comment">
          <p className="comment-text">{comment.comment}</p>
          <div className="center">
            <a className="reply" id={comment._id}>Reply</a>
          </div>
        </div>
      )
    }

    if (this.state.fetched || this.state.commentPosted) {
      return (
        <div>
          <div className="article-page container">
            <div className="article">
              <h1 style={style} className="article-title">{this.state.article.title}</h1>
              <h4 className="author">{this.state.article.author}</h4>
              <h5 className="date">{this.state.article.dateCreated.split('T')[0]}</h5>
              <br></br>
              <h5></h5>
              <br></br>
            </div>

          </div>
          {this.state.article.sections.map(writeSections)}
          <div className="comment-section">
            <div className="create-section  container">
              <h2 className="comment-title">Comments</h2>
              <h4 className="suggest">Leave A Comment</h4>
              <form onSubmit={this.handleSubmit} className="create-comment">
                <textarea value={this.state.comment} onChange={this.handleChange} className="comment-area">
                </textarea>
                <br></br>
                <button className="submit-comment">Post Comment</button>
              </form>
            </div>
            <div id="comment-root" className="comments  container">
              {this.state.article.commentIDS.map(createComments)}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="article-page container">
          <div className="article">

          </div>
        </div>
      )
    }
  }
}
