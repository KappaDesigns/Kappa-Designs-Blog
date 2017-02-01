import React from "react";
import { Link, hashHistory } from "react-router";
import 'whatwg-fetch'; 

export default class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      fetched: false,
      error: '',
      errClass: 'none'
    }

    fetch(`/api/article/all?token=${sessionStorage.token}`, { method: 'get' })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      let checked = [];
      let count = 0;
      for (let i = 0; i < json.length; i++) {
        checked[i] = json[i].featured;
        if (json[i].featured) {
          count++;
        }
      }
      this.setState({
        fetched: true,
        articles: json,
        checked: checked,
        featured: count,
      })
    })
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.displayError = this.displayError.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.displaySuccess = this.displaySuccess.bind(this);
    this.authorize = this.authorize.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.authorize();
  }

  authorize() {
    fetch(`/auth/user`, {method: 'get', credentials:'same-origin'})
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      if (json.securityLevel < 1) {
        hashHistory.push('/login')
      }
    })
    .catch((err) => {
      hashHistory.push('/login');
    })
  }

  displayError(err) {
    this.setState({
      error: err,
      errClass: 'error'
    })
    setTimeout(function () {
      this.setState({
        error: '',
        errClass: 'none'
      })
    }.bind(this), 2000);
  }

  handleRedirect() {
    hashHistory.push("/create");
  }

  handleClick(e) {
    let checked = this.state.checked;
    let i = parseInt(e.target.id.substring(9));
    checked[i] = !checked[i];
    if (checked[i] && this.state.featured < 2) {
      let count = this.state.featured + 1;
      this.setState({
        featured: count
      })
    } else if (!checked[i] && this.state.featured >= 0){
      let count = this.state.featured - 1;
      this.setState({
        featured: count
      })
    } else {
      this.displayError('Only Two Articles Can Be Featured At A Time');
      checked[i] = !checked[i]
    }
    this.setState({
      checked: checked
    })
    console.log(this.state.featured);
  }

  displaySuccess() {
    setTimeout(function () {
      this.setState({
        error: 'Successfully Featured',
        errClass: 'success'
      })
    }.bind(this), 0);
    setTimeout(function () {
      this.setState({
        error: '',
        errClass: 'none'
      })
    }.bind(this), 2000);
  }

  handleUpdate() {
    if (this.state.featured == 2) {
      for (let i = 0; i < this.state.articles.length; i++) {
        fetch(`/api/article/${this.state.articles[i]._id}?token=${sessionStorage.token}`, {
          method: 'put',
          body: JSON.stringify({
            featured:this.state.checked[i],
          }),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          this.displaySuccess()
        })
      }
    } else {
      this.displayError('Two Articles Must Be Featrued')
    }
  }

  handleEdit(e) {
    hashHistory.push(`/edit/${e.target.id}`)
  }

  render() {
    let writeArticles = (article, i) => {
      return (
        <tr className="article" key={i}>
          <td className="featured" onClick={this.handleClick} id={`featured-${i}`}><input onChange={this.handleClick} id={`featured-${i}`} checked={this.state.checked[i]} type="checkbox"></input></td>
          <td className="title" onClick={this.handleEdit} id={article._id}>{article.title}</td>
        </tr>
      )
    }

    if (this.state.fetched) {
      return (
        <div className="container admin-container">
          <h2 className="header">Admin Page</h2>
          <div className={this.state.errClass}>{this.state.error}</div>
          <Link to="/"><img className="logo" src="../../../../images/logo.png"></img></Link>
          <table className="articles">
            <tbody>
              <tr className="article-header">
                <td>Featured</td>
                <td>Title</td>
              </tr>
              {this.state.articles.map(writeArticles)}
            </tbody>
          </table>
          <div className="footer">
            <button onClick={this.handleRedirect}>Create</button>
            <button onClick={this.handleUpdate} className="update-btn">Update</button>
          </div>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}
