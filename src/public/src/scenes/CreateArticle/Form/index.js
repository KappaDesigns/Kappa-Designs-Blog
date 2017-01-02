import React from "react";
import Sections from "./Sections";
import Dropdown from "./DropDown";
import { hashHistory } from "react-router";

export default class Form extends React.Component {
  constructor() {
    super();
    this.isActive = this.isActive.bind(this);
    this.setSelected = this.setSelected.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSectionChange = this.handleSectionChange.bind(this);
    this.handleSectionTitleChange = this.handleSectionTitleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleDropdownClick = this.handleDropdownClick.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.authorize = this.authorize.bind(this);
    this.displayError = this.displayError.bind(this);
    this.displaySuccess = this.displaySuccess.bind(this);
    this.state = {
      title:'',
      desc: '',
      tag:'world',
      author: '',
      imagePath: '',
      displayImage: 'http://placehold.it/200x150',
      color: 'rgba(161, 116, 0, 0.75)',
      selected: 1,
      isHover : false,
      sections : [
        {
          id: 1,
          value: '',
          sectionTitle: ''
        }
      ]
    }
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
      this.setState({
        author:`${json.firstName} ${json.lastName}`
      })
    })
    .catch((err) => {
      hashHistory.push('/login');
    })
  }

  handleFileChange(e) {
    if (e.target.value != '') {
      let val = e.target.value
      fetch(val, {method:'get',mode:'no-cors'})
      .then((res) => {
        (res);
        if (res.status != 404) {
          return true
        } else {
          return false
        }
      })
      .then((blob) => {
        (blob);
        if (blob) {
          this.setState({displayImage:val})
        }
      })
      .catch((err) => {
        (err);
      })
    }

    this.setState({
      imagePath: e.target.value
    })
  }

  handleDescChange(e) {
    this.setState({
      desc: e.target.value
    })
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    })
  }

  handleClick(e) {
    e.preventDefault();
    let a = this.state.sections;
    a.push({
      id: (this.state.sections.length+1),
      value: '',
      sectionTitle: ''
    });
    this.setState({sections: a});
  }

  handleSectionChange(e) {
    let a = this.state.sections
    let index = e.target.id.substring(8) - 1;
    a[index].value = e.target.value
    this.setState({sections: a})
  }

  handleSectionTitleChange(e) {
    let a = this.state.sections;
    let index = e.target.id.substring(8) - 1;
    a[index].sectionTitle = e.target.value;
    this.setState({sections: a})
  }

  handleRemove(e) {
    let a = this.state.sections
    let index = e.target.id.substring(8)-1;
    a.splice(index,1);
    this.setState({sections: a})
  }

  handleDropdownClick(e) {
    this.setState({tag: e.target.id, isHover: false})
  }

  setSelected(e) {
    if (e.target.id.includes(1))
      this.setState({
        selected: 1,
        color: 'rgba(161, 116, 0, 0.75)'
      });
    else
      this.setState({
        selected: 2,
        color: 'rgba(244, 241, 235, 0.75)'
      });
  }

  handleEnter(e) {
    this.setState({isHover : true});
  }

  handleExit(e) {
    this.setState({isHover : false});
  }

  isActive(n) {
    return n === this.state.selected ? 'bg active' : 'bg';
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch(`/api/article?token=${sessionStorage.token}`, {
      method: "post",
      credentials: 'same-origin',
      body: JSON.stringify({
        title: this.state.title,
        desc: this.state.desc,
        author: this.state.author,
        tag: this.state.tag,
        bgImagePath: this.state.imagePath,
        sections: this.state.sections,
        likes: 0,
        hoverColor: this.state.color,
        dislikes: 0,
        height: document.getElementById('bg-image').height
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      this.displaySuccess();
      return res.json();
    })
    .then((json) => {

    })
    .catch((err) => {
      this.displayError('Something Went Wrong');
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

  displaySuccess() {
    setTimeout(function () {
      this.setState({
        error: 'Successfully Created Article',
        errClass: 'success'
      })
    }.bind(this), 0);
    setTimeout(function () {
      this.setState({
        error: '',
        errClass: 'none'
      })
      hashHistory.push('/');
    }.bind(this), 2000);
  }

  render() {
    let style = {
      root : {
        display: 'flex'
      }
    }
    let bg1 = this.isActive(1);
    let bg2 = this.isActive(2);
    return (
      <form onSubmit={this.handleSubmit} id="create-form" className="create-form">
        <div className={this.state.errClass}>{this.state.error}</div>
        <input value={this.state.title} onChange={this.handleTitleChange} className="title" placeholder="Title..."></input>
        <Dropdown selected={this.state.tag} isHover={this.state.isHover}  handleExit={this.handleExit} handleEnter={this.handleEnter} handleClick={this.handleDropdownClick} tags={['world','gaming','dev','food','misc']}></Dropdown>
        <h4 className="author"><i>{this.state.author}</i></h4>
        <input value={this.state.desc} onChange={this.handleDescChange} className="desc" placeholder="Description... (1 - 2 Sentences)"></input>
        <img alt="Background Image Here" id="bg-image" className="bg-image" src={this.state.displayImage}></img>
        <input onChange={this.handleFileChange} className="bg-input"></input>
        <hr></hr>
        <Sections sections={this.state.sections} handleRemove={this.handleRemove} handleTitleChange={this.handleSectionTitleChange} handleSectionChange={this.handleSectionChange} handleClick={this.handleClick}></Sections>
        <div className="color-display" style={style.root}>
          <div onClick={this.setSelected} className={bg1}>
            <div id="bg-1" className="color-right"></div>
          </div>
          <div onClick={this.setSelected} className={bg2}>
            <div id="bg-2" className="color-left"></div>
          </div>
        </div>
        <h4 className="choose">Choose Color</h4>
        <button className="post">Post</button>
      </form>
    )
  }
}
