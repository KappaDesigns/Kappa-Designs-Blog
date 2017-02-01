import React from "react";
import marked from "marked"
import { Link } from "react-router";
import 'whatwg-fetch'; 

export default class Article extends React.Component {
  constructor() {
    super();
    this.state = {
      fetched: false,
      comment: '',
      loggedIn: true,
      isCommenting: true,
      level: 1,
      type: 'Comment'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
    this.handleReply = this.handleReply.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    fetch(`/api/article/${this.props.params.id}?token=${sessionStorage.token}`, {method: 'get',credentials: 'same-origin',})
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      this.setState({
        article:json,
        fetched:true,
        index:0
      })
    });
    fetch(`/auth/user/`, {method: 'get',credentials: 'same-origin',})
    .then((res) => {
      if (res.status == 403) {
        this.setState({
          loggedIn: false
        })
        return {};
      } else {
        this.setState({
          loggedIn: true
        })
        return res.json();
      }
    })
    .then((json) => {
      this.setState({
        user:json,
      })
    });
  }

  handleSubmit(e) {
    if (this.state.loggedIn && this.state.comment.length > 0) {
      e.preventDefault();
      let a = this.state.article.commentIDS;
      a.splice(this.state.index, 0 , {
        id: this.state.article.commentIDS.length,
        comment: this.state.comment,
        date: new Date(),
        likes: 0,
        dislikes: 0,
        user: this.state.user.username,
        usersLiked: [],
        usersDisliked: [],
        imgPath: this.state.user.imgUrl,
        replyLevel: this.state.level
      })
      fetch(`/api/article/${this.state.article._id}?token=${sessionStorage.token}`, {
        method:'put',
        credentials: 'same-origin',
        body: JSON.stringify({
          commentIDS: a
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      this.setState({
        commentPosted: true,
        type:'Comment',
        level: 1,
        index: 0,
      })
      console.log(this.state);
      setTimeout(this.reset, 1000);
    }
  }

  reset() {
    this.setState({
      commentPosted: false
    })
  }

  handleLike(e) {
    if (this.state.loggedIn) {
      let id = e.target.id;
      let index = id.substring(8);
      let a = this.state.article
      let comment = a.commentIDS[index]
      let likers = comment.usersLiked;
      let dislikers = comment.usersDisliked;
      if (dislikers.includes(this.state.user._id)) {
        comment.dislikes--;
        dislikers = dislikers.splice(index, 1);
      }
      if (!likers.includes(this.state.user._id)) {
        comment.likes++;
        likers.push(this.state.user._id);
      }
      comment.usersLiked = likers;
      comment.usersDisliked = dislikers;
      a.commentIDS[index] = comment;
      this.setState({
        article: a
      })
      fetch(`/api/article/${this.state.article._id}?token=${sessionStorage.token}`, {
        method:'put',
        credentials: 'same-origin',
        body: JSON.stringify({
          commentIDS: a.commentIDS
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    }
  }

  handleDislike(e) {
    if (this.state.loggedIn) {
      let id = e.target.id;
      let index = id.substring(8);
      let a = this.state.article
      let comment = a.commentIDS[index]
      let likers = comment.usersLiked;
      let dislikers = comment.usersDisliked;
      if (likers.includes(this.state.user._id)) {
        comment.likes--;
        likers = likers.splice(index, 1);
      }
      if (!dislikers.includes(this.state.user._id)) {
        comment.dislikes++;
        dislikers.push(this.state.user._id);
      }
      comment.usersLiked = likers;
      comment.usersDisliked = dislikers;
      a.commentIDS[index] = comment;
      this.setState({
        article: a
      })
      fetch(`/api/article/${this.state.article._id}?token=${sessionStorage.token}`, {
        method:'put',
        credentials: 'same-origin',
        body: JSON.stringify({
          commentIDS: a.commentIDS
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    }
  }

  handleChange(e) {
    this.setState({
      comment: e.target.value
    })
  }

  handleReply(e) {
    let split = e.target.id.split('|');
    let index = parseInt(split[0].substring(8)) + 1;
    let level = parseInt(split[1].substring(12));
    this.setState({
      level : level + 1,
      index : index,
      type : "Reply"
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
      console.log(comment.replyLevel);
      let style = {
        width:(100 - ((comment.replyLevel - 1) * 2)) + '%',
      }
      return (
        <div style={style} key={i} id={`comment-${i}`} className="comment">
          <h5><img src={comment.imgPath}></img>{comment.user}</h5>
          <p className="comment-text">{comment.comment}</p>
          <div className="center">
            <span onClick={this.handleLike} id={"comment-"+i} className="likes"><i id={"comment-"+comment.id} class="fa fa-thumbs-up" aria-hidden="true"></i>{comment.likes}</span>
            <span onClick={this.handleDislike} id={"comment-"+i} className="dislikes"><i id={"comment-"+comment.id+""} class="fa fa-thumbs-down" aria-hidden="true"></i>{comment.dislikes}</span>
            <span onClick={this.handleReply} id={`comment-${i}|reply-level-${comment.replyLevel}`} className="reply">Reply</span>
          </div>
        </div>
      )
    }.bind(this)

    if (!this.state.loggedIn && this.state.fetched) {
      return (
        <div>
          <div className="article-page container">
            <Link className="logo-link" to="/"><img className="logo" src="../../../images/logo.png"></img></Link>
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
            </div>
            <div id="comment-root" className="comments  container">
              {this.state.article.commentIDS.map(createComments)}
            </div>
          </div>
        </div>
      )
    } else if (this.state.loggedIn && (this.state.fetched || this.state.commentPosted)) {
      return (
        <div>
          <div className="article-page container">
            <div className="article">
              <Link className="logo-link" to="/"><img className="logo" src="../../../images/logo.png"></img></Link>
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
                <button className="submit-comment">Post {this.state.type}</button>
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
